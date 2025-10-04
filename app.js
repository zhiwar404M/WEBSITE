// app.js - فەنکشنە گشتییەکانی ئاپ

// فەنکشنی Coming Soon
function showComingSoon() {
    const messages = {
        "ku": "🚀 ئەم بەرنامەیە بەم زووانە دێت! بەشداربە بۆ وەرگرتنی ئاگادارکردنەوە.",
        "ar": "🚀 هذا التطبيق قادم قريباً! اشترك لتلقي الإشعار.",
        "en": "🚀 This app is coming soon! Subscribe to get notified."
    };
    
    const currentLang = document.documentElement.lang || 'en';
    alert(messages[currentLang] || messages['en']);
}

// فەنکشنی داگرتن بە ڕیکلام
function startDownloadWithAds(url) {
    showComingSoon(); // لەبری داگرتن، Coming Soon نیشان بدە
    
    // ئەگەر بیەوێ ڕیکلام نیشان بدەیت پێش Coming Soon:
    /*
    if (typeof showAd === 'function') {
        showAd(() => {
            showComingSoon();
        });
    } else {
        showComingSoon();
    }
    */
}

// فەنکشنی کردنەوەی مۆدالی خشتەکراوە
function openLoginModal() {
    const overlay = document.getElementById('loginModalOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// فەنکشنی داخستنی مۆدالی خشتەکراوە
function closeLoginModal() {
    const overlay = document.getElementById('loginModalOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// فەنکشنی مەنیجەری ڕێگا
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle?.querySelector('.material-icons-round');
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    updateThemeIcon(theme) {
        if (this.themeIcon) {
            this.themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        }
    }
}

// فەنکشنی دەستپێکردنی هەموو سیستەمەکان
function initializeApp() {
    // دەستپێکردنی سیستەمی زمان
    if (window.LanguageManager) {
        window.LanguageManager.initLanguageSystem();
    }
    
    // دەستپێکردنی سیستەمی ڕێگا
    new ThemeManager();
    
    // Event listeners بۆ مۆدالی خشتەکراوە
    const loginModal = document.getElementById('loginModalOverlay');
    const loginClose = document.getElementById('loginModalClose');
    
    if (loginModal && loginClose) {
        loginClose.addEventListener('click', closeLoginModal);
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) closeLoginModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && loginModal.style.display === 'flex') {
                closeLoginModal();
            }
        });
    }
    
    // Event listener بۆ Header scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            header.classList.toggle('scrolled', window.pageYOffset > 100);
        }
    });
}

// دەستپێکردن کاتێ DOM ئامادەیە
document.addEventListener('DOMContentLoaded', initializeApp);

// ئامادەکردن بۆ بەکارهێنانی لە دەرەوە
window.AppManager = {
    showComingSoon,
    startDownloadWithAds,
    openLoginModal,
    closeLoginModal
};
