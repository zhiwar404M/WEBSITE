// ========== DATA ==========
const COUNTRIES = [
  { code: 'US', name: 'ئەمریکا', flag: '🇺🇸', ping: '~80ms', endpoint: '162.159.192.1', port: 2408 },
  { code: 'GB', name: 'بریتانیا', flag: '🇬🇧', ping: '~60ms', endpoint: '188.114.96.1', port: 2408 },
  { code: 'DE', name: 'ئەڵمانیا', flag: '🇩🇪', ping: '~55ms', endpoint: '188.114.97.1', port: 2408 },
  { code: 'FR', name: 'فەرەنسا', flag: '🇫🇷', ping: '~58ms', endpoint: '162.159.193.1', port: 2408 },
  { code: 'NL', name: 'هۆڵەندا', flag: '🇳🇱', ping: '~50ms', endpoint: '162.159.195.1', port: 2408 },
  { code: 'JP', name: 'ژاپۆن', flag: '🇯🇵', ping: '~110ms', endpoint: '162.159.192.1', port: 500 },
  { code: 'SG', name: 'سینگاپور', flag: '🇸🇬', ping: '~100ms', endpoint: '188.114.96.1', port: 1701 },
  { code: 'KR', name: 'کۆریا', flag: '🇰🇷', ping: '~105ms', endpoint: '162.159.193.1', port: 500 },
  { code: 'AE', name: 'ئیمارات', flag: '🇦🇪', ping: '~45ms', endpoint: '162.159.195.1', port: 2408 },
  { code: 'TR', name: 'تورکیا', flag: '🇹🇷', ping: '~40ms', endpoint: '188.114.97.1', port: 1701 },
  { code: 'CA', name: 'کانەدا', flag: '🇨🇦', ping: '~85ms', endpoint: '162.159.192.1', port: 2408 },
  { code: 'AU', name: 'ئوسترالیا', flag: '🇦🇺', ping: '~150ms', endpoint: '188.114.96.1', port: 2408 },
  { code: 'BR', name: 'بڕازیل', flag: '🇧🇷', ping: '~120ms', endpoint: '162.159.193.1', port: 2408 },
  { code: 'RU', name: 'ڕووسیا', flag: '🇷🇺', ping: '~55ms', endpoint: '162.159.195.1', port: 2408 },
  { code: 'IN', name: 'هیندستان', flag: '🇮🇳', ping: '~70ms', endpoint: '188.114.97.1', port: 2408 },
  { code: 'SA', name: 'عەرەبستان', flag: '🇸🇦', ping: '~42ms', endpoint: '162.159.192.1', port: 1701 },
  { code: 'SE', name: 'سوید', flag: '🇸🇪', ping: '~48ms', endpoint: '188.114.96.1', port: 500 },
  { code: 'CH', name: 'سوسرا', flag: '🇨🇭', ping: '~52ms', endpoint: '162.159.193.1', port: 2408 },
  { code: 'PL', name: 'پۆڵەندا', flag: '🇵🇱', ping: '~53ms', endpoint: '162.159.195.1', port: 2408 },
  { code: 'HK', name: 'هۆنگ کۆنگ', flag: '🇭🇰', ping: '~95ms', endpoint: '188.114.97.1', port: 2408 },
];

const WARP_PUBKEY = 'bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=';

// Pre-defined configs from screenshots
const CONFIGS = {
  tdm: {
    name: 'tdm-full-headshot',
    raw: `[Interface]
PrivateKey = <YOUR_PRIVATE_KEY>
PublicKey = X3ezirhftXgUNbrcVS/3Qjg4EdpWZZpcXl8jXg=
Address = 255.255.255.0/32
ListenPort = 25677
MTU = 25677
DNS = 8.8.8.8

[Peer]
PublicKey = ${WARP_PUBKEY}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = 162.159.192.1:2408
PersistentKeepalive = 25

# Config: TDM Full Headshot
# Game: PUBG Mobile / COD / Free Fire
# Type: Headshot Optimizer`
  },
  pubg: {
    name: 'pubg-full-speed-headshot',
    raw: `[Interface]
PrivateKey = <YOUR_PRIVATE_KEY>
PublicKey = 1nL5AnaUf0lHMHJnoacuhTV7scpW9gWuc7ik=
Address = 9.9.9.9/24
ListenPort = 8254
MTU = 8687
DNS = 1.1.1.1

[Peer]
PublicKey = ${WARP_PUBKEY}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = 162.159.193.1:2408
PersistentKeepalive = 25

# Config: PUBG Full Speed and Headshot
# Game: PUBG Mobile
# Type: Speed + Headshot Boost`
  }
};

let currentConfig = null;
let selectedCountry = 'US';

