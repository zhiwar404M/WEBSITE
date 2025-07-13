// == Adsterra Ad Manager ==
document.addEventListener('DOMContentLoaded', function() {
    // 1. ڕێکخستنی ڕیکلامی پێش چوونە ژوورەوە
    const overlay = document.getElementById('pre-access-overlay');
    if (overlay) {
        // پشکنینی ئەدبڵۆک
        const adBlockTest = document.createElement('div');
        adBlockTest.className = 'adsbox';
        document.body.appendChild(adBlockTest);
        setTimeout(() => {
            if (adBlockTest.offsetHeight === 0) {
                console.warn('AdBlock چالاکە!');
                return;
            }
            adBlockTest.remove();
        }, 1000);

        // پشکنینی کاتی 12 کاتژمێر
        const lastAdTime = localStorage.getItem('lastAdTime');
        const now = Date.now();
        
        if (!lastAdTime || (now - lastAdTime) > 43200000) { // 12 کاتژمێر
            overlay.style.display = 'flex';
            
            // بارکردنی ڕیکلامی Adsterra (Popunder)
            const script = document.createElement('script');
            script.src = 'https://oblivionplaysaltered.com/50/c1/0a/50c10a5810034923515743695968da04.js';
            document.body.appendChild(script);

            // کاتژمێری کۆنتاوداون
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
    }

    // 2. ڕێکخستنی داگرتن + ڕیکلام
    document.querySelectorAll('[data-download-with-ads]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-download-url');
            
            // بارکردنی ڕیکلامی جۆری DirectLink
            const dlScript = document.createElement('script');
            dlScript.src = 'https://oblivionplaysaltered.com/dl/e41025d5f4aaac4dc160a8598cffd3f9';
            document.body.appendChild(dlScript);

            // داگرتن دوای 5 چرکە
            setTimeout(() => {
                window.open(url, '_blank');
            }, 5000);
        });
    });

    // 3. بارکردنی SocialBar لە کاتی سکرۆلکردن
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            const sbScript = document.createElement('script');
            sbScript.src = 'https://oblivionplaysaltered.com/sb/ca7de7addc12c0c856275b95aeddab87';
            document.body.appendChild(sbScript);
            window.removeEventListener('scroll', this);
        }
    });
});
