// ===============================================
// app.js - ZHIWAR Website - Complete & Fixed
// ===============================================

console.log(‘🚀 ZHIWAR App.js loaded successfully!’);

// ========================
// 1. LOADING SCREEN HANDLER
// ========================
function hideLoadingScreen() {
console.log(‘⏳ Hiding loading screen…’);
const loadingScreen = document.getElementById(‘loading-screen’);

```
if (loadingScreen) {
    console.log('✅ Loading screen found!');
    loadingScreen.classList.add('hidden');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        console.log('✅ Loading screen hidden completely!');
    }, 500);
} else {
    console.error('❌ Loading screen element not found!');
}
```

}

// Multiple methods to ensure loading screen hides
setTimeout(hideLoadingScreen, 1500);

window.addEventListener(‘load’, function() {
console.log(‘✅ Window fully loaded’);
setTimeout(hideLoadingScreen, 500);
});

// Emergency fallback
setTimeout(function() {
const ls = document.getElementById(‘loading-screen’);
if (ls && ls.style.display !== ‘none’) {
console.log(‘⚠️ Emergency: Force hiding loading screen’);
ls.classList.add(‘hidden’);
setTimeout(() => ls.style.display = ‘none’, 500);
}
}, 3000);

// ========================
// 2. COMING SOON FUNCTION
// ========================
function showComingSoon() {
const currentLang = document.documentElement.lang || ‘en’;
const messages = {
“ku”: “🚀 ئەم بەرنامەیە بەم زووانە دێت! بەشداربە بۆ وەرگرتنی ئاگادارکردنەوە.”,
“ar”: “🚀 هذا التطبيق قادم قريباً! اشترك لتلقي الإشعار.”,
“en”: “🚀 This app is coming soon! Subscribe to get notified.”
};

```
alert(messages[currentLang] || messages['en']);
```

}

// ========================
// 3. DOWNLOAD FUNCTION
// ========================
function startDownloadWithAds(url) {
showComingSoon();
// Uncomment when ready for actual downloads
// window.location.href = url;
}

// ========================
// 4. THEME MANAGER
// ========================
class ThemeManager {
constructor() {
this.themeToggle = document.getElementById(‘themeToggle’);
if (this.themeToggle) {
this.themeIcon = this.themeToggle.querySelector(’.material-icons-round’);
this.init();
}
}

```
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
```

}

