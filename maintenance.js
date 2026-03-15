// ===============================================
// maintenance.js - ZHIWAR Website
// CSS جیاکراوەتەوە بۆ maintenance.css
// ===============================================

const MAINTENANCE_CONFIG = {

```
// ============================================
//  true  = بینەران پەیجی چاکردن دەبینن
//  false = وێبسایت بە ئاساییەوەیە
// ============================================
enabled: true,

message:    "وێبسایتەکەمان ئێستا لە چاکردندایە",
submessage: "داهاتوو دەگەڕێینەوە بە شێوازێکی باشتر و تازەتر. سوپاسی بردباریت دەکەین",

countdown: {
    enabled:    true,
    targetDate: "2025-12-31T23:59:59"   // ← کاتی خۆت بنووسە
},

contact: {
    email:    "zhiwarup@gmail.com",
    youtube:  "https://youtube.com/@zhiwarxyt",
    facebook: "#",
    snapchat: "https://snapchat.com/t/HktxQxsY"
}
```

};

// ── ئۆتۆماتیکی — دەستکاری مەکە ──
(function () {
if (!MAINTENANCE_CONFIG.enabled) return;
if (document.readyState === ‘loading’) {
document.addEventListener(‘DOMContentLoaded’, showMaintenancePage);
} else {
showMaintenancePage();
}
})();

function showMaintenancePage() {
document.body.style.overflow = ‘hidden’;
const cfg = MAINTENANCE_CONFIG;

```
const overlay = document.createElement('div');
overlay.id = 'mnt-overlay';
overlay.innerHTML = `
    <div class="mnt-bg">
        <div class="mnt-grid"></div>
        <div class="mnt-orb mnt-orb-1"></div>
        <div class="mnt-orb mnt-orb-2"></div>
        <div class="mnt-orb mnt-orb-3"></div>
        <div id="mntParts"></div>
    </div>
    <div class="mnt-content">
        <div class="mnt-icon-wrap">
            <div class="mnt-ring mnt-ring-1"></div>
            <div class="mnt-ring mnt-ring-2"></div>
            <div class="mnt-ring mnt-ring-3"></div>
            <svg class="mnt-icon-svg" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="24" fill="rgba(56,189,248,.08)" stroke="rgba(56,189,248,.5)" stroke-width="1.5"/>
                <path d="M44 20l-4 4-8-8-4 4 8 8-4 4 8 4 4-8 4-4-4-4z" fill="rgba(56,189,248,.85)"/>
                <circle cx="24" cy="40" r="4" fill="rgba(168,85,247,.85)"/>
                <path d="M20 36l8 8M28 36l-8 8" stroke="rgba(168,85,247,.6)" stroke-width="1.5"/>
                <circle cx="32" cy="32" r="3" fill="white" opacity=".9"/>
            </svg>
        </div>
        <div>
            <div class="mnt-badge">🔧 چاکردن</div>
            <h1 class="mnt-title">${cfg.message}</h1>
            <p class="mnt-sub">${cfg.submessage} 💙</p>
        </div>
        ${cfg.countdown.enabled ? `
        <div class="mnt-timer-wrap">
            <div class="mnt-timer-label">⏱ کاتی مانەوە</div>
            <div class="mnt-timer">
                <div class="mnt-time-box"><div class="mnt-num" id="mD">00</div><div class="mnt-lbl">ڕۆژ</div></div>
                <div class="mnt-sep">:</div>
                <div class="mnt-time-box"><div class="mnt-num" id="mH">00</div><div class="mnt-lbl">کاتژمێر</div></div>
                <div class="mnt-sep">:</div>
                <div class="mnt-time-box"><div class="mnt-num" id="mM">00</div><div class="mnt-lbl">خولەک</div></div>
                <div class="mnt-sep">:</div>
                <div class="mnt-time-box"><div class="mnt-num" id="mS">00</div><div class="mnt-lbl">چرکە</div></div>
            </div>
        </div>` : ''}
        <div class="mnt-contact-wrap">
            <p class="mnt-contact-lbl">📬 پەیوەندیمان پێوە بکە</p>
            <div class="mnt-links">
                <a href="mailto:${cfg.contact.email}" class="mnt-link lk-email"><span class="material-icons">email</span>${cfg.contact.email}</a>
                <a href="${cfg.contact.youtube}" target="_blank" class="mnt-link lk-yt"><span class="material-icons">play_circle</span>YouTube</a>
                <a href="${cfg.contact.facebook}" target="_blank" class="mnt-link lk-fb"><span class="material-icons">facebook</span>Facebook</a>
                <a href="${cfg.contact.snapchat}" target="_blank" class="mnt-link lk-sc"><span class="material-icons">camera</span>Snapchat</a>
            </div>
        </div>
        <div class="mnt-prog-wrap">
            <div class="mnt-prog-bar"><div class="mnt-prog-fill"></div><div class="mnt-prog-glow"></div></div>
            <p class="mnt-prog-text">چاکردن بەردەوامە...</p>
        </div>
    </div>
`;

document.body.insertBefore(overlay, document.body.firstChild);

// Particles
const pc = document.getElementById('mntParts');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'mnt-particle';
    const s = 2 + Math.random() * 3;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${8+Math.random()*14}s;animation-delay:-${Math.random()*20}s;opacity:${0.3+Math.random()*0.5}`;
    pc.appendChild(p);
}

// Countdown
if (cfg.countdown.enabled) {
    const target = new Date(cfg.countdown.targetDate).getTime();
    function tick() {
        const d = target - Date.now();
        if (d <= 0) return;
        const pad = n => String(n).padStart(2, '0');
        document.getElementById('mD').textContent = pad(Math.floor(d / 86400000));
        document.getElementById('mH').textContent = pad(Math.floor(d % 86400000 / 3600000));
        document.getElementById('mM').textContent = pad(Math.floor(d % 3600000 / 60000));
        document.getElementById('mS').textContent = pad(Math.floor(d % 60000 / 1000));
    }
    tick();
    setInterval(tick, 1000);
}
```

}