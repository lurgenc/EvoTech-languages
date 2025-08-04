# Praktika Clone - Ücretsiz Dil Öğrenme Uygulaması

Praktika Clone, orijinal Praktika uygulamasının tamamen ücretsiz bir klonudur. Bulgarca dahil 9 farklı dil desteği ile kelime öğrenmeyi kolaylaştırır.

## 🌟 Özellikler

- **Tamamen Ücretsiz**: Hiçbir ödeme veya abonelik gerektirmez
- **Bulgarca Desteği**: Diğer diller arasında bulunmayan Bulgarca dili eklendi
- **9 Dil Desteği**: İngilizce, İspanyolca, Fransızca, Almanca, Bulgarca, İtalyanca, Portekizce, Rusça
- **İnteraktif Dersler**: Kelime öğrenme için kapsamlı dersler
- **Telaffuz Desteği**: Her kelime için telaffuz rehberi
- **Quiz Sistemi**: Öğrenilen kelimeleri test etmek için interaktif quizler
- **İlerleme Takibi**: Öğrenme ilerlemenizi takip edin
- **Pratik Modu**: Flashcard ve liste görünümü ile pratik yapın
- **Modern UI**: Kullanıcı dostu ve modern arayüz

## 📱 Desteklenen Diller

- 🇺🇸 İngilizce (English)
- 🇪🇸 İspanyolca (Español)
- 🇫🇷 Fransızca (Français)
- 🇩🇪 Almanca (Deutsch)
- 🇧🇬 **Bulgarca (Български)** - Yeni eklendi!
- 🇮🇹 İtalyanca (Italiano)
- 🇵🇹 Portekizce (Português)
- 🇷🇺 Rusça (Русский)

## 🚀 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- React Native CLI
- Android Studio (Android geliştirme için)
- JDK 11 veya üzeri

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd praktika-clone
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Android için gerekli dosyaları oluşturun:**
```bash
npx react-native run-android
```

4. **Uygulamayı başlatın:**
```bash
npm start
```

## 📚 Kullanım

### Ana Sayfa
- Dil seçimi yapın
- Genel istatistiklerinizi görün
- Özellikler hakkında bilgi alın

### Dersler
- Seçtiğiniz dildeki dersleri görün
- Her ders için kelime listesi ve telaffuz
- İlerleme takibi

### Pratik
- **Flashcard Modu**: Kelime kartları ile pratik
- **Liste Modu**: Öğrenilen kelimelerin listesi
- **İstatistikler**: Öğrenme istatistikleriniz

### Quiz
- Ders tamamlandıktan sonra quiz yapın
- Çoktan seçmeli sorular
- Anlık geri bildirim
- Başarı oranı takibi

### Profil
- Genel istatistikler
- Dil bazında ilerleme
- Ayarlar (bildirimler, ses, karanlık mod)
- İlerleme sıfırlama

## 🏗️ Proje Yapısı

```
src/
├── data/
│   └── languages.js          # Dil verileri ve Bulgarca kelimeler
├── screens/
│   ├── HomeScreen.js         # Ana sayfa
│   ├── LessonsScreen.js      # Ders listesi
│   ├── LessonDetailScreen.js # Ders detayı
│   ├── QuizScreen.js         # Quiz ekranı
│   ├── PracticeScreen.js     # Pratik ekranı
│   └── ProfileScreen.js      # Profil ekranı
└── App.js                    # Ana uygulama bileşeni
```

## 🇧🇬 Bulgarca Desteği

Bulgarca dili için özel olarak oluşturulan içerik:

### Dersler:
1. **Основни Поздрави** (Temel Selamlaşma)
2. **Числа** (Sayılar)
3. **Цветове** (Renkler)
4. **Семейство** (Aile)
5. **Храни и Напитки** (Yiyecek ve İçecekler)

### Özellikler:
- Doğru telaffuz rehberi
- Türkçe çeviriler
- Kapsamlı kelime listesi
- İnteraktif öğrenme deneyimi

## 🛠️ Teknik Detaylar

- **Framework**: React Native 0.72.6
- **Navigation**: React Navigation v6
- **State Management**: React Hooks + AsyncStorage
- **UI Components**: Custom components with Material Design
- **Platform**: Android (iOS desteği eklenebilir)

## 📦 Bağımlılıklar

```json
{
  "react": "18.2.0",
  "react-native": "0.72.6",
  "react-native-vector-icons": "^10.0.0",
  "react-native-async-storage": "^1.19.5",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/stack": "^6.3.17",
  "@react-navigation/bottom-tabs": "^6.5.8"
}
```

## 🎯 Hedefler

- [x] Tamamen ücretsiz uygulama
- [x] Bulgarca dil desteği
- [x] İnteraktif dersler
- [x] Quiz sistemi
- [x] İlerleme takibi
- [x] Modern UI/UX
- [x] Telaffuz desteği
- [ ] Ses dosyaları entegrasyonu
- [ ] iOS desteği
- [ ] Offline mod
- [ ] Sosyal özellikler

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🙏 Teşekkürler

- Orijinal Praktika uygulamasına ilham kaynağı olduğu için
- React Native topluluğuna
- Açık kaynak projelere katkıda bulunan herkese

## 📞 İletişim

Sorularınız veya önerileriniz için:
- GitHub Issues
- Email: [your-email@example.com]

---

**Not**: Bu uygulama eğitim amaçlı geliştirilmiştir ve orijinal Praktika uygulamasının bir klonudur. Tüm özellikler tamamen ücretsizdir.

