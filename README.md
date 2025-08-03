# 🤖 AI Konsültasyon Sistemi

Farklı yapay zeka modellerini (GPT-4, Gemini, Claude, Ollama) aynı soru üzerinde tartışmaya sokarak, fikir birliğine vardıkları en doğru cevabı bulmayı amaçlayan multi-agent sistemi.

## ✨ Özellikler

- **Multi-Agent Tartışma**: GPT-4, Gemini Pro, Claude 3, ve Ollama modellerini aynı anda kullanma
- **Konsensüs Algoritması**: Modellerin fikir birliğine varma derecesini ölçme
- **Görsel Tartışma Süreci**: Her modelin yanıtlarını round-by-round görüntüleme
- **Modern UI**: React + Material-UI ile tasarlanmış kullanıcı dostu arayüz
- **Gerçek Zamanlı İşlem**: Asenkron API çağrıları ile hızlı sonuçlar
- **Esnek Konfigürasyon**: Tartışma turu sayısı ve konsensüs eşiği ayarlama

## 🏗️ Mimari

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React UI      │────│   FastAPI       │────│   AI Agents     │
│   (Frontend)    │    │   (Backend)     │    │   (Multi-Model) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   AI Models     │
                    │                 │
                    │ • OpenAI GPT-4  │
                    │ • Google Gemini │
                    │ • Claude 3      │
                    │ • Ollama (Local)│
                    └─────────────────┘
```

## 🚀 Hızlı Başlangıç

### 1. Projeyi İndirin

```bash
git clone https://github.com/yourusername/ai-consultation-system.git
cd ai-consultation-system
```

### 2. API Anahtarlarınızı Ayarlayın

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyerek API anahtarlarınızı ekleyin:

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key
GOOGLE_API_KEY=your_google_api_key_here

# Anthropic Claude API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Ollama configuration (for local models)
OLLAMA_BASE_URL=http://localhost:11434
```

### 3. Sistemi Başlatın

#### Otomatik Başlatma (Önerilen)
```bash
./start.sh
```

#### Manuel Başlatma

**Backend:**
```bash
pip install -r requirements.txt
cd backend
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

### 4. Uygulamayı Kullanın

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Dokümanları: http://localhost:8000/docs

## 🐳 Docker ile Çalıştırma

```bash
# Ortam değişkenlerini ayarlayın
cp .env.example .env
# .env dosyasında API anahtarlarınızı doldurun

# Docker Compose ile başlatın
docker-compose up --build
```

## 📝 Kullanım

1. **Soru Girme**: Ana sayfada sorunuzu yazın
2. **Model Seçimi**: Konsültasyona katılacak AI modellerini seçin
3. **Ayarlar**: İsteğe bağlı olarak tartışma turu sayısı ve konsensüs eşiğini ayarlayın
4. **Konsültasyon**: "Konsültasyonu Başlat" butonuna tıklayın
5. **Sonuçları İnceleme**: 
   - En iyi cevabı görün
   - Konsensüs skorunu kontrol edin
   - Tartışma sürecini round-by-round inceleyin

## 🤖 Desteklenen AI Modeller

| Model | Provider | API Key Gerekli | Lokal |
|-------|----------|-----------------|-------|
| GPT-4 | OpenAI | ✅ | ❌ |
| GPT-3.5 Turbo | OpenAI | ✅ | ❌ |
| Gemini Pro | Google | ✅ | ❌ |
| Claude 3 | Anthropic | ✅ | ❌ |
| Ollama | Local | ❌ | ✅ |

### Ollama Kurulumu (Lokal Model)

```bash
# Ollama'yı indirin ve kurun
curl -fsSL https://ollama.ai/install.sh | sh

# Bir model indirin (örnek: llama2)
ollama pull llama2

