// == ڕێکخستنی ڕیکلامەکان ==
document.addEventListener('DOMContentLoaded', function() {
  // 1. پشکنینی AdBlock
  const adBlockWarning = document.getElementById('adblock-warning');
  const testAd = document.createElement('div');
  testAd.className = 'adsbox';
  document.body.appendChild(testAd);
  setTimeout(() => {
    if (testAd.offsetHeight === 0) adBlockWarning.style.display = 'block';
    testAd.remove();
  }, 1000);

  // 2. ڕیکلامی پێش چوونە ژوورەوە
  const overlay = document.getElementById('pre-access-overlay');
  if (overlay && (!localStorage.getItem('lastAdWatched') || Date.now() - localStorage.getItem('lastAdWatched') > 43200000)) {
    overlay.style.display = 'flex';
    let seconds = 30;
    const timer = setInterval(() => {
      document.getElementById('timer').textContent = --seconds;
      if (seconds <= 0) {
        clearInterval(timer);
        overlay.style.display = 'none';
        localStorage.setItem('lastAdWatched', Date.now());
      }
    }, 1000);
  }

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