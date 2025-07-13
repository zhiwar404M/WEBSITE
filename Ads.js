
  // 1. پشکنینی AdBlock
  const adBlockWarning = document.getElementById('adblock-warning');
  const testAd = document.createElement('div');
  testAd.className = 'adsbox';
  document.body.appendChild(testAd);
  setTimeout(() => {
    if (testAd.offsetHeight === 0) adBlockWarning.style.display = 'block';
    testAd.remove();
  }, 1000);
// ڕیکلامی پێش چوونە ژوورەوە
function setupPreAccessAd() {
    const overlay = document.getElementById('pre-access-overlay');
    const timerEl = document.getElementById('timer');
    const progressBar = document.getElementById('progress');

    // پشکنین بکە ئایا 12 کاتژمێر تێپەڕیوە
    const lastWatched = localStorage.getItem('lastAdWatched');
    const now = Date.now();

    if (!lastWatched || (now - lastWatched) >= 12 * 60 * 60 * 1000) {
        overlay.style.display = 'flex';
        startCountdown();
    }

    function startCountdown() {
        let seconds = 30;
        const timer = setInterval(() => {
            seconds--;
            timerEl.textContent = seconds;
            progressBar.style.width = `${100 - (seconds / 30 * 100)}%`;

            if (seconds <= 0) {
                clearInterval(timer);
                overlay.style.display = 'none';
                localStorage.setItem('lastAdWatched', now.toString());
            }
        }, 1000);
    }
}

// فەرمانی سەرەکی
document.addEventListener('DOMContentLoaded', function() {
    setupPreAccessAd();
});

  // 3. داونلۆد + ڕیکلام
  document.querySelectorAll('[data-download-with-ads]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const url = this.getAttribute('data-download-url');
      const ad = document.createElement('div');
      ad.innerHTML = `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2419305830519121"></script>
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2419305830519121" data-ad-slot="8995437977"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      `;
      document.body.appendChild(ad);
      setTimeout(() => window.open(url, '_blank'), 10000);
    });
  });
});