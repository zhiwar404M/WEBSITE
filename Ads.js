// == ڕیکلامەکان ==
document.addEventListener('DOMContentLoaded', function() {
    // 1. ڕیکلامی پێش چوونە ژوورەوە
    const overlay = document.getElementById('pre-access-overlay');
    if (overlay) {
        const lastWatched = localStorage.getItem('lastAdWatched');
        const now = Date.now();
        
        if (!lastWatched || (now - lastWatched) >= 43200000) { // 12 کاتژمێر
            overlay.style.display = 'flex';
            startCountdown();
        }

        function startCountdown() {
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

    // 2. AdSense
    if (typeof adsbygoogle !== 'undefined') {
        (adsbygoogle = window.adsbygoogle || []).push({});
    }

    // 3. Adsterra
    ['//oblivionplaysaltered.com/50/c1/0a/50c10a5810034923515743695968da04.js',
     '//oblivionplaysaltered.com/ca/7d/e7/ca7de7addc12c0c856275b95aeddab87.js']
    .forEach(src => {
        const script = document.createElement('script');
        script.src = 'https:' + src;
        document.body.appendChild(script);
    });

    // 4. داگرتن + ڕیکلام
    document.querySelectorAll('[data-download-with-ads]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-download-url');
            
            // نمایشی ڕیکلام
            const ad = document.createElement('div');
            ad.innerHTML = `
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2419305830519121"></script>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-2419305830519121"
                     data-ad-slot="8995437977"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            `;
            document.body.appendChild(ad);

            // داگرتن دوای 10 چرکە
            setTimeout(() => window.open(url, '_blank'), 10000);
        });
    });
});