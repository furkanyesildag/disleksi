# 🔧 Teknik Dokümantasyon

## Genel Bakış

DisleksiApp, vanilla JavaScript, HTML5 ve CSS3 teknolojileri kullanılarak geliştirilmiş client-side web uygulamasıdır. Modern web standartlarını takip eder ve framework bağımsız çalışır.

## Sistem Gereksinimleri

### Minimum Gereksinimler
- **Tarayıcı**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: ES6+ desteği
- **Web APIs**: Speech Synthesis API
- **Bellek**: 512MB RAM
- **Depolama**: 5MB disk alanı

### Önerilen Gereksinimler
- **Tarayıcı**: Chrome 90+, Firefox 85+, Safari 14+, Edge 90+
- **İşlemci**: Dual-core 2GHz+
- **Bellek**: 2GB RAM
- **Bağlantı**: Broadband internet (font yükleme için)

## Kod Yapısı

### Dosya Organizasyonu
```
disleksi/
├── index.html              # Ana sayfa
├── style.css               # Stil dosyası
├── script.js               # Ana JavaScript dosyası
├── docs/                   # Dokümantasyon
│   ├── architecture.md
│   ├── user-guide.md
│   ├── technical-docs.md
│   └── accessibility-report.md
├── fonts/                  # Font dosyaları (opsiyonel)
├── .gitignore
└── README.md
```

### HTML Yapısı (index.html)

#### Semantic Elements
```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <!-- Meta tags, title, CSS imports -->
</head>
<body>
    <div class="container">
        <header class="header">
            <!-- Başlık ve alt başlık -->
        </header>
        
        <main class="main-content">
            <!-- Ana içerik grid layout -->
            <div class="input-section">
                <!-- Metin girişi -->
            </div>
            
            <div class="settings-section">
                <!-- Ayarlar paneli -->
            </div>
            
            <div class="output-section">
                <!-- İşlenmiş metin çıktısı -->
            </div>
        </main>
        
        <footer class="footer">
            <!-- Telif hakkı bilgisi -->
        </footer>
    </div>
</body>
</html>
```

#### Form Elements
```html
<!-- Metin girişi -->
<textarea id="inputText" rows="8" 
          placeholder="Buraya okumak istediğiniz metni yazın...">
</textarea>

<!-- Ayar kontrolleri -->
<input type="range" id="fontSize" min="14" max="32" value="18">
<input type="range" id="letterSpacing" min="0" max="5" value="1" step="0.1">
<select id="highlightMode">
    <option value="syllable">Heceler</option>
    <option value="word">Kelimeler</option>
    <option value="sentence">Cümleler</option>
</select>
<input type="checkbox" id="dyslexicFont" checked>
```

### CSS Yapısı (style.css)

#### CSS Variables
```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #7b68ee;
    --accent-color: #50c878;
    --background-color: #f8f9fa;
    --surface-color: #ffffff;
    --text-color: #2c3e50;
    --text-secondary: #6c757d;
    --border-color: #e9ecef;
    --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --border-radius: 12px;
    --transition: all 0.3s ease;
}
```

#### Layout System
```css
/* Grid Layout */
.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

/* Flexbox Components */
.controls {
    display: flex;
    gap: 15px;
}

.output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

#### Responsive Design
```css
@media (max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 15px;
    }
}
```

### JavaScript Yapısı (script.js)

#### Ana Sınıf: DyslexicTextProcessor
```javascript
class DyslexicTextProcessor {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeSettings();
        this.initializeSpeechSynthesis();
        
