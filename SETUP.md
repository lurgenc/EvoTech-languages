# Praktika Clone - Kurulum Talimatları

Bu dokümanda Praktika Clone uygulamasının yerel olarak nasıl kurulacağı ve çalıştırılacağı açıklanmaktadır.

## Sistem Gereksinimleri

- Node.js (v16.0.0 veya üzeri)
- npm (v8.0.0 veya üzeri)
- Git

## Hızlı Kurulum

### 1. Projeyi İndirin

```bash
git clone <your-repo-url>
cd praktika-clone
```

### 2. Bağımlılıkları Yükleyin

```bash
# Backend bağımlılıkları
npm install

# Frontend bağımlılıkları
cd client
npm install
cd ..
```

### 3. Ortam Değişkenlerini Ayarlayın

```bash
# .env dosyasını oluşturun
cp .env.example .env
```

`.env` dosyasını düzenleyerek gerekli API anahtarlarını ekleyin:

```env
# Zorunlu değişkenler
JWT_SECRET=your_strong_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here

# İsteğe bağlı (daha iyi deneyim için)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### 4. Veritabanını Başlatın

```bash
# Veritabanı otomatik olarak ilk çalıştırmada oluşturulacak
npm run server
```

### 5. Uygulamayı Başlatın

```bash
# Geliştirme modu (hem backend hem frontend)
npm run dev

# Veya ayrı ayrı:
# Backend: npm run server
# Frontend: cd client && npm start
```

## Erişim

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Dokümantasyonu**: http://localhost:5000/api/docs

## Bulgarca Özel Özellikler

### Kiril Alfabesi Desteği
- Otomatik font yükleme
- Klavye kısayolları
- Fonetik rehber

### Kültürel İçerik
- Geleneksel bayramlar
- Bölgesel farklılıklar  
- Tarihi bağlam

## Test Kullanıcıları

Uygulamayı test etmek için aşağıdaki kullanıcıları kullanabilirsiniz:

```
Email: test@example.com
Şifre: test123

Email: bulgarian@example.com  
Şifre: bulgaria123
```

## Bulgarca Test Verisi

Uygulama aşağıdaki Bulgarca içeriklerle gelir:

### Avatarlar
- **Dimitar**: Kültürel uzman (Sofia aksanı)
- **Elena**: Akademik öğretmen (Plovdiv aksanı)  
- **Georgi**: IT uzmanı (Varna aksanı)

### Konu Başlıkları
- Kiril alfabesi öğrenimi
- Temel selamlaşmalar
- Bulgar mutfağı
- Geleneksel bayramlar

### Kelime Dağarcığı
- 50+ temel kelime
- Fonetik rehber
- Örnek cümleler
- Kültürel notlar

## API Anahtarları

### OpenAI (Zorunlu)
1. https://platform.openai.com/ adresine gidin
2. API anahtarı oluşturun
3. `.env` dosyasına ekleyin

### ElevenLabs (İsteğe bağlı)
1. https://elevenlabs.io/ adresine gidin
2. Hesap oluşturun
3. API anahtarı alın
4. Bulgarca ses modeli seçin

## Sorun Giderme

### Veritabanı Sorunları
```bash
# Veritabanını sıfırlayın
rm database/praktika.db
npm run server
```

### Port Sorunları
```bash
# Farklı port kullanın
PORT=3001 npm run server
```

### Bağımlılık Sorunları
```bash
# Temiz kurulum
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

## Geliştirme

### Yeni Dil Ekleme
1. `database/seed_data.sql` dosyasını düzenleyin
2. Yeni avatarlar ekleyin
3. Kelime dağarcığı oluşturun
4. Kültürel içerik ekleyin

### Avatar Özelleştirme
1. `public/avatars/` klasörüne resim ekleyin
2. Veritabanında avatar kaydı oluşturun
3. Ses modelini yapılandırın

## Üretim Dağıtımı

### Docker ile
```bash
docker build -t praktika-clone .
docker run -p 5000:5000 praktika-clone
```

### Manuel Dağıtım
```bash
npm run build
npm start
```

## Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.

## Katkıda Bulunma

1. Fork yapın
2. Yeni branch oluşturun
3. Değişikliklerinizi commit edin
4. Pull request oluşturun

## İletişim

- GitHub Issues: Bug raporları ve özellik istekleri
- Email: praktika-clone@example.com

## Bulgarca Kaynaklar

- [Bulgarca Gramer Rehberi](https://bulgarian-grammar.com)
- [Kiril Alfabesi](https://cyrillic-alphabet.com)
- [Bulgar Kültürü](https://bulgarian-culture.com)