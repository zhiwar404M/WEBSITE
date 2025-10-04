// app.js

// فەنکشنی Coming Soon
function showComingSoon() {
    const currentLang = document.documentElement.lang || 'en';
    const messages = {
        "ku": "🚀 ئەم بەرنامەیە بەم زووانە دێت! بەشداربە بۆ وەرگرتنی ئاگادارکردنەوە.",
        "ar": "🚀 هذا التطبيق قادم قريباً! اشترك لتلقي الإشعار.",
        "en": "🚀 This app is coming soon! Subscribe to get notified."
    };
    
    alert(messages[currentLang] || messages['en']);
}

// فەنکشنی داگرتن
function startDownloadWithAds(url) {
    showComingSoon();
}

// فەنکشنی مەنیجەری ڕێگا
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        if (this.themeToggle) {
            this.themeIcon = this.themeToggle.querySelector('.material-icons-round');
            this.init();
        }
    }

    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
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
    console.log('Initializing app...');
    
    // دەستپێکردنی سیستەمی ڕێگا
    new ThemeManager();
    
    // Event listeners بۆ مۆدالی خشتەکراوە
    setupLoginModal();
}

// فەنکشنی ڕێکخستنی مۆدالی خشتەکراوە
function setupLoginModal() {
    const loginModal = document.getElementById('loginModalOverlay');
    const loginClose = document.getElementById('loginModalClose');
    const loginLink = document.getElementById('loginNavLink');
    
    if (loginModal && loginClose) {
        // داخستنی مۆدال
        loginClose.addEventListener('click', closeLoginModal);
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) closeLoginModal();
        });
        
        // کردنەوەی مۆدال
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                openLoginModal();
            });
        }
        
        // کلیلی ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && loginModal.style.display === 'flex') {
                closeLoginModal();
            }
        });
        
        // گۆڕینی فۆرمەکان
        setupAuthForms();
    }
}

// فەنکشنی ڕێکخستنی فۆرمەکانی خشتەکراوە
function setupAuthForms() {
    const tabSignIn = document.getElementById('tabSignIn');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    if (tabSignIn && tabRegister) {
        tabSignIn.addEventListener('click', () => showAuthForm('login'));
        tabRegister.addEventListener('click', () => showAuthForm('register'));
    }
    
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthForm('register');
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthForm('login');
        });
    }
    
    // ڕێکخستنی فۆرمەکان
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// فەنکشنی نیشاندانی فۆرمی خشتەکراوە
function showAuthForm(formType) {
    const tabSignIn = document.getElementById('tabSignIn');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (formType === 'login') {
        tabSignIn?.classList.add('active');
        tabRegister?.classList.remove('active');
        loginForm?.style.setProperty('display', 'block', 'important');
        registerForm?.style.setProperty('display', 'none', 'important');
    } else {
        tabRegister?.classList.add('active');
        tabSignIn?.classList.remove('active');
        registerForm?.style.setProperty('display', 'block', 'important');
        loginForm?.style.setProperty('display', 'none', 'important');
    }
}

// فەنکشنی مامەڵەکردن لەگەڵ چوونەژوورەوە
function handleLogin(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    
    if (!email || !password) {
        showAuthError('login', 'تکایە هەموو خانەکان پڕ بکەرەوە');
        return;
    }
    
    // لێرەدا دەتوانیت PHP API بانگ بکەیت
    loginWithPHP(email, password);
}

// فەنکشنی مامەڵەکردن لەگەڵ تۆمارکردن
function handleRegister(e) {
    e.preventDefault();
    console.log('Register form submitted');
    
    const email = document.getElementById('regEmail')?.value;
    const password = document.getElementById('regPassword')?.value;
    const confirmPassword = document.getElementById('regConfirm')?.value;
    
    if (!email || !password || !confirmPassword) {
        showAuthError('register', 'تکایە هەموو خانەکان پڕ بکەرەوە');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthError('register', 'وشەی نهێنییەکان یەک ناخوێننەوە');
        return;
    }
    
    if (password.length < 6) {
        showAuthError('register', 'وشەی نهێنی دەبێت کەمتر لە ٦ پیت نەبێت');
        return;
    }
    
    // لێرەدا دەتوانیت PHP API بانگ بکەیت
    registerWithPHP(email, password);
}

// فەنکشنی نیشاندانی هەڵە
function showAuthError(formType, message) {
    const errorElement = document.getElementById(formType === 'login' ? 'authError' : 'regError');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

// فەنکشنی چوونەژوورەوە بە PHP
async function loginWithPHP(email, password) {
    try {
        showAuthError('login', 'چوونەژوورەوە...');
        
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAuthError('login', 'بە سەرکەوتوویی چوویتە ژوورەوە!');
            closeLoginModal();
            updateUserUI(data.user);
        } else {
            showAuthError('login', data.message || 'هەڵەیەک ڕوویدا');
        }
    } catch (error) {
        showAuthError('login', 'پەیوەندی بە ئینتەرنێتەوە ناکەوێت');
    }
}

// فەنکشنی تۆمارکردن بە PHP
async function registerWithPHP(email, password) {
    try {
        showAuthError('register', 'دروستکردنی هەژمار...');
        
        const response = await fetch('api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAuthError('register', 'هەژمارەکەت بە سەرکەوتوویی دروست کرا!');
            showAuthForm('login');
        } else {
            showAuthError('register', data.message || 'هەڵەیەک ڕوویدا');
        }
    } catch (error) {
        showAuthError('register', 'پەیوەندی بە ئینتەرنێتەوە ناکەوێت');
    }
}

// فەنکشنی نوێکردنەوەی UIی بەکارهێنەر
function updateUserUI(user) {
    const loginLink = document.getElementById('loginNavLink');
    const userChip = document.getElementById('userChip');
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginLink) loginLink.style.display = 'none';
    if (userChip) userChip.style.display = 'inline-flex';
    if (userEmail) userEmail.textContent = user.email;
    if (userAvatar) userAvatar.src = user.avatar || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + user.email;
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// فەنکشنی چوونەدەرەوە
function handleLogout() {
    // پاککردنەوەی درێختەی بەکارهێنەر
    localStorage.removeItem('user');
    
    // نوێکردنەوەی UI
    const loginLink = document.getElementById('loginNavLink');
    const userChip = document.getElementById('userChip');
    
    if (loginLink) loginLink.style.display = 'flex';
    if (userChip) userChip.style.display = 'none';
}

// فەنکشنی کردنەوەی مۆدالی خشتەکراوە
function openLoginModal() {
    const overlay = document.getElementById('loginModalOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // ڕێکخستنی فۆرم
        showAuthForm('login');
        
        // پاککردنەوەی هەڵەکان
        const authError = document.getElementById('authError');
        const regError = document.getElementById('regError');
        if (authError) authError.style.display = 'none';
        if (regError) regError.style.display = 'none';
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

// چاوەروانی کردنی DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

// ئامادەکردن بۆ بەکارهێنانی لە دەرەوە
window.AppManager = {
    showComingSoon,
    startDownloadWithAds,
    openLoginModal,
    closeLoginModal
};