# Ollama servisini başlatın
ollama serve
```

## 🔧 API Referansı

### POST /consult
Yeni bir AI konsültasyonu başlatır.

**Request Body:**
```json
{
  "question": "Python'da en iyi web framework'ü hangisidir?",
  "models": ["gpt-4", "gemini-pro", "claude-3"],
  "max_rounds": 3,
  "consensus_threshold": 0.8
}
```

**Response:**
```json
{
  "question": "Python'da en iyi web framework'ü hangisidir?",
  "final_answer": "Kombine edilmiş en iyi cevap...",
  "confidence_score": 0.85,
  "consensus_reached": true,
  "participating_models": ["gpt-4", "gemini-pro", "claude-3"],
  "discussion_rounds": [...]
}
```

### GET /models
Kullanılabilir AI modellerini listeler.

### GET /health
Sistem ve model durumunu kontrol eder.

## 🧠 Konsensüs Algoritması

Sistem, aşağıdaki yöntemlerle modeller arasında konsensüs arar:

1. **Kelime Benzerliği**: Yanıtlar arasında ortak kelimeleri analiz eder
2. **Çoklu Tur Tartışma**: Modeller birbirlerinin yanıtlarını görüp iyileştirir
3. **Dinamik Eşik**: Kullanıcı tanımlı konsensüs eşiği ile kontrol
4. **En İyi Yanıt Seçimi**: En uzun ve detaylı yanıtı final cevap olarak seçer

## 🎨 Kullanıcı Arayüzü Özellikleri

- **Dark Theme**: Modern ve göz yormayan tasarım
- **Responsive**: Mobil ve desktop uyumlu
- **Animasyonlar**: Framer Motion ile yumuşak geçişler
- **Real-time Updates**: Canlı konsültasyon süreci
- **Interactive Controls**: Sürüklenebilir ayar kontrolleri
- **Markdown Support**: Zengin metin formatı desteği

## 📁 Proje Yapısı

```
ai-consultation-system/
├── backend/
│   ├── main.py              # FastAPI ana uygulama
│   └── ai_agents.py         # AI agent sınıfları
├── frontend/
│   ├── src/
│   │   ├── App.js           # Ana React komponenti
│   │   └── index.js         # React giriş noktası
│   ├── public/
│   └── package.json
├── requirements.txt         # Python bağımlılıkları
├── .env.example            # Ortam değişkenleri örneği
├── start.sh                # Otomatik başlatma scripti
├── docker-compose.yml      # Docker konfigürasyonu
├── Dockerfile.backend      # Backend Docker imajı
├── Dockerfile.frontend     # Frontend Docker imajı
└── README.md               # Bu dosya
```

## 🛠️ Geliştirme

### Gereksinimler
- Python 3.11+
- Node.js 18+
- API Keys (OpenAI, Google, Anthropic)
- Ollama (opsiyonel, lokal model için)

### Katkıda Bulunma
1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📊 Performans

- **Ortalama Yanıt Süresi**: 5-15 saniye (3 model için)
- **Maksimum Eşzamanlı İstek**: 10 konsültasyon
- **Memory Usage**: ~200MB (backend + frontend)
- **API Rate Limits**: Provider limitlerini respects eder

## 🔒 Güvenlik

- API anahtarları environment variables ile korunur
- CORS politikaları ile domain kontrolü
- Rate limiting (planlı özellik)
- Input validation ve sanitization

## 📈 Gelecek Özellikler

- [ ] Sesli soru sorma desteği
- [ ] Sonuçları PDF/Word olarak export
- [ ] Kullanıcı hesapları ve geçmiş kayıtları
- [ ] Daha gelişmiş NLP benzerlik algoritmaları
- [ ] Custom prompt şablonları
- [ ] Çoklu dil desteği
- [ ] Real-time collaboration

## 🆘 Sorun Giderme

### Backend Başlamıyor
```bash
# Port 8000'in boş olduğunu kontrol edin
lsof -i :8000

# Virtual environment kullanın
python -m venv venv
source venv/bin/activate  # Linux/Mac
# veya
venv\Scripts\activate     # Windows
```

### Frontend Başlamıyor
```bash
# Node modüllerini temizleyin
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### API Anahtarı Hataları
- `.env` dosyasının doğru konumda olduğunu kontrol edin
- API anahtarlarının geçerli ve aktif olduğunu doğrulayın
- API limitlerini kontrol edin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Katkıda Bulunanlar

- **Ana Geliştirici**: [Your Name](https://github.com/yourusername)

## 📞 İletişim

- GitHub: [yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Website: [yourwebsite.com](https://yourwebsite.com)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

