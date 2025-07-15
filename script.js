class DyslexicTextProcessor {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeSettings();
        this.initializeSpeechSynthesis();
        this.currentHighlightIndex = 0;
        this.isPlaying = false;
        this.processedText = '';
        this.highlightedElements = [];
    }

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
        this.fontSizeValue = document.getElementById('fontSizeValue');
        this.letterSpacingSlider = document.getElementById('letterSpacing');
        this.letterSpacingValue = document.getElementById('letterSpacingValue');
        this.lineHeightSlider = document.getElementById('lineHeight');
        this.lineHeightValue = document.getElementById('lineHeightValue');
        this.speechRateSlider = document.getElementById('speechRate');
        this.speechRateValue = document.getElementById('speechRateValue');
        this.highlightModeSelect = document.getElementById('highlightMode');
        this.dyslexicFontCheckbox = document.getElementById('dyslexicFont');
    }

    initializeEventListeners() {
        // Main controls
        this.processBtn.addEventListener('click', () => this.processText());
        this.clearBtn.addEventListener('click', () => this.clearText());
        
        // Audio controls
        this.playBtn.addEventListener('click', () => this.playText());
        this.pauseBtn.addEventListener('click', () => this.pauseText());
        this.stopBtn.addEventListener('click', () => this.stopText());
        
        // Settings listeners
        this.fontSizeSlider.addEventListener('input', (e) => this.updateFontSize(e.target.value));
        this.letterSpacingSlider.addEventListener('input', (e) => this.updateLetterSpacing(e.target.value));
        this.lineHeightSlider.addEventListener('input', (e) => this.updateLineHeight(e.target.value));
        this.speechRateSlider.addEventListener('input', (e) => this.updateSpeechRate(e.target.value));
        this.highlightModeSelect.addEventListener('change', (e) => this.updateHighlightMode(e.target.value));
        this.dyslexicFontCheckbox.addEventListener('change', (e) => this.toggleDyslexicFont(e.target.checked));
        
        // Input text listener
        this.inputText.addEventListener('input', () => this.autoProcess());
    }

    initializeSettings() {
        // Set initial values
        this.updateFontSize(this.fontSizeSlider.value);
        this.updateLetterSpacing(this.letterSpacingSlider.value);
        this.updateLineHeight(this.lineHeightSlider.value);
        this.updateSpeechRate(this.speechRateSlider.value);
        this.toggleDyslexicFont(this.dyslexicFontCheckbox.checked);
    }

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

    getVoices() {
        const voices = this.speechSynthesis.getVoices();
        // Try to find Turkish voice, fallback to default
        this.selectedVoice = voices.find(voice => voice.lang.includes('tr')) || voices[0];
    }

    // Text Processing Functions
    processText() {
        const text = this.inputText.value.trim();
        if (!text) {
            this.showMessage('Lütfen işlenecek bir metin girin.');
            return;
        }

        this.processBtn.innerHTML = '<span class="loading"></span> İşleniyor...';
        this.processBtn.disabled = true;

        setTimeout(() => {
            const mode = this.highlightModeSelect.value;
            let processedHTML = '';

            switch (mode) {
                case 'syllable':
                    processedHTML = this.processBySyllables(text);
                    break;
                case 'word':
                    processedHTML = this.processByWords(text);
                    break;
                case 'sentence':
                    processedHTML = this.processBySentences(text);
                    break;
            }

            this.displayProcessedText(processedHTML);
            this.processBtn.innerHTML = '<span class="btn-icon">🎯</span> Metni İşle';
            this.processBtn.disabled = false;
        }, 500);
    }

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

    processByWords(text) {
        const words = text.split(/\s+/);
        return words.map(word => 
            `<span class="word-highlight">${word}</span>`
        ).join(' ');
    }

    processBySentences(text) {
        const sentences = this.splitIntoSentences(text);
        return sentences.map(sentence => 
            `<div class="sentence-highlight">${sentence}</div>`
        ).join('');
    }

    syllabify(word) {
        // Turkish syllabification rules
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

        // Preserve original casing and punctuation
        return syllables.length > 0 ? syllables : [word];
    }

    splitIntoSentences(text) {
        return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    }

    displayProcessedText(html) {
        this.outputText.innerHTML = html;
        this.processedText = this.outputText.textContent;
        this.highlightedElements = Array.from(this.outputText.querySelectorAll('.syllable-highlight, .word-highlight, .sentence-highlight'));
        this.currentHighlightIndex = 0;
    }

    clearText() {
        this.inputText.value = '';
        this.outputText.innerHTML = '<p class="placeholder">İşlenmiş metin burada görünecek...</p>';
        this.stopText();
        this.processedText = '';
        this.highlightedElements = [];
        this.currentHighlightIndex = 0;
    }

    autoProcess() {
        // Auto-process after 1 second of no typing
        clearTimeout(this.autoProcessTimer);
        this.autoProcessTimer = setTimeout(() => {
            if (this.inputText.value.trim()) {
                this.processText();
            }
        }, 1000);
    }

    // Speech Synthesis Functions
    playText() {
        if (!this.processedText) {
            this.showMessage('Önce metni işleyin.');
            return;
        }

        if (this.speechSynthesis.paused) {
            this.speechSynthesis.resume();
        } else {
            this.startSpeaking();
        }

        this.isPlaying = true;
        this.updateAudioControls();
    }

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

        this.currentUtterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.isPlaying = false;
            this.updateAudioControls();
            this.showMessage('Ses çalma hatası oluştu.');
        };

        this.speechSynthesis.speak(this.currentUtterance);
    }

    pauseText() {
        if (this.speechSynthesis.speaking) {
            this.speechSynthesis.pause();
            this.isPlaying = false;
            this.updateAudioControls();
        }
    }

    stopText() {
        this.speechSynthesis.cancel();
        this.isPlaying = false;
        this.updateAudioControls();
        this.stopHighlightAnimation();
    }

    updateAudioControls() {
        this.playBtn.disabled = this.isPlaying;
        this.pauseBtn.disabled = !this.isPlaying;
        this.stopBtn.disabled = !this.isPlaying && !this.speechSynthesis.speaking;
    }

    // Highlight Animation Functions
    startHighlightAnimation() {
        if (this.highlightedElements.length === 0) return;

        this.highlightInterval = setInterval(() => {
            this.updateHighlight();
        }, 300); // Adjust timing as needed
    }

    updateHighlight() {
        if (this.currentHighlightIndex >= this.highlightedElements.length) {
            this.stopHighlightAnimation();
            return;
        }

        // Remove previous highlight
        this.highlightedElements.forEach(el => el.classList.remove('current-highlight'));

        // Add current highlight
        const currentElement = this.highlightedElements[this.currentHighlightIndex];
        if (currentElement) {
            currentElement.classList.add('current-highlight');
            currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        this.currentHighlightIndex++;
    }

    stopHighlightAnimation() {
        if (this.highlightInterval) {
            clearInterval(this.highlightInterval);
            this.highlightInterval = null;
        }
        
        // Remove all highlights
        this.highlightedElements.forEach(el => el.classList.remove('current-highlight'));
        this.currentHighlightIndex = 0;
    }

    // Settings Functions
    updateFontSize(value) {
        this.fontSizeValue.textContent = `${value}px`;
        this.outputText.style.fontSize = `${value}px`;
    }

    updateLetterSpacing(value) {
        this.letterSpacingValue.textContent = `${value}px`;
        this.outputText.style.letterSpacing = `${value}px`;
    }

    updateLineHeight(value) {
        this.lineHeightValue.textContent = value;
        this.outputText.style.lineHeight = value;
    }

    updateSpeechRate(value) {
        this.speechRateValue.textContent = `${value}x`;
        if (this.currentUtterance) {
            this.currentUtterance.rate = parseFloat(value);
        }
    }

    updateHighlightMode(mode) {
        if (this.inputText.value.trim()) {
            this.processText();
        }
    }

    toggleDyslexicFont(enabled) {
        if (enabled) {
            this.outputText.classList.add('dyslexic-font');
        } else {
            this.outputText.classList.remove('dyslexic-font');
        }
    }

    // Utility Functions
    showMessage(message) {
        // Create temporary message element
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

        // Remove after 3 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }

    // Keyboard Shortcuts
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
}

// Sample text for demonstration
const sampleTexts = [
    "Merhaba! Bu, disleksi dostu metin okuyucu uygulamasıdır. Metinleri hecelere ayırarak okumayı kolaylaştırır.",
    "Eğitim, her bireyin hakkıdır. Bu uygulama, öğrenme zorluklarını aşmaya yardımcı olmak için tasarlanmıştır.",
    "Teknoloji, hayatımızı kolaylaştırmak için kullanılmalıdır. Bu araç, okuma deneyimini daha erişilebilir hale getirir."
];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new DyslexicTextProcessor();
    app.initializeKeyboardShortcuts();
    
    // Add sample text button
    const sampleBtn = document.createElement('button');
    sampleBtn.className = 'btn btn-secondary';
    sampleBtn.innerHTML = '<span class="btn-icon">📝</span> Örnek Metin';
    sampleBtn.style.marginLeft = '10px';
    
    sampleBtn.addEventListener('click', () => {
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        app.inputText.value = randomText;
        app.processText();
    });
    
    document.querySelector('.controls').appendChild(sampleBtn);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .message {
            font-weight: 600;
            border-left: 4px solid rgba(255, 255, 255, 0.3);
        }
    `;
    document.head.appendChild(style);
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 