# ⚡ QUICK START GUIDE - ZHIWAR YT Enhanced v2.0

## 🎯 What's New?

Your website now includes:

1. **📺 Ad Interstitial Gating System** - Full-screen ad that appears on first visit and re-appears every 24 hours
2. **✨ Enhanced About Developer Section** - Professional, authentic bio with animations
3. **🌀 3D Squircle Animations** - Modern particle effects on app cards
4. **🎨 Improved Design & Animations** - Smoother, more professional look

---

## ⚙️ Configuration (REQUIRED BEFORE DEPLOYMENT)

### Step 1: Configure Ad Gating

Open `app.js` and find this section (around line 20):

```javascript
const AD_GATING_CONFIG = {
  REAPPEAR_DURATION: 24,        // ← Change this to 12 for 12 hours, or any number
  COUNTDOWN_DURATION: 15,       // ← Change countdown seconds here
  STORAGE_KEY: 'zhiwar_ad_gating_timestamp',
  ENABLED: true                 // ← Set to false to disable ads
};
```

**Quick Options:**
- **No Ads?** Set `ENABLED: false`
- **Show Ad Every 12 Hours?** Set `REAPPEAR_DURATION: 12`
- **Shorter Countdown?** Set `COUNTDOWN_DURATION: 5`

### Step 2: Add Your Ad Video

Open `index.html` and find the ad placeholder (around line 50):

```html
<div id="adVideoFrame" class="ad-video-frame">
  <!-- Your ad network video (Adsterra, etc.) will be embedded here -->
  <div class="ad-placeholder">
    <span class="material-icons">video_library</span>
    <p>ڤیدیۆی تاژ...</p>
  </div>
</div>
```

Replace the `<div class="ad-placeholder">` with your actual ad code:

```html
<!-- Example for Adsterra -->
<script>
  atOptions = {
    'key': 'YOUR_ADSTERRA_KEY',
    'format': 'iframe',
    'height': 600,
    'width': 160,
    'params': {}
  };
</script>
<script src="//www.highperformanceformat.com/YOUR_KEY.js"></script>
```

### Step 3: Update About Developer Section

Open `index.html` and find the About section (around line 355):

```html
<div class="adev-bio">
  <p>مندەڵی گەشەپێدان و دیزاینی زۆر تێدەیدار. بۆ چوار ساڵی خۆم بەرنامەی بەجێهێنەری کوردی دامەزرانەوە کردوومە. سادەیی، خێرایی و سنورداری بیرکاریی بە مەرکەزی یەکپارچکردنی سەرهەڵدانی بە بێهاوتا بوونی هەیە.</p>
</div>
```

Change the text to your own bio. Keep it authentic and passionate!

---

## 🧪 Testing the Ad System

### Test 1: First Visit (Should Show Ad)
1. Open browser's **Incognito/Private Window**
2. Visit your website
3. You should see the full-screen ad with countdown

### Test 2: Clear localStorage (Simulate First Visit Again)
1. Open **Developer Tools** (F12)
2. Go to **Application** tab
3. Click **Local Storage**
4. Find your domain and click **Delete**
5. Refresh page - ad should show again

### Test 3: Disable Ad System
1. In `app.js`, set `ENABLED: false`
2. Refresh page - no ad should appear
3. Change back to `ENABLED: true` when ready

---

## 📱 Customization Tips

### Change Ad Countdown Duration

`app.js` line ~25:
```javascript
COUNTDOWN_DURATION: 15,  // Change to 5, 10, 20, etc.
```

### Change How Often Ad Reappears

`app.js` line ~21:
```javascript
REAPPEAR_DURATION: 24,   // 12 = every 12 hours, 48 = every 2 days
```

### Modify About Developer Stats

`index.html` search for:
```html
<div class="adev-stat-num" data-count="4" data-suffix="+">0+</div>
<div class="adev-stat-label">سال تێبینی</div>
```

Change `data-count` values to your actual stats.

### Change Theme Colors

`style.css` top of file:
```css
:root {
  --primary:      #38bdf8;      /* Main cyan blue */
  --primary-dark: #0ea5e9;      /* Dark cyan */
  --accent-purple: #a855f7;     /* Purple highlights */
  --success: #22c55e;           /* Green for success states */
}
```

---

## 📊 How Ad Gating Works (Behind the Scenes)

1. **First Visit**: 
   - User sees full-screen ad overlay
   - Countdown timer counts from 15 to 0
   - "Skip" button appears
   - When skipped, timestamp saved to browser's localStorage

