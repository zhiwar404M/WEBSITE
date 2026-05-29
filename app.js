// ===============================================
// app.js - ZHIWAR Website [ENHANCED WITH AD GATING]
// ===============================================

console.log('🚀 ZHIWAR App.js loaded successfully!');

// ═══════════════════════════════════════════════════
// AD GATING CONFIGURATION
// ═══════════════════════════════════════════════════

const AD_GATING_CONFIG = {
  // Duration in hours - Change this to adjust how long users can access before seeing the ad again
  REAPPEAR_DURATION: 24, // 24 hours (set to 12 for 12 hours)
  
  // Initial countdown timer in seconds
  COUNTDOWN_DURATION: 15,
  
  // localStorage key for tracking ad status
  STORAGE_KEY: 'zhiwar_ad_gating_timestamp',
  
  // Enable/disable ad gating entirely
  ENABLED: true
};

// ═══════════════════════════════════════════════════
// AD GATING SYSTEM
// ═══════════════════════════════════════════════════

class AdGatingSystem {
  constructor(config) {
    this.config = config;
    this.overlay = document.getElementById('adGatingOverlay');
    this.countdownTimer = document.getElementById('countdownTimer');
    this.skipBtn = document.getElementById('adGatingSkipBtn');
    this.countdownInterval = null;
    this.countdownValue = config.COUNTDOWN_DURATION;
    
    if (this.overlay) {
      this.init();
    }
  }

  init() {
    console.log('⏳ Initializing Ad Gating System...');
    
    if (!this.config.ENABLED) {
      console.log('✅ Ad Gating is disabled');
      this.hideOverlay();
      return;
    }

    const lastAdTime = this.getLastAdTime();
    const shouldShowAd = this.shouldShowAd(lastAdTime);

    if (shouldShowAd) {
      console.log('📺 Showing ad interstitial');
      this.showOverlay();
      this.startCountdown();
    } else {
      console.log('✅ User recently viewed ad, skipping');
      this.hideOverlay();
    }
  }

  shouldShowAd(lastAdTime) {
    // If no previous ad timestamp, show ad
    if (!lastAdTime) {
      return true;
    }

    // Calculate time difference in hours
    const now = Date.now();
    const timeDiffHours = (now - lastAdTime) / (1000 * 60 * 60);

    // Show ad if configured duration has passed
    return timeDiffHours >= this.config.REAPPEAR_DURATION;
  }

  getLastAdTime() {
    const timestamp = localStorage.getItem(this.config.STORAGE_KEY);
    return timestamp ? parseInt(timestamp, 10) : null;
  }

  recordAdView() {
    const now = Date.now();
    localStorage.setItem(this.config.STORAGE_KEY, now.toString());
    console.log('✅ Ad view recorded. Next ad will appear in', this.config.REAPPEAR_DURATION, 'hours');
  }

  startCountdown() {
    if (!this.countdownTimer) return;

    this.countdownValue = this.config.COUNTDOWN_DURATION;
    this.updateCountdownDisplay();

    this.countdownInterval = setInterval(() => {
      this.countdownValue--;
      this.updateCountdownDisplay();

      if (this.countdownValue <= 0) {
        this.endCountdown();
      }
    }, 1000);
  }

  updateCountdownDisplay() {
    if (this.countdownTimer) {
      this.countdownTimer.textContent = Math.max(0, this.countdownValue);
    }
  }

  endCountdown() {
    clearInterval(this.countdownInterval);
    
    // Show skip button
    if (this.skipBtn) {
      this.skipBtn.style.display = 'flex';
    }

    // Auto-close after 3 seconds if no interaction
    setTimeout(() => {
      if (this.overlay && this.overlay.style.display !== 'none') {
        this.hideOverlay();
      }
    }, 3000);
  }

  showOverlay() {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
    }
  }

  hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.add('hidden');
      // Record that user has seen the ad
      this.recordAdView();
      
      // Hide after transition
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.style.display = 'none';
        }
      }, 600);
    }
  }

  attachSkipButtonListener() {
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', () => {
        console.log('👋 User skipped ad');
        this.hideOverlay();
      });
    }
  }
}

// ═══════════════════════════════════════════════════
// LOADING SCREEN HANDLER
// ═══════════════════════════════════════════════════

function hideLoadingScreen() {
  console.log('⏳ Hiding loading screen…');
  const loadingScreen = document.getElementById('loading-screen');

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
}

// Multiple methods to ensure loading screen hides
setTimeout(hideLoadingScreen, 1500);

window.addEventListener('load', function() {
  console.log('✅ Window fully loaded');
  setTimeout(hideLoadingScreen, 500);
});

// Emergency fallback
setTimeout(function() {
  const ls = document.getElementById('loading-screen');
  if (ls && ls.style.display !== 'none') {
    console.log('⚠️ Emergency: Force hiding loading screen');
    ls.classList.add('hidden');
    setTimeout(() => ls.style.display = 'none', 500);
  }
}, 3000);

// ═══════════════════════════════════════════════════
// COMING SOON NOTIFICATION
// ═══════════════════════════════════════════════════

window.AppManager = {
  showComingSoon: function() {
    const currentLang = document.documentElement.lang || 'ku';
    const messages = {
      "ku": "🚀 ئەم بەرنامەیە بەم زووانە دێت! بەشداربە بۆ وەرگرتنی ئاگادارکردنەوە.",
      "ar": "🚀 هذا التطبيق قادم قريباً! اشترك لتلقي الإشعار.",
      "en": "🚀 This app is coming soon! Subscribe to get notified."
    };

    alert(messages[currentLang] || messages['en']);
  }
};

