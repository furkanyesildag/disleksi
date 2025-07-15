# 🏗️ Proje Mimarisi

## Genel Mimari

DisleksiApp, client-side rendering ile çalışan modern bir web uygulamasıdır. Vanilla JavaScript kullanılarak geliştirilmiş olup, framework bağımsız bir yapıya sahiptir.

## Dosya Yapısı

```
disleksi/
├── index.html              # Ana HTML dosyası
├── style.css               # CSS stilleri ve responsive tasarım
├── script.js               # JavaScript uygulaması
├── docs/                   # Dokümantasyon dosyaları
│   ├── architecture.md     # Proje mimarisi
│   ├── user-guide.md       # Kullanıcı kılavuzu
│   ├── technical-docs.md   # Teknik dokümantasyon
│   └── accessibility-report.md # Erişilebilirlik raporu
├── fonts/                  # Font dosyaları (opsiyonel)
├── .gitignore             # Git ignore dosyası
└── README.md              # Proje açıklaması
```

## Teknik Mimari

### Frontend Katmanı

#### HTML5 (index.html)
- **Semantik yapı**: Header, main, footer etiketleri
- **Erişilebilirlik**: ARIA etiketleri ve screen reader desteği
- **Responsive meta tag**: Mobil uyumluluk için viewport
- **Font preloading**: Performans optimizasyonu

#### CSS3 (style.css)
- **CSS Variables**: Renk ve boyut yönetimi
- **Grid & Flexbox**: Modern layout sistemi
- **Media queries**: Responsive tasarım
- **Animations**: Kullanıcı deneyimi iyileştirmeleri
- **Font face**: OpenDyslexic ve Lexend font entegrasyonu

#### JavaScript ES6+ (script.js)
- **Class-based architecture**: DyslexicTextProcessor sınıfı
- **Module pattern**: Fonksiyonellik ayrımı
- **Event-driven**: Kullanıcı etkileşimleri
- **Async/await**: Modern JavaScript özellikleri

## Veri Akışı

```
Kullanıcı Input → Metin İşleme → Heceleme → Vurgulama → Sesli Okuma
     ↓              ↓            ↓          ↓          ↓
 Textarea → DyslexicTextProcessor → syllabify() → CSS Classes → Web Speech API
```

## Sınıf Yapısı

### DyslexicTextProcessor
```javascript
class DyslexicTextProcessor {
    constructor()           // Başlangıç ayarları
    initializeElements()    // DOM element referansları
    initializeEventListeners() // Event listener'lar
    processText()          // Ana metin işleme
    syllabify()           // Türkçe heceleme algoritması
    playText()            // Sesli okuma
    updateSettings()      // Ayar güncellemeleri
}
```

## Algoritma Detayları

### Türkçe Heceleme Algoritması
```javascript
syllabify(word) {
    // 1. Sesli harfleri tespit et
    const vowels = 'aeıioöuü';
    
    // 2. Hece sınırlarını belirle
    // 3. Türkçe dil kurallarını uygula
    // 4. Hece dizisini döndür
}
```

### Vurgulama Sistemi
- **Hece vurgulaması**: Alternating colors
- **Kelime vurgulaması**: Border ve background
- **Cümle vurgulaması**: Block-level highlighting

## API Entegrasyonları

### Web Speech API
```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.voice = turkishVoice;
utterance.rate = userDefinedRate;
speechSynthesis.speak(utterance);
```

### Font APIs
- **Google Fonts**: Lexend font ailesi
- **CDN**: OpenDyslexic font servisi

## Performans Optimizasyonları

### CSS
- **Critical CSS**: Inline kritik stiller
- **Font display**: swap özelliği
- **Minification**: Dosya boyutu optimizasyonu

### JavaScript
- **Debouncing**: Input event optimizasyonu
- **Lazy loading**: Gerektiğinde yükleme
- **Memory management**: Event listener temizleme

## Güvenlik Özellikleri

### Client-side Security
- **Input sanitization**: XSS koruması
- **CSP headers**: Content Security Policy
- **HTTPS**: Güvenli veri iletimi

## Deployment Mimarisi

### GitHub Pages
```
GitHub Repository → GitHub Actions → GitHub Pages → CDN
```

### Caching Strategy
- **Browser cache**: Static assets
- **Service worker**: Offline support (gelecek)
- **CDN cache**: Font dosyaları

## Monitoring ve Analytics

### Performance Monitoring
- **Core Web Vitals**: Sayfa performansı
- **User timing**: Custom metrics
- **Error tracking**: JavaScript hataları

### Usage Analytics
- **User interactions**: Button clicks, feature usage
- **Performance metrics**: Load times, responsiveness
- **Accessibility metrics**: Keyboard navigation, screen reader usage

## Gelecek Mimarisi

### Planned Improvements
- **Service Worker**: PWA desteği
- **IndexedDB**: Offline veri saklama
- **WebRTC**: Gerçek zamanlı özellikler
- **WebAssembly**: Performans kritik algoritmalar

### Scalability Considerations
- **Microservices**: API ayrımı
- **CDN**: Global dağıtım
- **Load balancing**: Trafik yönetimi
- **Database**: Kullanıcı verileri

## Teknoloji Stack

### Core Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling
- **JavaScript ES6+**: Application logic
- **Web APIs**: Speech, Storage, etc.

### Development Tools
- **Git**: Version control
- **GitHub**: Repository hosting
- **GitHub Pages**: Static hosting
- **VS Code**: Development environment

### External Dependencies
- **Google Fonts**: Typography
- **OpenDyslexic**: Accessibility fonts
- **Placeholder.com**: Demo images

## Kod Kalitesi

### Standards
- **ES6+ Features**: Modern JavaScript
- **Semantic HTML**: Meaningful markup
- **BEM Methodology**: CSS naming convention
- **WCAG 2.1 AA**: Accessibility standards

### Best Practices
- **Clean Code**: Readable ve maintainable
- **DRY Principle**: Don't Repeat Yourself
- **SOLID Principles**: Object-oriented design
- **Progressive Enhancement**: Graceful degradation 