2. **Subsequent Visits**:
   - System checks localStorage for timestamp
   - If 24 hours (or your configured time) has passed → show ad again
   - If not enough time has passed → skip directly to website

3. **User Privacy**:
   - No personal data collected
   - Only stores a timestamp
   - User can clear localStorage anytime
   - Works completely offline in browser

---

## 🎨 CSS Customization Examples

### Make Ad Skip Button Appear Faster

`style.css`, find `.countdown-number`:
```css
.countdown-number {
  font-size: 3rem;  /* Change size */
  color: #38bdf8;   /* Change color */
}
```

### Change Ad Overlay Background

`style.css`, find `#adGatingOverlay`:
```css
#adGatingOverlay {
  background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%);
  /* Change the gradient colors here */
}
```

### Speed Up Animations

`style.css`, find `@keyframes`:
```css
@keyframes slideUp {
  /* Change from .5s to .3s for faster animation */
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 🔗 File Reference

| File | Purpose | Modify? |
|------|---------|---------|
| `index.html` | Main page, ad overlay, about section | ✅ YES (add ad code, update bio) |
| `app.js` | Core functionality, ad system | ✅ YES (configure AD_GATING_CONFIG) |
| `style.css` | All styles and animations | ⚠️ OPTIONAL (only if customizing colors/fonts) |
| `maintenance.js` | Support utilities | ❌ NO |
| `Ads.js` | Ad network integration | ❌ NO |
| `translation.js` | Language support | ❌ NO |

---

## 🚀 Deployment Steps

1. **Configure** `AD_GATING_CONFIG` in `app.js`
2. **Add** your actual ad network code to `index.html`
3. **Update** About Developer bio with your text
4. **Test** in incognito window (ad should show)
5. **Upload** all files to your web server
6. **Done!** 🎉

---

## 🆘 Troubleshooting

### Ad Doesn't Show on First Visit
- Check if `ENABLED: true` in `app.js`
- Check browser console for errors (F12)
- Clear localStorage and refresh
- Check if you're in private/incognito window

### Ad Shows Every Refresh
- Your ad provider's iframe might be blocking localStorage
- Or `REAPPEAR_DURATION: 0` in config (set to 24 or 12)

### Skip Button Doesn't Appear
- Check countdown duration is set (`COUNTDOWN_DURATION: 15`)
- Check button element exists in HTML
- Check CSS isn't hiding the button

### Animations Lag on Mobile
- Reduce particle count (in `app.js`, around line 450)
- Disable squircle animations for mobile (add media query)

---

## 📚 CSS Class Reference

### Ad System
- `.ad-gating-overlay` - Main overlay container
- `.ad-gating-container` - Inner card
- `.countdown-number` - Timer display
- `.ad-gating-skip-btn` - Skip button

### About Developer
- `.adev-bio` - Bio text paragraph
- `.adev-stat` - Individual stat box
- `.adev-tech` - Tech skill pill

### Animations
- `.scroll-animate` - Elements that fade in on scroll
- `.scroll-animate-left` - Elements that slide in from left
- `.scroll-animate-right` - Elements that slide in from right

---

## 📞 Support Resources

### For Ad Network Integration:
- **Adsterra**: https://www.adsterra.com/
- **PropellerAds**: https://www.propellerads.com/
- **Taboola**: https://www.taboola.com/

### For Firebase Setup:
- **Firebase Console**: https://console.firebase.google.com/
- **Config File**: Update `firebase-config.js`

### General Help:
- Email: `zhiwarup@gmail.com`
- YouTube: `https://youtube.com/@zhiwarxyt`

---

## ✨ Pro Tips

1. **Test before deployment** - Use incognito window
2. **Keep bio authentic** - Avoid generic phrases
3. **Monitor ad performance** - Track which ads convert best
4. **Update regularly** - Keep tech stack current
5. **Backup localStorage** - Users can clear it anytime
6. **Mobile test** - Ensure ad looks good on phones

---

## 📋 Pre-Launch Checklist

- [ ] Ad system configured (`REAPPEAR_DURATION`, `COUNTDOWN_DURATION`)
- [ ] Ad network code added to HTML
- [ ] About Developer bio updated
- [ ] All links tested (email, YouTube, etc.)
- [ ] Tested in incognito window
- [ ] Tested on mobile device
- [ ] localStorage cleared and retested
- [ ] All languages working (Kurdish, Arabic, English)
- [ ] Modal opens/closes properly
- [ ] Animations smooth on target devices

---

**🎉 You're all set! Your enhanced ZHIWAR YT website is ready to deploy!**

Questions? Email: **zhiwarup@gmail.com**