// ═══════════════════════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════════════════════

class ScrollAnimationManager {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
  }

  init() {
    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach(el => {
      this.observer.observe(el);
    });
  }
}

// ═══════════════════════════════════════════════════
// LANGUAGE SWITCHER
// ═══════════════════════════════════════════════════

class LanguageSwitcher {
  constructor() {
    this.langButtons = document.querySelectorAll('.lang-btn');
    this.currentLang = document.documentElement.lang || 'ku';
    this.init();
  }

  init() {
    this.langButtons.forEach(btn => {
      if (btn.dataset.lang === this.currentLang) {
        btn.classList.add('active');
      }
      
      btn.addEventListener('click', () => {
        this.switchLanguage(btn.dataset.lang);
      });
    });
  }

  switchLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Update active button
    this.langButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      }
    });

    // Reload page to apply language changes (optional)
    // location.reload();
  }
}

// ═══════════════════════════════════════════════════
// MODAL MANAGEMENT
// ═══════════════════════════════════════════════════

class ModalManager {
  constructor() {
    this.loginModal = document.getElementById('loginModalOverlay');
    this.loginClose = document.getElementById('loginModalClose');
    this.tabSignIn = document.getElementById('tabSignIn');
    this.tabRegister = document.getElementById('tabRegister');
    this.loginForm = document.getElementById('loginForm');
    this.registerForm = document.getElementById('registerForm');
    
    if (this.loginModal) {
      this.init();
    }
  }

  init() {
    // Close button
    if (this.loginClose) {
      this.loginClose.addEventListener('click', () => this.closeModal());
    }

    // Overlay click to close
    if (this.loginModal) {
      this.loginModal.addEventListener('click', (e) => {
        if (e.target === this.loginModal) {
          this.closeModal();
        }
      });
    }

    // Tab switching
    if (this.tabSignIn) {
      this.tabSignIn.addEventListener('click', () => this.switchTab('signin'));
    }
    if (this.tabRegister) {
      this.tabRegister.addEventListener('click', () => this.switchTab('register'));
    }

    // Form submissions
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
    if (this.registerForm) {
      this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }
  }

  closeModal() {
    if (this.loginModal) {
      this.loginModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  switchTab(tab) {
    if (tab === 'signin') {
      if (this.loginForm) this.loginForm.style.display = 'block';
      if (this.registerForm) this.registerForm.style.display = 'none';
      if (this.tabSignIn) this.tabSignIn.classList.add('active');
      if (this.tabRegister) this.tabRegister.classList.remove('active');
    } else {
      if (this.loginForm) this.loginForm.style.display = 'none';
      if (this.registerForm) this.registerForm.style.display = 'block';
      if (this.tabSignIn) this.tabSignIn.classList.remove('active');
      if (this.tabRegister) this.tabRegister.classList.add('active');
    }
  }

  handleLogin(e) {
    e.preventDefault();
    console.log('👤 Login form submitted');
    // Add your login logic here
  }

  handleRegister(e) {
    e.preventDefault();
    console.log('✍️ Register form submitted');
    // Add your registration logic here
  }
}

// ═══════════════════════════════════════════════════
// PRIVACY POLICY TOGGLE
// ═══════════════════════════════════════════════════

class PrivacyManager {
  constructor() {
    this.privacyToggle = document.getElementById('privacyToggle');
    this.privacySection = document.querySelector('.privacy-section');
    
    if (this.privacyToggle) {
      this.init();
    }
  }

  init() {
    this.privacyToggle.addEventListener('click', () => this.togglePrivacy());
  }

  togglePrivacy() {
    if (this.privacySection) {
      const isVisible = this.privacySection.style.display !== 'none';
      this.privacySection.style.display = isVisible ? 'none' : 'block';
      
      if (!isVisible) {
        // Scroll to privacy section
        this.privacySection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}

// ═══════════════════════════════════════════════════
// THEME MANAGER
// ═══════════════════════════════════════════════════

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    if (this.themeToggle) {
      this.init();
    }
  }

  init() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon(theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  updateThemeIcon(theme) {
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector('.material-icons-round');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    }
  }
}

// ═══════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ═══════════════════════════════════════════════════
// INITIALIZE ALL ON DOM READY
// ═══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  console.log('📄 DOM Content Loaded');

  // Initialize Ad Gating System
  const adGating = new AdGatingSystem(AD_GATING_CONFIG);
  adGating.attachSkipButtonListener();

  // Initialize other managers
  const scrollAnimations = new ScrollAnimationManager();
  scrollAnimations.init();

  const languageSwitcher = new LanguageSwitcher();
  const modalManager = new ModalManager();
  const privacyManager = new PrivacyManager();
  const themeManager = new ThemeManager();

  initSmoothScroll();

  console.log('✅ All systems initialized!');
});

// ═══════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════

document.addEventListener('keydown', (e) => {
  // ESC to close login modal
  if (e.key === 'Escape') {
    const loginModal = document.getElementById('loginModalOverlay');
    if (loginModal && loginModal.style.display === 'flex') {
      loginModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
});

// ═══════════════════════════════════════════════════
// PERFORMANCE MONITORING
// ═══════════════════════════════════════════════════

window.addEventListener('load', () => {
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('⚡ Page Load Time:', pageLoadTime, 'ms');
  }
});
