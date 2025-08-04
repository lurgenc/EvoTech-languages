#!/bin/bash

echo "🚀 Praktika Clone Kurulum Scripti"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js bulunamadı. Lütfen Node.js'i yükleyin: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js 16 veya üzeri gerekli. Mevcut sürüm: $(node -v)"
    exit 1
fi

echo "✅ Node.js sürümü: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm bulunamadı. Lütfen npm'i yükleyin."
    exit 1
fi

echo "✅ npm sürümü: $(npm -v)"

# Install dependencies
echo "📦 Bağımlılıklar yükleniyor..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Bağımlılıklar başarıyla yüklendi!"
else
    echo "❌ Bağımlılık yükleme hatası!"
    exit 1
fi

# Check if Android SDK is available
if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME çevre değişkeni ayarlanmamış."
    echo "   Android Studio'yu yükleyin ve ANDROID_HOME'u ayarlayın."
    echo "   https://developer.android.com/studio"
else
    echo "✅ ANDROID_HOME: $ANDROID_HOME"
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "⚠️  Java bulunamadı. JDK 11 veya üzeri gerekli."
    echo "   https://adoptium.net/"
else
    echo "✅ Java sürümü: $(java -version 2>&1 | head -n 1)"
fi

echo ""
echo "🎉 Kurulum tamamlandı!"
echo ""
echo "📱 Uygulamayı başlatmak için:"
echo "   1. Android cihazınızı bağlayın veya emülatör başlatın"
echo "   2. npm start komutunu çalıştırın"
echo "   3. Başka bir terminal'de: npx react-native run-android"
echo ""
echo "🔧 Sorun yaşarsanız:"
echo "   - Android Studio'nun yüklü olduğundan emin olun"
echo "   - ANDROID_HOME çevre değişkenini ayarlayın"
echo "   - JDK 11+ yüklü olduğundan emin olun"
echo ""
echo "📚 Daha fazla bilgi için README.md dosyasını okuyun."