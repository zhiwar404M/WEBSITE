// == ئەم فایلە چارەسەری ڕیکلامەکانی وێبسایتەکەت دەکات ==

// 1. ڕیکلامی پێش چوونە ژوورەوە (12 کاتژمێر جارێک)
function setupPreAccessAd() {
    const overlay = document.getElementById('pre-access-overlay');
    const timerEl = document.getElementById('timer');
    const progressBar = document.getElementById('progress');
    
    // پشکنین بکە ئایا 12 کاتژمێر تێپەڕیوە
    const lastWatched = localStorage.getItem('lastAdWatched');
    const now = new Date().getTime();

    if (!lastWatched || (now - lastWatched) >= 12 * 60 * 60 * 1000) {
        overlay.style.display = 'flex';
        startCountdown();
    }

    function startCountdown() {
        let timeLeft = 30;
        const timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            progressBar.style.width = `${100 - (timeLeft / 30 * 100)}%`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                overlay.style.display = 'none';
                localStorage.setItem('lastAdWatched', now.toString());
            }
        }, 1000);
    }
}

// 2. ڕێکخستنی AdSense
function loadAdSense() {
    const adContainers = document.querySelectorAll('.adsbygoogle');
    if (adContainers.length > 0) {
        (adsbygoogle = window.adsbygoogle || []).push({});
        console.log('AdSense loaded successfully');
    }
}

// 3. ڕێکخستنی Adsterra
function loadAdsterra() {
    const adsterraDivs = [
        { id: 'adsterra-ad-1', src: '//oblivionplaysaltered.com/50/c1/0a/50c10a5810034923515743695968da04.js' },
        { id: 'adsterra-ad-2', src: '//oblivionplaysaltered.com/ca/7d/e7/ca7de7addc12c0c856275b95aeddab87.js' }
    ];

    adsterraDivs.forEach(ad => {
        const div = document.getElementById(ad.id);
        if (div) {
            const script = document.createElement('script');
            script.src = ad.src;
            div.appendChild(script);
        }
    });
}

// 4. داگرتن + ڕیکلام
function setupDownloadWithAds() {
    const downloadButtons = document.querySelectorAll('[data-download-with-ads]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const fileUrl = this.getAttribute('data-download-url');
            
            // نیشاندانی ڕیکلامی AdSense
            const tempAd = document.createElement('div');
            tempAd.innerHTML = `
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2419305830519121"></script>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-2419305830519121"
                     data-ad-slot="8995437977"
                     data-ad-format="auto"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            `;
            document.body.appendChild(tempAd);

            // دوای ١٠ چرکە داونلۆد دەکات
            setTimeout(() => {
                window.open(fileUrl, '_blank');
            }, 10000);
        });
    });
}

// 5. پشکنینی AdBlock
function checkAdBlock() {
    const adBlockWarning = document.getElementById('adblock-warning');
    const testAd = document.createElement('div');
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.left = '-9999px';
    document.body.appendChild(testAd);

    setTimeout(() => {
        if (testAd.offsetHeight === 0) {
            adBlockWarning.style.display = 'block';
        }
        testAd.remove();
    }, 1000);
}

// فەرمانە سەرەکییەکان
document.addEventListener('DOMContentLoaded', function() {
    setupPreAccessAd();
    loadAdSense();
    loadAdsterra();
    setupDownloadWithAds();
    checkAdBlock();
});
