// == Adsterra Ad Manager ==
// جۆرە ڕیکلامەکان: Popunder (زیادترین قازانج), SocialBar, DirectLink

// 1. ڕێکخستنی ڕیکلامەکان بەپێی قازانج
const adsterraAds = {
    popunder: {
        script: '//oblivionplaysaltered.com/pu/50c10a5810034923515743695968da04',
        priority: 1, // زیادترین قازانج
        minClicks: 3 // پێویستی بە کلیک نیە (خۆکار)
    },
    socialbar: {
        script: '//oblivionplaysaltered.com/sb/ca7de7addc12c0c856275b95aeddab87',
        priority: 2,
        minClicks: 0 // پێویستی بە کلیک هەیە
    },
    directlink: {
        script: '//oblivionplaysaltered.com/dl/e41025d5f4aaac4dc160a8598cffd3f9',
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

// 4. ڕێکخستنی ڕیکلامی پێش چوونە ژوورەوە (12 کاتژمێر جارێک)
function setupPreAccessAd() {
    const overlay = document.getElementById('pre-access-overlay');
    if (!overlay) return;

    const lastWatched = localStorage.getItem('lastAdWatched');
    const now = Date.now();

    if (!lastWatched || (now - lastWatched) >= 12 * 60 * 60 * 1000) {
        overlay.style.display = 'flex';
        loadBestAd(); // باشترین ڕیکلام بار دەکات
        
        let seconds = 30;
        const timer = setInterval(() => {
            seconds--;
            document.getElementById('timer').textContent = seconds;
            document.getElementById('progress').style.width = `${100 - (seconds/30)*100}%`;
            
            if (seconds <= 0) {
                clearInterval(timer);
                overlay.style.display = 'none';
                localStorage.setItem('lastAdWatched', now.toString());
            }
        }, 1000);
    }
}

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