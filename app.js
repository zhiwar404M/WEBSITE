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


// ===============================================
// Loading Screen Handler - زیادی بکە بۆ app.js
// ===============================================

console.log('🚀 App.js loaded');

// ========================
// 1. LOADING SCREEN - Simple & Working
// ========================
function hideLoadingScreen() {
    console.log('⏳ Attempting to hide loading screen...');
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        console.log('✅ Loading screen found!');
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('✅ Loading screen hidden!');
        }, 500);
    } else {
        console.error('❌ Loading screen element not found!');
    }
}

// Try multiple methods to hide loading
// Method 1: After 1.5 seconds
setTimeout(hideLoadingScreen, 1500);

// Method 2: On window load
window.addEventListener('load', function() {
    console.log('✅ Window loaded');
    setTimeout(hideLoadingScreen, 500);
});

// Method 3: On DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ DOM ready');
        setTimeout(hideLoadingScreen, 500);
    });
} else {
    // DOM already loaded
    setTimeout(hideLoadingScreen, 500);
}

// Emergency: Force hide after 3 seconds
setTimeout(function() {
    const ls = document.getElementById('loading-screen');
    if (ls && ls.style.display !== 'none') {
        console.log('⚠️ Emergency: Forcing hide!');
        ls.classList.add('hidden');
        setTimeout(() => ls.style.display = 'none', 500);
    }
}, 3000);

// ========================
// 2. SCROLL ANIMATIONS
// ========================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
    
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
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// ========================
// 3. SMOOTH SCROLL
// ========================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#login') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ========================
// Rest of your app.js code...
// ========================

console.log('✅ All loading handlers initialized!');

// ========================
// 5. BUTTON RIPPLE EFFECT
// ========================
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

// Remove old ripples
const oldRipple = button.querySelector('.ripple');
if (oldRipple) {
    oldRipple.remove();
}

button.appendChild(ripple);

// Remove ripple after animation
setTimeout(() => {
    ripple.remove();
}, 600);
```

};

// Add ripple to all buttons
document.querySelectorAll(’.btn’).forEach(button => {
button.addEventListener(‘click’, createRipple);
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement(‘style’);
rippleStyle.textContent = `
.ripple {
position: absolute;
border-radius: 50%;
background: rgba(255, 255, 255, 0.6);
transform: scale(0);
animation: ripple-animation 0.6s ease-out;
pointer-events: none;
}

```
@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
```

`;
document.head.appendChild(rippleStyle);

// ========================
// 6. PARALLAX EFFECT FOR HERO
// ========================
const heroContent = document.querySelector(’.hero-content’);
const hero3d = document.querySelector(’.hero-3d’);

window.addEventListener(‘scroll’, () => {
const scrolled = window.pageYOffset;
const heroSection = document.querySelector(’.hero’);

```
if (heroSection && scrolled < heroSection.offsetHeight) {
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroSection.offsetHeight);
    }
    if (hero3d) {
        hero3d.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}
```

});

// ========================
// 7. CARD STAGGER ANIMATION
// ========================
const observeCards = () => {
const appCards = document.querySelectorAll(’.app-card’);
const featureCards = document.querySelectorAll(’.feature-card’);

```
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger delay
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Initially hide cards
[...appCards, ...featureCards].forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});
```

};

// Initialize card animations
if (document.readyState === ‘loading’) {
document.addEventListener(‘DOMContentLoaded’, observeCards);
} else {
observeCards();
}

// ========================
// 8. MOUSE FOLLOW EFFECT FOR CARDS
// ========================
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
```

});

// ========================
// 9. TYPING EFFECT FOR HERO TITLE (Optional)
// ========================
const typeWriter = (element, text, speed = 100) => {
let i = 0;
element.textContent = ‘’;

```
const type = () => {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
    }
};

type();
```

};

// Uncomment to enable typing effect
// const heroTitle = document.querySelector(’.hero-content h1’);
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     window.addEventListener(‘load’, () => {
//         typeWriter(heroTitle, originalText, 80);
//     });
// }

// ========================
// 10. INTERSECTION OBSERVER FOR COUNTERS (if you add stats)
// ========================
const animateCounters = () => {
const counters = document.querySelectorAll(’[data-count]’);

```
counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(counter);
});
```

};

// Initialize if counters exist
if (document.querySelector(’[data-count]’)) {
animateCounters();
}

// ========================
// 11. MODAL ANIMATIONS
// ========================
const modalOverlay = document.getElementById(‘loginModalOverlay’);
const modalCard = document.querySelector(’.modal-card’);

if (modalOverlay) {
// When modal opens
const originalOpenModal = window._openLoginModal;
window._openLoginModal = function() {
if (originalOpenModal) originalOpenModal();
modalOverlay.style.animation = ‘fadeIn 0.3s ease’;
if (modalCard) {
modalCard.style.animation = ‘slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)’;
}
};

```
// When modal closes
const originalCloseModal = window._closeLoginModal;
window._closeLoginModal = function() {
    modalOverlay.style.animation = 'fadeOut 0.3s ease';
    if (modalCard) {
        modalCard.style.animation = 'slideDown 0.3s ease';
    }
    setTimeout(() => {
        if (originalCloseModal) originalCloseModal();
    }, 300);
};
```

}

// Add modal animation styles
const modalAnimStyle = document.createElement(‘style’);
modalAnimStyle.textContent = `
@keyframes fadeOut {
from { opacity: 1; }
to { opacity: 0; }
}

```
@keyframes slideDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(50px); opacity: 0; }
}
```

`;
document.head.appendChild(modalAnimStyle);

// ========================
// 12. CONSOLE MESSAGE (Fun easter egg)
// ========================
console.log(’%c🎮 ZHIWAR Apps ‘, ‘color: #38bdf8; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);’);
console.log(’%cMade with ❤️ by ZHIWAR’, ‘color: #0ea5e9; font-size: 14px;’);
console.log(’%c💎 Website Enhanced with Modern Animations’, ‘color: #a855f7; font-size: 12px;’);

// ========================
// 13. PERFORMANCE OPTIMIZATION
// ========================
// Debounce scroll events
let scrollTimeout;
const debounce = (func, wait) => {
return function executedFunction(…args) {
const later = () => {
clearTimeout(scrollTimeout);
func(…args);
};
clearTimeout(scrollTimeout);
scrollTimeout = setTimeout(later, wait);
};
};

// Apply debounce to scroll handlers if needed
// window.addEventListener(‘scroll’, debounce(yourScrollFunction, 10));

console.log(‘✅ All animations loaded successfully!’);
