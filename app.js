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

// ===============================================
// maintenance.js - ZHIWAR Website (CSS جیاکراوەتەوە)
// ئەم فایلە بگۆڕە بۆ چالاک/ناچالاک کردنی Maintenance
// پێویستە maintenance.css زیاد بکەیت بە index.html
// ===============================================

const MAINTENANCE_CONFIG = {

// ==============================================
//  TRUE  بکە = بینەران پەیجی چاکردن دەبینن
//  FALSE بکە = وێبسایت بە ئاساییەوەیە
// ==============================================
enabled: true,

// پەیامی سەرەکی
message: "وێبسایتەکەمان ئێستا لە چاکردندایە",
submessage: "داهاتوو دەگەڕێینەوە بە شێوازێکی باشتر و تازەتر. سوپاسی بردباریت دەکەین",

// کاتژمێری مانەوە
countdown: {
    enabled: true,
    targetDate: "2025-12-31T23:59:59" // <-- بگۆڕە بۆ کاتی چاکردن
},

// زانیاری پەیوەندی
contact: {
    email: "zhiwarup@gmail.com",
    youtube: "https://youtube.com/@zhiwarxyt",
    facebook: "#",
    snapchat: "https://snapchat.com/t/HktxQxsY"
}


};

// ================================================
// سیستەمی ئۆتۆماتیکی - دەستکاری مەکە
// ================================================
(function () {
if (!MAINTENANCE_CONFIG.enabled) return;
if (document.readyState === ‘loading’) {
document.addEventListener(‘DOMContentLoaded’, showMaintenancePage);
} else {
showMaintenancePage();
}
})();

