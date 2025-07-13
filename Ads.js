// == Adsterra Ad Manager ==
document.addEventListener('DOMContentLoaded', function() {
    // 1. ڕیکلامی پێش چوونە ژوورەوە (Popunder)
    const overlay = document.getElementById('pre-access-overlay');
    if (overlay) {
        const lastAdTime = localStorage.getItem('lastAdTime');
        const now = Date.now();
        
        if (!lastAdTime || (now - lastAdTime) > 43200000) { // 12 کاتژمێر
            overlay.style.display = 'flex';
            
            // بارکردنی ڕیکلامی Popunder
            const popunderScript = document.createElement('script');
            popunderScript.src = 'https://oblivionplaysaltered.com/pu/50c10a5810034923515743695968da04';
            document.body.appendChild(popunderScript);

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

    // 2. ڕێکخستنی داگرتن + ڕیکلام (DirectLink)
    document.querySelectorAll('[data-download-with-ads]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-download-url');
            
            // بارکردنی ڕیکلامی DirectLink
            const directScript = document.createElement('script');
            directScript.src = 'https://oblivionplaysaltered.com/dl/e41025d5f4aaac4dc160a8598cffd3f9';
            document.body.appendChild(directScript);

            // داگرتن دوای 5 چرکە
            setTimeout(() => {
                window.open(url, '_blank');
            }, 5000);
        });
    });

    // 3. SocialBar (کە کار دەکات)
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            const sbScript = document.createElement('script');
            sbScript.src = 'https://oblivionplaysaltered.com/sb/ca7de7addc12c0c856275b95aeddab87';
            document.body.appendChild(sbScript);
            window.removeEventListener('scroll', this);
        }
    });
});