// ===============================================
// app.js - ZHIWAR Website [ENHANCED WITH AD GATING]
// ===============================================

console.log('🚀 ZHIWAR App.js loaded successfully!');

// ═══════════════════════════════════════════════════
// AD GATING CONFIGURATION
// (Keep this at the top of app.js — unchanged values
//  are fine; only COUNTDOWN_DURATION was adjusted to 15)
// ═══════════════════════════════════════════════════

const AD_GATING_CONFIG = {
  REAPPEAR_DURATION: 24,          // hours before ad shows again
  COUNTDOWN_DURATION: 15,         // seconds
  STORAGE_KEY: 'zhiwar_ad_gating_timestamp',
  ENABLED: true
};

// ═══════════════════════════════════════════════════
// AD GATING SYSTEM — PREMIUM UPGRADE
//
// DROP-IN REPLACEMENT: find the existing AdGatingSystem
// class in app.js and replace it entirely with this one.
// The public API (constructor, attachSkipButtonListener)
// is identical — nothing else in app.js needs changing.
// ═══════════════════════════════════════════════════

class AdGatingSystem {
  constructor(config) {
    this.config  = config;
    this.overlay = document.getElementById('adGatingOverlay');

    // Timer elements
    this.countdownEl  = document.getElementById('countdownTimer');
    this.progressFill = document.getElementById('agProgressFill');
    this.progressGlow = document.getElementById('agProgressGlow');
    this.waitMsg      = document.getElementById('agWaitMsg');
    this.lockIcon     = document.getElementById('agLockIcon');
    this.labelText    = document.getElementById('agTimerLabelText');

    // Video elements
    this.videoLoading = document.getElementById('agVideoLoading');
    this.adIframe     = document.getElementById('agAdIframe');

    // Skip / enter button
    this.skipBtn = document.getElementById('adGatingSkipBtn');

    // Internal state
    this._countdownValue    = config.COUNTDOWN_DURATION;
    this._countdownInterval = null;
    this._videoStarted      = false;  // ← KEY: countdown only starts after video fires

    if (this.overlay) this._init();
  }

  // ── Bootstrap ─────────────────────────────────────

  _init() {
    if (!this.config.ENABLED) { this._hideOverlay(); return; }

    const shouldShow = this._shouldShowAd(this._getLastAdTime());

    if (shouldShow) {
      this._showOverlay();
      this._attachVideoStartDetection();
    } else {
      this._hideOverlay();
    }
  }

  // ── Video-start detection ──────────────────────────
  // We trigger the countdown ONLY when the ad video
  // actually begins playing — NOT on page load.
  //
  // Three detection paths (in priority order):
  //   1. window.agNotifyVideoStart() — your ad SDK calls
  //      this via its own callback / postMessage hook.
  //   2. iframe 'load' event — reliable fallback when the
  //      iframe src responds (catches most ad networks).
  //   3. postMessage from ad iframe (e.g. VAST/VPAID events).

  _attachVideoStartDetection() {
    // Expose a global hook your ad SDK can call directly
    window.agNotifyVideoStart = () => this._onVideoStarted();

    // Path 2 — iframe load event
    if (this.adIframe) {
      this.adIframe.addEventListener('load', () => {
        // Reveal the iframe, hide the spinner
        this.adIframe.style.display = 'block';
        if (this.videoLoading) this.videoLoading.classList.add('hidden');
        // Give the ad network 800ms to autoplay before we start the clock
        setTimeout(() => this._onVideoStarted(), 800);
      });
    }

    // Path 3 — postMessage from iframe (VAST / ad SDK signals)
    window.addEventListener('message', (e) => {
      if (this._videoStarted) return;
      const d = e.data;
      if (!d) return;
      const sig = typeof d === 'string' ? d : (d.event || d.type || '');
      const videoEvents = ['AdVideoStart', 'adStart', 'videoStart', 'ad_impression', 'play'];
      if (videoEvents.some(ev => sig.includes(ev))) {
        this._onVideoStarted();
      }
    });

    // Safety net — if the video hasn't fired within 10 s
    // (ad blocked, slow connection, etc.) we start anyway
    // so the user isn't locked out forever.
    this._safetyTimer = setTimeout(() => {
      if (!this._videoStarted) {
        console.warn('⚠️ Ad Gating: video-start not detected after 10 s — starting countdown anyway.');
        if (this.videoLoading) this.videoLoading.classList.add('hidden');
        if (this.adIframe) this.adIframe.style.display = 'block';
        this._onVideoStarted();
      }
    }, 10000);
  }