// ========================
// 5. LOGIN MODAL FUNCTIONS
// ========================
function openLoginModal() {
const overlay = document.getElementById(‘loginModalOverlay’);
if (overlay) {
overlay.style.display = ‘flex’;
document.body.style.overflow = ‘hidden’;
showAuthForm(‘login’);

```
    // Clear errors
    const authError = document.getElementById('authError');
    const regError = document.getElementById('regError');
    if (authError) authError.style.display = 'none';
    if (regError) regError.style.display = 'none';
}
```

}

function closeLoginModal() {
const overlay = document.getElementById(‘loginModalOverlay’);
if (overlay) {
overlay.style.display = ‘none’;
document.body.style.overflow = ‘’;
}
}

function setupLoginModal() {
const loginModal = document.getElementById(‘loginModalOverlay’);
const loginClose = document.getElementById(‘loginModalClose’);
const loginLink = document.getElementById(‘loginNavLink’);

```
if (loginModal && loginClose) {
    loginClose.addEventListener('click', closeLoginModal);
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) closeLoginModal();
    });
    
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            openLoginModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal.style.display === 'flex') {
            closeLoginModal();
        }
    });
    
    setupAuthForms();
}
```

}

// ========================
// 6. AUTH FORMS SETUP
// ========================
function showAuthForm(formType) {
const tabSignIn = document.getElementById(‘tabSignIn’);
const tabRegister = document.getElementById(‘tabRegister’);
const loginForm = document.getElementById(‘loginForm’);
const registerForm = document.getElementById(‘registerForm’);

```
if (formType === 'login') {
    tabSignIn?.classList.add('active');
    tabRegister?.classList.remove('active');
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
} else {
    tabRegister?.classList.add('active');
    tabSignIn?.classList.remove('active');
    if (registerForm) registerForm.style.display = 'block';
    if (loginForm) loginForm.style.display = 'none';
}
```

}

function setupAuthForms() {
const tabSignIn = document.getElementById(‘tabSignIn’);
const tabRegister = document.getElementById(‘tabRegister’);
const loginForm = document.getElementById(‘loginForm’);
const registerForm = document.getElementById(‘registerForm’);
const linkToRegister = document.getElementById(‘linkToRegister’);
const linkToSignIn = document.getElementById(‘linkToSignIn’);

```
if (tabSignIn) tabSignIn.addEventListener('click', () => showAuthForm('login'));
if (tabRegister) tabRegister.addEventListener('click', () => showAuthForm('register'));
if (linkToRegister) linkToRegister.addEventListener('click', (e) => { e.preventDefault(); showAuthForm('register'); });
if (linkToSignIn) linkToSignIn.addEventListener('click', (e) => { e.preventDefault(); showAuthForm('login'); });

if (loginForm) loginForm.addEventListener('submit', handleLogin);
if (registerForm) registerForm.addEventListener('submit', handleRegister);
```

}

// ========================
// 7. AUTH HANDLERS
// ========================
function handleLogin(e) {
e.preventDefault();
console.log(‘Login form submitted’);

```
const email = document.getElementById('loginEmail')?.value;
const password = document.getElementById('loginPassword')?.value;

if (!email || !password) {
    showAuthError('login', 'تکایە هەموو خانەکان پڕ بکەرەوە');
    return;
}

loginWithPHP(email, password);
```

}

function handleRegister(e) {
e.preventDefault();
console.log(‘Register form submitted’);

```
const email = document.getElementById('regEmail')?.value;
const password = document.getElementById('regPassword')?.value;
const confirmPassword = document.getElementById('regPassword2')?.value;

if (!email || !password || !confirmPassword) {
    showAuthError('register', 'تکایە هەموو خانەکان پڕ بکەرەوە');
    return;
}

if (password !== confirmPassword) {
    showAuthError('register', 'وشەی نهێنییەکان یەکناگرنەوە');
    return;
}

if (password.length < 6) {
    showAuthError('register', 'وشەی نهێنی دەبێت لانیکەم ٦ پیت بێت');
    return;
}

registerWithPHP(email, password);
```

}

function showAuthError(formType, message) {
const errorElement = document.getElementById(formType === ‘login’ ? ‘authError’ : ‘regError’);
if (errorElement) {
errorElement.textContent = message;
errorElement.style.display = ‘block’;

```
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}
```

}

// ========================
// 8. PHP API CALLS
// ========================
async function loginWithPHP(email, password) {
try {
showAuthError(‘login’, ‘چوونەژوورەوە…’);

```
    const response = await fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    showAuthError('login', 'پەیوەندی بە سێرڤەرەوە نەکرا');
    console.error('Login error:', error);
}
```

}

async function registerWithPHP(email, password) {
try {
showAuthError(‘register’, ‘دروستکردنی هەژمار…’);

```
    const response = await fetch('api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
        showAuthError('register', 'هەژمارەکەت بە سەرکەوتوویی دروست کرا!');
        setTimeout(() => showAuthForm('login'), 2000);
    } else {
        showAuthError('register', data.message || 'هەڵەیەک ڕوویدا');
    }
} catch (error) {
    showAuthError('register', 'پەیوەندی بە سێرڤەرەوە نەکرا');
    console.error('Register error:', error);
}
```

}

// ========================
// 9. USER UI UPDATE
// ========================
function updateUserUI(user) {
const loginLink = document.getElementById(‘loginNavLink’);
const userChip = document.getElementById(‘userChip’);
const userEmail = document.getElementById(‘userEmail’);
const userAvatar = document.getElementById(‘userAvatar’);
const logoutBtn = document.getElementById(‘logoutBtn’);

```
if (loginLink) loginLink.style.display = 'none';
if (userChip) userChip.style.display = 'inline-flex';
if (userEmail) userEmail.textContent = user.email;
if (userAvatar) userAvatar.src = user.avatar || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + user.email;

if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
}
```

}

function handleLogout() {
localStorage.removeItem(‘user’);

```
const loginLink = document.getElementById('loginNavLink');
const userChip = document.getElementById('userChip');

if (loginLink) loginLink.style.display = 'flex';
if (userChip) userChip.style.display = 'none';
```

}

// ========================
// 10. SCROLL ANIMATIONS
// ========================
function initScrollAnimations() {
const elements = document.querySelectorAll(’.scroll-animate, .scroll-animate-left, .scroll-animate-right’);

```
if (elements.length === 0) {
    console.log('⚠️ No scroll-animate elements found');
    return;
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

elements.forEach(el => observer.observe(el));
console.log(`✅ Observing ${elements.length} elements for scroll animations`);
```

}

// ========================
// 11. SMOOTH SCROLL
// ========================
function initSmoothScroll() {
document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, function (e) {
const href = this.getAttribute(‘href’);
if (href === ‘#’ || href === ‘#login’) return;

```
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
```

}

// ========================
// 12. BUTTON RIPPLE EFFECT
// ========================
function initRippleEffect() {
const createRipple = (event) => {
const button = event.currentTarget;
const ripple = document.createElement(‘span’);

```
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    const oldRipple = button.querySelector('.ripple');
    if (oldRipple) oldRipple.remove();
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
};

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
```

}

// ========================
// 13. CARD ANIMATIONS
// ========================
function initCardAnimations() {
const appCards = document.querySelectorAll(’.app-card’);
const featureCards = document.querySelectorAll(’.feature-card’);

```
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

[...appCards, ...featureCards].forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});
```

}

// ========================
// 14. CARD 3D TILT EFFECT
// ========================
function initCardTiltEffect() {
document.querySelectorAll(’.app-card, .feature-card’).forEach(card => {
card.addEventListener(‘mousemove’, (e) => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

```
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
```

}

// ========================
// 15. PARALLAX HERO EFFECT
// ========================
function initParallaxEffect() {
const heroContent = document.querySelector(’.hero-content’);
const hero3d = document.querySelector(’.hero-3d’);
const heroSection = document.querySelector(’.hero’);

```
if (!heroSection) return;

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (scrolled < heroSection.offsetHeight) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroSection.offsetHeight);
        }
        if (hero3d) {
            hero3d.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});
```

}

// ========================
// 16. PRIVACY TOGGLE
// ========================
function initPrivacyToggle() {
const privacyToggle = document.getElementById(‘privacyToggle’);
const privacySection = document.querySelector(’.privacy-section’);

```
if (privacyToggle && privacySection) {
    privacyToggle.addEventListener('click', function() {
        if (privacySection.style.display === 'none' || !privacySection.style.display) {
            privacySection.style.display = 'block';
            privacySection.scrollIntoView({ behavior: 'smooth' });
        } else {
            privacySection.style.display = 'none';
        }
    });
}
```

}

// ========================
// 17. MAIN INITIALIZATION
// ========================
function initializeApp() {
console.log(‘🎯 Initializing ZHIWAR App…’);

```
// Initialize Theme Manager
new ThemeManager();

// Setup Login Modal
setupLoginModal();

// Initialize animations
initScrollAnimations();
initSmoothScroll();
initRippleEffect();
initCardAnimations();
initCardTiltEffect();
initParallaxEffect();
initPrivacyToggle();

console.log('✅ App initialized successfully!');
```

}

// ========================
// 18. DOM READY
// ========================
if (document.readyState === ‘loading’) {
document.addEventListener(‘DOMContentLoaded’, initializeApp);
} else {
initializeApp();
}

// ========================
// 19. EXPOSE TO WINDOW
// ========================
window.AppManager = {
showComingSoon,
startDownloadWithAds,
openLoginModal,
closeLoginModal
};

// ========================
// 20. CONSOLE EASTER EGG
// ========================
console.log(’%c🎮 ZHIWAR Apps ‘, ‘color: #38bdf8; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);’);
console.log(’%cMade with ❤️ by ZHIWAR’, ‘color: #0ea5e9; font-size: 14px;’);
console.log(’%c💎 Website Enhanced with Modern Animations’, ‘color: #a855f7; font-size: 12px;’);

console.log(‘✅ All systems operational!’);
