// == Adsterra Video Ad Manager ==
document.addEventListener('DOMContentLoaded', function() {
    // 1. دیزاینی پانێڵی ڕیکلامی ڤیدیۆیی
    const overlay = document.getElementById('pre-access-overlay');
    if (!overlay) return;

    // پشکنینی ئەدبڵۆک
    const adBlockTest = document.createElement('div');
    adBlockTest.className = 'ad-box';
    adBlockTest.style.height = '1px';
    document.body.appendChild(adBlockTest);
    
    setTimeout(() => {
        if (adBlockTest.offsetHeight === 0) {
            alert('تکایە ئەدبڵۆک ناچالاک بکە بۆ بینینی ناوەڕۆک');
            return;
        }
        adBlockTest.remove();
        
        // پشکنینی کاتی 12 کاتژمێر
        const lastAd = localStorage.getItem('lastAdTime');
        const now = Date.now();
        
        if (!lastAd || (now - lastAd) > 43200000) {
            overlay.style.display = 'flex';
            
            // 2. دیزاینی پیشاندانی ڤیدیۆ
            const videoAdContainer = document.createElement('div');
            videoAdContainer.innerHTML = `
                <div style="width:100%;max-width:800px;background:#000;border-radius:10px;overflow:hidden">
                    <iframe src="https://oblivionplaysaltered.com/video-ad?key=e41025d5f4aaac4dc160a8598cffd3f9" 
                            style="width:100%;height:450px;border:none;"></iframe>
                    <div style="padding:15px;background:#222;color:#fff;display:flex;justify-content:space-between;align-items:center">
                        <div id="countdown" style="font-size:18px">30 چرکە</div>
                        <div style="width:70%;height:5px;background:#444;border-radius:5px">
                            <div id="progress-bar" style="height:100%;width:100%;background:#4CAF50;border-radius:5px"></div>
                        </div>
                    </div>
                </div>
            `;
            overlay.appendChild(videoAdContainer);

            // 3. سیستەمی کۆنتاوداون
            let seconds = 30;
            const timer = setInterval(() => {
                seconds--;
                document.getElementById('countdown').textContent = `${seconds} چرکە`;
                document.getElementById('progress-bar').style.width = `${(seconds/30)*100}%`;
                
                if (seconds <= 0) {
                    clearInterval(timer);
                    overlay.style.display = 'none';
                    localStorage.setItem('lastAdTime', now);
                    overlay.removeChild(videoAdContainer);
                }
            }, 1000);
        }
    }, 1000);

    // 4. سیستەمی داگرتن بە ڕیکلام
    document.querySelectorAll('[data-download-with-ads]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-download-url');
            
            // نمایشی ڕیکلامی ڤیدیۆیی
            const videoAd = document.createElement('div');
            videoAd.innerHTML = `
                <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;justify-content:center;align-items:center">
                    <div style="width:90%;max-width:600px">
                        <iframe src="https://oblivionplaysaltered.com/video-ad?key=directlink_key" 
                                style="width:100%;height:350px;border:none;"></iframe>
                        <div style="text-align:center;color:#fff;margin-top:10px">
                            <p>داگرتن لە 5 چرکەی داهاتوو دەستپێدەکات...</p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(videoAd);

            // داگرتن دوای 5 چرکە
            setTimeout(() => {
                window.open(url, '_blank');
                document.body.removeChild(videoAd);
            }, 5000);
        });
    });
});