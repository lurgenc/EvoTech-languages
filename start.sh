#!/bin/bash

echo "🚀 AI Konsültasyon Sistemi Başlatılıyor..."

# Python dependencies kurulumu
echo "📦 Python dependencies yükleniyor..."
pip install -r requirements.txt

# Frontend dependencies kurulumu
echo "📦 Frontend dependencies yükleniyor..."
cd frontend
npm install
cd ..

# .env dosyası kontrolü
if [ ! -f .env ]; then
    echo "⚠️  .env dosyası bulunamadı. .env.example dosyasını .env olarak kopyalayın ve API anahtarlarınızı girin."
    cp .env.example .env
    echo "📝 .env dosyası oluşturuldu. API anahtarlarınızı girin."
fi

# Backend ve Frontend'i aynı anda başlat
echo "🔥 Sunucular başlatılıyor..."

# Backend'i arka planda başlat
echo "🖥️  Backend sunucusu başlatılıyor (Port: 8000)..."
cd backend
python main.py &
BACKEND_PID=$!
cd ..

# Frontend'i başlat
echo "🌐 Frontend sunucusu başlatılıyor (Port: 3000)..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Sistem başarıyla başlatıldı!"
echo "🌐 Frontend: http://localhost:3000"
echo "🖥️  Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Sistemi durdurmak için Ctrl+C tuşlayın."

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Sistem kapatılıyor..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap interrupt signal
trap cleanup INT

# Sunucuların çalışmasını bekle
wait