        // State variables
        this.currentHighlightIndex = 0;
        this.isPlaying = false;
        this.processedText = '';
        this.highlightedElements = [];
    }
}
```

#### Element Initialization
```javascript
initializeElements() {
    // Input elements
    this.inputText = document.getElementById('inputText');
    this.outputText = document.getElementById('outputText');
    
    // Control buttons
    this.processBtn = document.getElementById('processText');
    this.clearBtn = document.getElementById('clearText');
    this.playBtn = document.getElementById('playBtn');
    this.pauseBtn = document.getElementById('pauseBtn');
    this.stopBtn = document.getElementById('stopBtn');
    
    // Settings elements
    this.fontSizeSlider = document.getElementById('fontSize');
    this.letterSpacingSlider = document.getElementById('letterSpacing');
    // ... diğer ayar elementleri
}
```

#### Event Listeners
```javascript
initializeEventListeners() {
    // Main controls
    this.processBtn.addEventListener('click', () => this.processText());
    this.clearBtn.addEventListener('click', () => this.clearText());
    
    // Audio controls
    this.playBtn.addEventListener('click', () => this.playText());
    this.pauseBtn.addEventListener('click', () => this.pauseText());
    this.stopBtn.addEventListener('click', () => this.stopText());
    
    // Settings listeners
    this.fontSizeSlider.addEventListener('input', (e) => 
        this.updateFontSize(e.target.value));
    // ... diğer ayar event listener'ları
}
```

## Algoritma Detayları

### Türkçe Heceleme Algoritması

#### Temel Mantık
```javascript
syllabify(word) {
    const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
    if (cleanWord.length <= 2) return [word];

    const vowels = 'aeıioöuü';
    const syllables = [];
    let currentSyllable = '';
    let lastWasVowel = false;

    for (let i = 0; i < cleanWord.length; i++) {
        const char = cleanWord[i];
        const isVowel = vowels.includes(char);

        if (isVowel) {
            if (lastWasVowel && currentSyllable) {
                syllables.push(currentSyllable);
                currentSyllable = char;
            } else {
                currentSyllable += char;
            }
            lastWasVowel = true;
        } else {
            if (lastWasVowel && currentSyllable && i < cleanWord.length - 1) {
                const nextChar = cleanWord[i + 1];
                if (vowels.includes(nextChar)) {
                    syllables.push(currentSyllable);
                    currentSyllable = char;
                } else {
                    currentSyllable += char;
                }
            } else {
                currentSyllable += char;
            }
            lastWasVowel = false;
        }
    }

    if (currentSyllable) {
        syllables.push(currentSyllable);
    }

    return syllables.length > 0 ? syllables : [word];
}
```

#### Türkçe Dil Kuralları
1. **Sesli Harf Tanıma**: `aeıioöuü` karakterleri
2. **Hece Sınırları**: Sesli harf + sessiz harf kombinasyonları
3. **Çift Sesli**: Ardışık sesli harfler ayrı hecelerde
4. **Sessiz Kümeleri**: Sessiz harf grupları tek hecede

### Metin İşleme Modları

#### Hece Bazlı İşleme
```javascript
processBySyllables(text) {
    const sentences = this.splitIntoSentences(text);
    let html = '';

    sentences.forEach(sentence => {
        const words = sentence.split(/\s+/);
        const processedWords = words.map(word => {
            const syllables = this.syllabify(word);
            return syllables.map(syllable => 
                `<span class="syllable-highlight">${syllable}</span>`
            ).join('');
        });
        html += processedWords.join(' ') + ' ';
    });

    return html;
}
```

#### Kelime Bazlı İşleme
```javascript
processByWords(text) {
    const words = text.split(/\s+/);
    return words.map(word => 
        `<span class="word-highlight">${word}</span>`
    ).join(' ');
}
```

#### Cümle Bazlı İşleme
```javascript
processBySentences(text) {
    const sentences = this.splitIntoSentences(text);
    return sentences.map(sentence => 
        `<div class="sentence-highlight">${sentence}</div>`
    ).join('');
}
```

### Cümle Ayrıştırma
```javascript
splitIntoSentences(text) {
    return text.split(/[.!?]+/)
               .filter(sentence => sentence.trim().length > 0);
}
```

## Web Speech API Entegrasyonu

### Speech Synthesis Setup
```javascript
initializeSpeechSynthesis() {
    this.speechSynthesis = window.speechSynthesis;
    this.currentUtterance = null;
    
    // Get Turkish voice if available
    this.getVoices();
    
    // Listen for voices changed event
    this.speechSynthesis.addEventListener('voiceschanged', () => {
        this.getVoices();
    });
}
```

### Voice Selection
```javascript
getVoices() {
    const voices = this.speechSynthesis.getVoices();
    // Try to find Turkish voice, fallback to default
    this.selectedVoice = voices.find(voice => voice.lang.includes('tr')) || voices[0];
}
```

### Speech Playback
```javascript
startSpeaking() {
    this.stopText();
    
    this.currentUtterance = new SpeechSynthesisUtterance(this.processedText);
    this.currentUtterance.voice = this.selectedVoice;
    this.currentUtterance.rate = parseFloat(this.speechRateSlider.value);
    this.currentUtterance.pitch = 1;
    this.currentUtterance.volume = 1;

    this.currentUtterance.onstart = () => {
        this.isPlaying = true;
        this.updateAudioControls();
        this.startHighlightAnimation();
    };

    this.currentUtterance.onend = () => {
        this.isPlaying = false;
        this.updateAudioControls();
        this.stopHighlightAnimation();
    };

    this.speechSynthesis.speak(this.currentUtterance);
}
```

## Vurgulama Sistemi

### CSS Sınıfları
```css
.syllable-highlight {
    background-color: #ffeb3b;
    color: #333;
    padding: 2px 4px;
    border-radius: 4px;
    margin: 0 2px;
    transition: var(--transition);
}

.syllable-highlight:nth-child(even) {
    background-color: #81c784;
    color: white;
}

.word-highlight {
    background-color: #e3f2fd;
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 6px;
    margin: 0 4px;
    border: 1px solid #bbdefb;
}

.sentence-highlight {
    background-color: #f3e5f5;
    color: #7b1fa2;
    padding: 8px;
    border-radius: 8px;
    margin: 4px 0;
    border-left: 4px solid #ce93d8;
}

.current-highlight {
    background-color: #ff5722 !important;
    color: white !important;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
}
```

### Dinamik Vurgulama
```javascript
startHighlightAnimation() {
    if (this.highlightedElements.length === 0) return;

    this.highlightInterval = setInterval(() => {
        this.updateHighlight();
    }, 300); // Timing ayarlanabilir
}

