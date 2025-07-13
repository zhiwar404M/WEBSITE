// == Adsterra Ad Manager ==
// جۆرە ڕیکلامەکان: Popunder (زیادترین قازانج), SocialBar, DirectLink

// 1. ڕێکخستنی ڕیکلامەکان بەپێی قازانج
const adsterraAds = {
    popunder: {
        script: '//oblivionplaysaltered.com/ca/7d/e7/ca7de7addc12c0c856275b95aeddab87',
        priority: 1, // زیادترین قازانج
        minClicks: 3 // پێویستی بە کلیک نیە (خۆکار)
    },
    socialbar: {
        script: '//oblivionplaysaltered.com/50/c1/0a/50c10a5810034923515743695968da04',
        priority: 2,
        minClicks: 0 // پێویستی بە کلیک هەیە
    },
    directlink: {
        script: 'https://oblivionplaysaltered.com/a3gtt34y9g?key=71b91dd8d81442ad90006313d784b31d',
        priority: 3,
        minClicks: 0 // پێویستی بە کلیک هەیە
    }
};

// 2. فەرمانی بارکردنی ڕیکلام
function loadAdsterraAd(type) {
    if (!adsterraAds[type]) return;
    
    const script = document.createElement('script');
    script.src = 'https:' + adsterraAds[type].script;
    script.async = true;
    document.body.appendChild(script);
    
    console.log(`Adsterra ${type} loaded`);
}

// 3. هەڵبژاردنی باشترین ڕیکلام بەپێی قازانج
function loadBestAd() {
    // ڕیزکردن بەپێی پێوەری قازانج
    const bestAd = Object.entries(adsterraAds)
        .sort((a, b) => a[1].priority - b[1].priority)[0];
    
    loadAdsterraAd(bestAd[0]);
}

// لە فایلی ads.js
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('pre-access-overlay');
    if (!overlay) return;

    // پشکنینی ئەدبڵۆک
    const testAd = document.createElement('div');
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    setTimeout(() => {
        if (testAd.offsetHeight === 0) {
            alert('تکایە ئەدبڵۆک ناچالاک بکە');
            return;
        }
        testAd.remove();
    }, 1000);

    // پشکنینی 12 کاتژمێر
    const lastAd = localStorage.getItem('lastAdTime');
    const now = Date.now();
    
    if (!lastAd || (now - lastAd) > 43200000) { // 12 کاتژمێر
        overlay.style.display = 'flex';
        
        // کۆدی Adsterra
        const script = document.createElement('script');
        script.src = 'https://oblivionplaysaltered.com/cc6r5tjm39?key=e41025d5f4aaac4dc160a8598cffd3f9';
        document.body.appendChild(script);

        // کاتژمێر
        let seconds = 30;
        const timer = setInterval(() => {
            seconds--;
            document.getElementById('countdown').textContent = seconds;
            if (seconds <= 0) {
                clearInterval(timer);
                overlay.style.display = 'none';
                localStorage.setItem('lastAdTime', now);
            }
        }, 1000);
    }
});

// 5. داگرتن + ڕیکلام (بۆ دوگمەکان)
function setupDownloadAds() {
    document.querySelectorAll('[data-download-with-ads]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-download-url');
            
            // بارکردنی Popunder (زیادترین قازانج)
            loadAdsterraAd('popunder');
            
            // داگرتن دوای 10 چرکە
            setTimeout(() => window.open(url, '_blank'), 10000);
        });
    });
}

// 6. فەرمانی سەرەکی
document.addEventListener('DOMContentLoaded', function() {
    setupPreAccessAd();
    setupDownloadAds();
    
    // بارکردنی SocialBar لە خوارەوەی پەڕە
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            loadAdsterraAd('socialbar');
            window.removeEventListener('scroll', this);
        }
    });
});