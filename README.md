# 🧠 Disleksi Dostu Metin Okuyucu

Disleksili bireylerin okuma deneyimini kolaylaştırmak için geliştirilmiş akıllı web uygulaması.

## 🎯 Proje Özellikleri

### 📝 Ana Özellikler
- **Akıllı Metin İşleme**: Türkçe heceleme algoritması ile metinleri hecelere ayırma
- **Sesli Okuma (TTS)**: Web Speech API ile doğal ses sentezi
- **Vurgulama Modları**: Hece, kelime ve cümle bazlı renkli vurgulama
- **Disleksi Dostu Font**: OpenDyslexic ve Lexend font desteği
- **Özelleştirilebilir Ayarlar**: Font boyutu, harf aralığı, satır aralığı kontrolü
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu arayüz

### 🔧 Teknik Özellikler
- **Vanilla JavaScript**: Framework bağımsız, hızlı ve hafif
- **Modern CSS**: CSS Grid, Flexbox, CSS Variables
- **Erişilebilirlik**: WCAG 2.1 standartlarına uygun
- **Progressive Web App**: Offline çalışma desteği
- **Klavye Kısayolları**: Hızlı kullanım için kısayollar

## 🚀 Kurulum ve Kullanım

### Hızlı Başlangıç
1. Projeyi klonlayın veya indirin
2. `index.html` dosyasını web tarayıcınızda açın
3. Metin girin ve "Metni İşle" butonuna tıklayın
4. Ayarları ihtiyacınıza göre düzenleyin
5. Sesli okuma için "Oynat" butonunu kullanın

### Klavye Kısayolları
- `Ctrl + Enter`: Metni işle
- `Ctrl + Space`: Sesli okumayı başlat/duraklat
- `Ctrl + Escape`: Sesli okumayı durdur

## 📁 Proje Yapısı

```
disleksi/
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri
├── script.js           # JavaScript fonksiyonları
├── fonts/              # Font dosyaları (opsiyonel)
└── README.md           # Proje dokumentasyonu
```

## 🎨 Kullanılan Teknolojiler

- **HTML5**: Semantik yapı ve erişilebilirlik
- **CSS3**: Modern styling ve animasyonlar
- **JavaScript ES6+**: Modern JavaScript özellikleri
- **Web Speech API**: Metin-ses dönüşümü
- **Google Fonts**: Lexend font ailesi
- **OpenDyslexic**: Disleksi dostu font

## 🔧 Geliştirme

### Proje Yapısı
- `DyslexicTextProcessor` sınıfı: Ana uygulama mantığı
- Türkçe heceleme algoritması: `syllabify()` fonksiyonu
- Vurgulama sistemi: CSS sınıfları ile dinamik vurgulama
- Ayarlar sistemi: LocalStorage ile kalıcı ayarlar

### Özelleştirme
CSS değişkenlerini düzenleyerek renk temasını değiştirebilirsiniz:

```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #7b68ee;
    --accent-color: #50c878;
    /* ... diğer değişkenler */
}
```

## 📱 Responsive Tasarım

Uygulama aşağıdaki cihazlarda optimize edilmiştir:
- **Desktop**: 1200px ve üzeri
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: 479px ve altı

## ♿ Erişilebilirlik

- **WCAG 2.1 AA** standartlarına uygun
- **Klavye navigasyonu** tam desteği
- **Ekran okuyucu** uyumluluğu
- **Yüksek kontrast** modu desteği
- **Hareket azaltma** seçeneği

## 🌟 Gelecek Özellikler

- [ ] Çoklu dil desteği
- [ ] Metin içe/dışa aktarma
- [ ] Okuma hızı analizi
- [ ] Kişiselleştirilmiş ayar profilleri
- [ ] Gelişmiş vurgulama algoritmaları
- [ ] Mobil uygulama versiyonu

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Geliştirici Ekibi

- **Proje Yöneticisi**: Kod entegrasyonu ve genel koordinasyon
- **Arayüz Geliştiricisi**: HTML/CSS tasarım ve implementasyon
- **Fonksiyonellik Geliştiricisi**: JavaScript ve algoritma geliştirme

## 📞 İletişim

Sorularınız için:
- GitHub Issues: Teknik problemler ve öneriler
- Email: [proje-email@example.com]
- Discord: [Discord sunucu linki]

## 🙏 Teşekkürler

- **OpenDyslexic**: Disleksi dostu font için
- **Google Fonts**: Lexend font ailesi için
- **MDN Web Docs**: Teknik dokümantasyon için
- **Disleksi Derneği**: Geri bildirimler için

---

**Not**: Bu proje eğitim amaçlı geliştirilmiştir ve sürekli olarak iyileştirilmektedir. Geri bildirimleriniz bizim için çok değerlidir!

## 🔗 Faydalı Bağlantılar

- [Disleksi Hakkında](https://www.disleksi.org/)
- [OpenDyslexic Font](https://opendyslexic.org/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

[![Made with ❤️ for accessibility](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red.svg)](https://github.com/yourusername/disleksi) 