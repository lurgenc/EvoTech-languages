#!/bin/bash

echo "🔨 Praktika Clone Build Scripti"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json bulunamadı. Lütfen proje kök dizininde olduğunuzdan emin olun."
    exit 1
fi

# Check if Android directory exists
if [ ! -d "android" ]; then
    echo "❌ android/ dizini bulunamadı."
    exit 1
fi

echo "📱 Android APK oluşturuluyor..."

# Clean previous builds
echo "🧹 Önceki build'ler temizleniyor..."
cd android
./gradlew clean

if [ $? -ne 0 ]; then
    echo "❌ Clean işlemi başarısız!"
    exit 1
fi

# Build release APK
echo "🔨 Release APK oluşturuluyor..."
./gradlew assembleRelease

if [ $? -eq 0 ]; then
    echo "✅ APK başarıyla oluşturuldu!"
    echo ""
    echo "📁 APK dosyası konumu:"
    echo "   android/app/build/outputs/apk/release/app-release.apk"
    echo ""
    echo "📱 APK'yı Android cihazınıza yüklemek için:"
    echo "   1. APK dosyasını cihazınıza kopyalayın"
    echo "   2. Cihazınızda 'Bilinmeyen kaynaklar'dan yüklemeye izin verin"
    echo "   3. APK'yı açın ve yükleyin"
    echo ""
    echo "⚠️  Not: Bu APK debug imzası ile oluşturulmuştur."
    echo "   Production için kendi imzanızı kullanmanız gerekir."
else
    echo "❌ APK oluşturma hatası!"
    exit 1
fi

cd ..