// ========== INIT ==========
function init() {
  renderCountries();
  populateCountrySelect();
}

function renderCountries() {
  const grid = document.getElementById('countries-grid');
  grid.innerHTML = COUNTRIES.map(c => `
    <button class="country-btn ${c.code === selectedCountry ? 'active' : ''}"
      onclick="selectCountry('${c.code}', this)">
      <span class="flag">${c.flag}</span>
      <span>${c.name}</span>
      <span class="ping">${c.ping}</span>
    </button>
  `).join('');
}

function selectCountry(code, el) {
  selectedCountry = code;
  document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function setGame(game, el) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function populateCountrySelect() {
  const sel = document.getElementById('gen-country');
  sel.innerHTML = COUNTRIES.map(c =>
    `<option value="${c.code}">${c.flag} ${c.name}</option>`
  ).join('');
}

// ========== CONFIG ACTIONS ==========
function showConfig(type) {
  const cfg = CONFIGS[type];
  currentConfig = cfg;
  document.getElementById('code-title').textContent = cfg.name + '.conf';
  document.getElementById('code-content').innerHTML = colorizeConfig(cfg.raw);
  document.getElementById('code-viewer').style.display = 'block';
  document.getElementById('code-viewer').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function colorizeConfig(text) {
  return text.split('\n').map(line => {
    if (line.startsWith('#')) return `<span class="line-comment">${line}</span>`;
    if (line.startsWith('[')) return `<span class="line-section">${line}</span>`;
    const eq = line.indexOf('=');
    if (eq > 0) {
      const k = line.slice(0, eq);
      const v = line.slice(eq);
      return `<span class="line-key">${k}</span><span class="line-val">${v}</span>`;
    }
    return line;
  }).join('\n');
}

function downloadConfig(type) {
  const cfg = CONFIGS[type];
  triggerDownload(cfg.raw, cfg.name + '.conf');
  showToast('⬇ داونلۆد دەستپێکرد!');
}

function copyConfig(type) {
  navigator.clipboard.writeText(CONFIGS[type].raw);
  showToast('✓ کۆنفیگ کۆپی کرا!');
}

function copyCurrentConfig() {
  if (!currentConfig) return;
  navigator.clipboard.writeText(currentConfig.raw);
  showToast('✓ کۆپی کرا!');
}

function downloadCurrentConfig() {
  if (!currentConfig) return;
  triggerDownload(currentConfig.raw, currentConfig.name + '.conf');
  showToast('⬇ داونلۆد دەستپێکرد!');
}

function generateCustomConfig() {
  const cCode = document.getElementById('gen-country').value;
  const type = document.getElementById('gen-type').value;
  const dns = document.getElementById('gen-dns').value;
  const country = COUNTRIES.find(c => c.code === cCode);

  const configs = {
    speed:     { mtu: 1420, port: 51820, addr: '10.0.0.2/24' },
    headshot:  { mtu: 8687, port: 8254,  addr: '9.9.9.9/24'  },
    balanced:  { mtu: 1280, port: 2408,  addr: '172.16.0.2/32' },
  };
  const c = configs[type];

  const privKey = genKey();
  const raw = `[Interface]
PrivateKey = ${privKey}
Address = ${c.addr}
ListenPort = ${c.port}
MTU = ${c.mtu}
DNS = ${dns}

[Peer]
PublicKey = ${WARP_PUBKEY}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = ${country.endpoint}:${country.port}
PersistentKeepalive = 25

# Country: ${country.flag} ${country.name}
# Type: ${type}
# DNS: ${dns}
# Generated: ${new Date().toISOString().slice(0,10)}`;

  currentConfig = { raw, name: `wg-${cCode.toLowerCase()}-${type}` };
  document.getElementById('code-title').textContent = currentConfig.name + '.conf';
  document.getElementById('code-content').innerHTML = colorizeConfig(raw);
  document.getElementById('code-viewer').style.display = 'block';
  document.getElementById('code-viewer').scrollIntoView({ behavior: 'smooth', block: 'start' });
  triggerDownload(raw, currentConfig.name + '.conf');
  showToast('✓ کۆنفیگ دروست کرا و داونلۆد دەستپێکرد!');
}

// ========== HELPERS ==========
function genKey() {
  const b = new Uint8Array(32);
  crypto.getRandomValues(b);
  return btoa(String.fromCharCode(...b));
}

function triggerDownload(text, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = filename;
  a.click();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ========== PARTICLES ==========
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkDot() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.5 + 0.1,
    };
  }

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 80; i++) dots.push(mkDot());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,200,255,${d.a})`;
      ctx.fill();
    });
    // connections
    for (let i = 0; i < dots.length; i++)
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(0,200,255,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    requestAnimationFrame(draw);
  }
  draw();
})();

init();