  _onVideoStarted() {
    if (this._videoStarted) return;  // idempotent
    this._videoStarted = true;
    clearTimeout(this._safetyTimer);

    // Hide wait message, update label
    if (this.waitMsg) this.waitMsg.classList.add('hidden');
    if (this.lockIcon) this.lockIcon.textContent = '🔒';
    if (this.labelText) this.labelText.textContent = 'ئەم پەڕەیە دەبێتە دەستپێڕس لە:';

    this._startCountdown();
  }

  // ── Countdown ──────────────────────────────────────

  _startCountdown() {
    this._countdownValue = this.config.COUNTDOWN_DURATION;
    this._renderCountdown();
    this._renderProgress(1);          // start at 100%

    this._countdownInterval = setInterval(() => {
      this._countdownValue--;
      this._renderCountdown();
      this._renderProgress(this._countdownValue / this.config.COUNTDOWN_DURATION);

      if (this._countdownValue <= 0) {
        this._endCountdown();
      }
    }, 1000);
  }

  _renderCountdown() {
    if (!this.countdownEl) return;
    const val = Math.max(0, this._countdownValue);
    this.countdownEl.textContent = val;

    // Tick flash animation (restart by removing + re-adding class)
    this.countdownEl.classList.remove('tick');
    void this.countdownEl.offsetWidth; // reflow trick
    this.countdownEl.classList.add('tick');
  }

  _renderProgress(ratio) {
    const pct = Math.max(0, Math.min(1, ratio)) * 100;
    if (this.progressFill) {
      this.progressFill.style.transform = `scaleX(${ratio})`;
      this.progressFill.style.transformOrigin = 'left';
    }
    if (this.progressGlow) {
      this.progressGlow.style.left = `calc(${pct}% - 6px)`;
    }
  }

  _endCountdown() {
    clearInterval(this._countdownInterval);
    this._renderProgress(0);

    // Reveal the premium enter button
    if (this.skipBtn) {
      this.skipBtn.style.display = 'flex';
      // Tiny stagger so the button fades in smoothly
      this.skipBtn.style.opacity = '0';
      this.skipBtn.style.transition = 'opacity .4s ease, transform .4s cubic-bezier(.34,1.56,.64,1)';
      this.skipBtn.style.transform  = 'translateY(8px)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.skipBtn.style.opacity   = '1';
          this.skipBtn.style.transform = 'translateY(0)';
        });
      });
    }

    // Update lock icon to unlocked
    if (this.lockIcon) this.lockIcon.textContent = '🔓';
    if (this.labelText) this.labelText.textContent = 'دەستپێگەیشتن ئازاد بوو';

    // Auto-dismiss after 4 s if user doesn't tap
    setTimeout(() => {
      if (this.overlay && !this.overlay.classList.contains('hidden')) {
        this._hideOverlay();
      }
    }, 4000);
  }

  // ── Overlay show / hide ────────────────────────────

  _showOverlay() {
    if (this.overlay) {
      this.overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';   // lock scroll
    }
  }

  _hideOverlay() {
    if (this.overlay) {
      this.overlay.classList.add('hidden');
      this._recordAdView();
      document.body.style.overflow = '';         // restore scroll

      setTimeout(() => {
        if (this.overlay) this.overlay.style.display = 'none';
      }, 700);
    }
  }

  // ── Public API (unchanged signature) ──────────────

  attachSkipButtonListener() {
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', () => {
        // Only allow click if countdown has actually finished
        if (this._countdownValue <= 0) {
          this._hideOverlay();
        }
      });
    }
  }

  // ── Helpers ────────────────────────────────────────

  _shouldShowAd(lastAdTime) {
    if (!lastAdTime) return true;
    const hoursElapsed = (Date.now() - lastAdTime) / 3_600_000;
    return hoursElapsed >= this.config.REAPPEAR_DURATION;
  }

  _getLastAdTime() {
    const ts = localStorage.getItem(this.config.STORAGE_KEY);
    return ts ? parseInt(ts, 10) : null;
  }

  _recordAdView() {
    localStorage.setItem(this.config.STORAGE_KEY, Date.now().toString());
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