function showMaintenancePage() {
document.body.style.overflow = ‘hidden’;


// CSS زیاد بکە
const style = document.createElement('style');
style.textContent = `
    #mnt-overlay {
        position: fixed; inset: 0; z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        background: #020617; overflow: hidden;
        font-family: 'Noto Sans Arabic', sans-serif; direction: rtl;
    }
    .mnt-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
    .mnt-grid {
        position: absolute; inset: 0;
        background-image:
            linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: gridMove 20s linear infinite;
    }
    @keyframes gridMove { to { transform: translate(50px,50px); } }
    .mnt-orb {
        position: absolute; border-radius: 50%; filter: blur(80px);
        animation: orbFloat 8s ease-in-out infinite;
    }
    .mnt-orb-1 { width:500px; height:500px; background:rgba(56,189,248,0.09); top:-200px; right:-100px; }
    .mnt-orb-2 { width:400px; height:400px; background:rgba(168,85,247,0.07); bottom:-150px; left:-100px; animation-delay:-3s; }
    .mnt-orb-3 { width:300px; height:300px; background:rgba(14,165,233,0.07); top:40%; left:50%; transform:translate(-50%,-50%); animation-delay:-5s; }
    @keyframes orbFloat { 0%,100% { transform:scale(1); } 50% { transform:scale(1.12) translate(15px,-15px); } }
    .mnt-particle {
        position: absolute; border-radius: 50%; background: rgba(56,189,248,0.5);
        animation: particleUp linear infinite;
    }
    @keyframes particleUp {
        0%   { transform: translateY(110vh) rotate(0); opacity: 0; }
        8%   { opacity: 1; }
        92%  { opacity: 1; }
        100% { transform: translateY(-80px) rotate(720deg); opacity: 0; }
    }

    /* ناوەڕۆک */
    .mnt-content {
        position: relative; z-index: 10; text-align: center;
        padding: 2rem; max-width: 700px; width: 100%;
        display: flex; flex-direction: column; align-items: center; gap: 2rem;
    }

    /* ئایکۆن */
    .mnt-icon-wrap { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; }
    .mnt-ring {
        position: absolute; border-radius: 50%; border: 1px solid;
        animation: ringRotate linear infinite;
    }
    .mnt-ring-1 { width:120px; height:120px; border-color:rgba(56,189,248,0.3); animation-duration:12s; }
    .mnt-ring-2 { width:90px;  height:90px;  border-color:rgba(168,85,247,0.25); animation-duration:8s; animation-direction:reverse; }
    .mnt-ring-3 { width:60px;  height:60px;  border-color:rgba(56,189,248,0.2); animation-duration:5s; }
    @keyframes ringRotate { to { transform: rotate(360deg); } }
    .mnt-icon-svg { width: 64px; height: 64px; animation: iconPulse 3s ease-in-out infinite; }
    @keyframes iconPulse {
        0%,100% { filter: drop-shadow(0 0 10px rgba(56,189,248,0.5)); }
        50%      { filter: drop-shadow(0 0 22px rgba(56,189,248,0.9)); }
    }

    /* تیتڵ */
    .mnt-badge {
        display: inline-block;
        background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3);
        color: #38bdf8; padding: 6px 20px; border-radius: 999px; font-size: 0.9rem;
        margin-bottom: 1rem; animation: badgeGlow 2s ease-in-out infinite;
    }
    @keyframes badgeGlow { 50% { box-shadow: 0 0 15px rgba(56,189,248,0.35); } }
    .mnt-title {
        font-size: clamp(1.8rem,5vw,2.8rem); font-weight: 900;
        background: linear-gradient(135deg, #fff 0%, #38bdf8 50%, #a855f7 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text; line-height: 1.3; margin-bottom: 0.75rem;
        animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
    }
    @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    .mnt-sub {
        color: #94a3b8; font-size: clamp(0.95rem,2.5vw,1.1rem); line-height: 1.7;
        max-width: 500px; animation: fadeUp 0.8s 0.15s cubic-bezier(0.16,1,0.3,1) both;
    }

    /* کاتژمێر */
    .mnt-timer-wrap { animation: fadeUp 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
    .mnt-timer-label { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }
    .mnt-timer { display: flex; gap: 0.5rem; align-items: center; justify-content: center; }
    .mnt-time-box {
        background: rgba(255,255,255,0.04); border: 1px solid rgba(56,189,248,0.15);
        border-radius: 12px; padding: 1rem 1.2rem; min-width: 75px;
        transition: all 0.3s;
    }
    .mnt-time-box:hover { background: rgba(56,189,248,0.08); border-color: rgba(56,189,248,0.3); }
    .mnt-num {
        font-size: clamp(1.8rem,4vw,2.5rem); font-weight: 900; color: #38bdf8;
        line-height: 1; font-variant-numeric: tabular-nums;
    }
    .mnt-lbl { color: #64748b; font-size: 0.75rem; margin-top: 0.4rem; }
    .mnt-sep { font-size: 2rem; color: rgba(56,189,248,0.4); font-weight: 900; margin-bottom: 1.2rem; animation: blink 1s ease-in-out infinite; }
    @keyframes blink { 50% { opacity: 0.15; } }

    /* پەیوەندی */
    .mnt-contact-wrap { animation: fadeUp 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both; }
    .mnt-contact-lbl { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }
    .mnt-links { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
    .mnt-link {
        display: inline-flex; align-items: center; gap: 0.5rem;
        padding: 0.6rem 1.2rem; border-radius: 10px; text-decoration: none;
        font-size: 0.9rem; font-weight: 500; transition: all 0.3s; border: 1px solid transparent;
    }
    .mnt-link .material-icons { font-size: 1.1rem; }
    .mnt-link:hover { transform: translateY(-3px); filter: brightness(1.2); box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
    .lk-email { background:rgba(56,189,248,0.1);  color:#38bdf8; border-color:rgba(56,189,248,0.2); }
    .lk-yt    { background:rgba(239,68,68,0.1);   color:#f87171; border-color:rgba(239,68,68,0.2); }
    .lk-fb    { background:rgba(59,130,246,0.1);  color:#60a5fa; border-color:rgba(59,130,246,0.2); }
    .lk-sc    { background:rgba(250,204,21,0.1);  color:#fde68a; border-color:rgba(250,204,21,0.2); }

    /* بارێکی پێشکەوتن */
    .mnt-prog-wrap { width: 100%; max-width: 400px; animation: fadeUp 0.8s 0.5s cubic-bezier(0.16,1,0.3,1) both; }
    .mnt-prog-bar { height: 4px; background: rgba(255,255,255,0.06); border-radius: 999px; position: relative; margin-bottom: 0.75rem; overflow: visible; }
    .mnt-prog-fill { height: 100%; background: linear-gradient(90deg,#38bdf8,#a855f7); border-radius: 999px; animation: progAnim 4s ease-in-out infinite; }
    .mnt-prog-glow { position:absolute; top:-3px; left:0; height:10px; background:linear-gradient(90deg,#38bdf8,#a855f7); border-radius:999px; filter:blur(4px); opacity:0.5; animation:progAnim 4s ease-in-out infinite; }
    @keyframes progAnim { 0%,100% { width:15%; } 50% { width:75%; } }
    .mnt-prog-text { color: #475569; font-size: 0.8rem; }

    /* موبایل */
    @media (max-width: 480px) {
        .mnt-time-box { min-width: 58px; padding: 0.7rem 0.8rem; }
        .mnt-link { padding: 0.5rem 0.9rem; font-size: 0.82rem; }
    }
`;
document.head.appendChild(style);


// پارتیکڵ
const pc = document.getElementById('mntParts');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'mnt-particle';
    const s = 2 + Math.random() * 3;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${8+Math.random()*14}s;animation-delay:-${Math.random()*20}s;opacity:${0.3+Math.random()*0.5}`;
    pc.appendChild(p);
}

// کاتژمێر
if (cfg.countdown.enabled) {
    const target = new Date(cfg.countdown.targetDate).getTime();
    function tick() {
        const d = target - Date.now();
        if (d <= 0) return;
        const pad = n => String(n).padStart(2, '0');
        document.getElementById('mD').textContent = pad(Math.floor(d / 86400000));
        document.getElementById('mH').textContent = pad(Math.floor(d % 86400000 / 3600000));
        document.getElementById('mM').textContent = pad(Math.floor(d % 3600000 / 60000));
        document.getElementById('mS').textContent = pad(Math.floor(d % 60000 / 1000));
    }
    tick();
    setInterval(tick, 1000);
}


}