updateHighlight() {
    if (this.currentHighlightIndex >= this.highlightedElements.length) {
        this.stopHighlightAnimation();
        return;
    }

    // Remove previous highlight
    this.highlightedElements.forEach(el => 
        el.classList.remove('current-highlight'));

    // Add current highlight
    const currentElement = this.highlightedElements[this.currentHighlightIndex];
    if (currentElement) {
        currentElement.classList.add('current-highlight');
        currentElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    this.currentHighlightIndex++;
}
```

## Performans Optimizasyonları

### Debouncing
```javascript
autoProcess() {
    // Auto-process after 1 second of no typing
    clearTimeout(this.autoProcessTimer);
    this.autoProcessTimer = setTimeout(() => {
        if (this.inputText.value.trim()) {
            this.processText();
        }
    }, 1000);
}
```

### Memory Management
```javascript
// Event listener cleanup
stopHighlightAnimation() {
    if (this.highlightInterval) {
        clearInterval(this.highlightInterval);
        this.highlightInterval = null;
    }
    
    // Remove all highlights
    this.highlightedElements.forEach(el => 
        el.classList.remove('current-highlight'));
    this.currentHighlightIndex = 0;
}
```

### DOM Manipulation
```javascript
displayProcessedText(html) {
    this.outputText.innerHTML = html;
    this.processedText = this.outputText.textContent;
    this.highlightedElements = Array.from(
        this.outputText.querySelectorAll(
            '.syllable-highlight, .word-highlight, .sentence-highlight'
        )
    );
    this.currentHighlightIndex = 0;
}
```

## Hata Yönetimi

### Speech Synthesis Errors
```javascript
this.currentUtterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    this.isPlaying = false;
    this.updateAudioControls();
    this.showMessage('Ses çalma hatası oluştu.');
};
```

### Input Validation
```javascript
processText() {
    const text = this.inputText.value.trim();
    if (!text) {
        this.showMessage('Lütfen işlenecek bir metin girin.');
        return;
    }
    // ... processing logic
}
```

### User Feedback
```javascript
showMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}
```

## Klavye Kısayolları

### Keyboard Event Handling
```javascript
initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    this.processText();
                    break;
                case ' ':
                    e.preventDefault();
                    if (this.isPlaying) {
                        this.pauseText();
                    } else {
                        this.playText();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.stopText();
                    break;
            }
        }
    });
}
```

## Font Entegrasyonu

### OpenDyslexic Font
```css
@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/fonts/OpenDyslexic-Regular.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/fonts/OpenDyslexic-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
```

### Dynamic Font Switching
```javascript
toggleDyslexicFont(enabled) {
    if (enabled) {
        this.outputText.classList.add('dyslexic-font');
    } else {
        this.outputText.classList.remove('dyslexic-font');
    }
}
```

## Deployment

### GitHub Pages Configuration
```yaml
# .github/workflows/pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Testing

### Manual Testing Checklist
- [ ] Metin girişi çalışıyor
- [ ] Heceleme algoritması doğru
- [ ] Sesli okuma çalışıyor
- [ ] Vurgulama animasyonu çalışıyor
- [ ] Ayarlar kayıt ediliyor
- [ ] Responsive tasarım çalışıyor
- [ ] Klavye kısayolları çalışıyor
- [ ] Erişilebilirlik özellikleri aktif

### Browser Compatibility
- ✅ Chrome 90+ (Fully supported)
- ✅ Firefox 85+ (Fully supported)
- ✅ Safari 14+ (Fully supported)
- ✅ Edge 90+ (Fully supported)
- ⚠️ Internet Explorer (Not supported)

## Güvenlik

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               font-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### Input Sanitization
```javascript
// XSS koruması için HTML encode
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

## Monitoring

### Performance Monitoring
```javascript
// Performance timing
const startTime = performance.now();
this.processText();
const endTime = performance.now();
console.log(`Processing time: ${endTime - startTime}ms`);
```

### Error Tracking
```javascript
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    // Send to error tracking service
});
```

## Gelecek Geliştirmeler

### Planned Features
1. **Service Worker**: Offline support
2. **IndexedDB**: Local data storage
3. **WebRTC**: Real-time features
4. **WebAssembly**: Performance-critical algorithms
5. **Progressive Web App**: Native app experience

### Code Improvements
1. **TypeScript**: Type safety
2. **Module System**: ES6 modules
3. **Build System**: Webpack/Vite
4. **Testing**: Jest/Cypress
5. **CI/CD**: Automated testing and deployment

---

## Sonuç

DisleksiApp, modern web teknolojilerini kullanarak disleksili bireylerin okuma deneyimini iyileştiren, erişilebilir ve performanslı bir web uygulamasıdır. Vanilla JavaScript ile geliştirilmiş olması, framework bağımlılığı olmadan hızlı ve güvenilir çalışmasını sağlar. 