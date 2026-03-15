// HTML
const overlay = document.createElement('div');
overlay.id = 'mnt-overlay';
const cfg = MAINTENANCE_CONFIG;
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
            <svg class="mnt-icon-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="24" fill="rgba(56,189,248,0.08)" stroke="rgba(56,189,248,0.5)" stroke-width="1.5"/>
                <path d="M44 20l-4 4-8-8-4 4 8 8-4 4 8 4 4-8 4-4-4-4z" fill="rgba(56,189,248,0.85)"/>
                <circle cx="24" cy="40" r="4" fill="rgba(168,85,247,0.85)"/>
                <path d="M20 36l8 8M28 36l-8 8" stroke="rgba(168,85,247,0.6)" stroke-width="1.5"/>
                <circle cx="32" cy="32" r="3" fill="white" opacity="0.9"/>
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
            <div class="mnt-prog-bar">
                <div class="mnt-prog-fill"></div>
                <div class="mnt-prog-glow"></div>
            </div>
            <p class="mnt-prog-text">چاکردن بەردەوامە...</p>
        </div>

    </div>
`;