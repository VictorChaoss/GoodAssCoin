/* ============================================
   GOOD ASS COIN — JS 🍑
   (very advanced technology)
   ============================================ */

/* ============================================
   🚀 LAUNCH CONFIG — update these when live!!
   ============================================ */
const CONFIG = {
  CA:       '2PQiYiFgUKdav7Xv88XagaWk1wczamnPispAaPAqpump',
  PUMPFUN:  'https://pump.fun/coin/2PQiYiFgUKdav7Xv88XagaWk1wczamnPispAaPAqpump',
};
/* ========================================= */

// ── APPLY CONFIG TO PAGE ──
// (script is at bottom of body so DOM is already ready — no DOMContentLoaded needed)
const isLive = CONFIG.CA !== 'coming soon!!' && CONFIG.CA !== '';

const caTextEl = document.getElementById('ca-text');
if (caTextEl) caTextEl.textContent = CONFIG.CA;

if (isLive) {
  document.querySelectorAll('#btn-buy-hero, #footer-pumpfun').forEach(el => {
    el.href = CONFIG.PUMPFUN;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

// ── CURSOR COIN ──
const cursorCoin = document.getElementById('cursor-coin');
if (cursorCoin) {
  document.addEventListener('mousemove', (e) => {
    cursorCoin.style.left = e.clientX + 'px';
    cursorCoin.style.top  = e.clientY + 'px';
  });
}

// ── COPY CA ──
function copyCa() {
  const isLive = CONFIG.CA !== 'coming soon!!' && CONFIG.CA !== '';
  if (!isLive) {
    const btn = document.getElementById('copy-ca-btn');
    const orig = btn.textContent;
    btn.textContent = '🚫 not yet!!';
    setTimeout(() => { btn.textContent = orig; }, 1500);
    return;
  }
  navigator.clipboard.writeText(CONFIG.CA).then(() => {
    const btn = document.getElementById('copy-ca-btn');
    const orig = btn.textContent;
    btn.textContent = '✅ copied!!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

// ── CLICK CONFETTI ON BUY BUTTON ──
function spawnEmoji(x, y, emoji) {
  const el = document.createElement('span');
  el.textContent = emoji;
  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: ${1.2 + Math.random() * 1.5}rem;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    animation: emojiPop 0.9s ease-out forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

// inject anim
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes emojiPop {
    0%   { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
    60%  { opacity: 1; transform: translate(calc(-50% + ${Math.random() > 0.5 ? '' : '-'}${Math.round(Math.random()*60)}px), calc(-50% - ${Math.round(Math.random()*80+30)}px)) scale(1.2); }
    100% { opacity: 0; transform: translate(calc(-50% + ${Math.random() > 0.5 ? '' : '-'}${Math.round(Math.random()*120)}px), calc(-50% - ${Math.round(Math.random()*150+60)}px)) scale(0.8); }
  }
`;
document.head.appendChild(styleSheet);

const CONFETTI_EMOJIS = ['🍑', '💰', '🚀', '⭐', '🌙', '💎', '🔥', '✨'];

function burstConfetti(e) {
  const count = 10 + Math.floor(Math.random() * 8);
  for (let i = 0; i < count; i++) {
    const emoji = CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)];
    const px = e.clientX + (Math.random() - 0.5) * 60;
    const py = e.clientY + (Math.random() - 0.5) * 40;
    setTimeout(() => spawnEmoji(px, py, emoji), i * 40);
  }
}

['btn-buy-hero'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', burstConfetti);
});

// ── SCROLL WOBBLE OBSERVER ──
// Cards wiggle when they enter the viewport
const observerCfg = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerCfg);

document.querySelectorAll('.reason-card, .meme-card, .step, .toke-card, .stat-box').forEach(el => {
  observer.observe(el);
});

// add in-view styles
const inViewStyle = document.createElement('style');
inViewStyle.textContent = `
  .reason-card, .meme-card, .step, .toke-card, .stat-box {
    opacity: 0;
    transform-origin: center;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .reason-card.in-view, .meme-card.in-view, .step.in-view, .toke-card.in-view, .stat-box.in-view {
    opacity: 1;
  }
  /* preserve the static tilts once in view */
  .card-wobble-1.in-view { transform: rotate(-2deg); }
  .card-wobble-2.in-view { transform: rotate(1.5deg); }
  .card-wobble-3.in-view { transform: rotate(-1deg); }
  .card-wobble-4.in-view { transform: rotate(2.5deg); }
  .tilt-left.in-view     { transform: rotate(-2deg); }
  .tilt-right.in-view    { transform: rotate(2deg); }
  .step.in-view          { transform: translateX(0); }
  .stat-box.in-view      { transform: none; }
  .toke-card.in-view     { transform: none; }
`;
document.head.appendChild(inViewStyle);

// ── WIGGLE COIN ON CLICK ──
const coinImg = document.getElementById('hero-coin-img');
if (coinImg) {
  coinImg.addEventListener('click', (e) => {
    coinImg.style.animation = 'none';
    coinImg.style.transform = 'rotate(720deg) scale(1.1)';
    coinImg.style.transition = 'transform 0.6s cubic-bezier(.36,.07,.19,.97)';
    burstConfetti(e);
    setTimeout(() => {
      coinImg.style.transform = '';
      coinImg.style.transition = '';
      coinImg.style.animation  = '';
    }, 700);
  });
}

// ── TITLE CLICK EASTER EGG ──
let clickCount = 0;
const bigTitle = document.querySelector('.big-title');
if (bigTitle) {
  bigTitle.addEventListener('click', () => {
    clickCount++;
    const messages = [
      'it really is tho!! 🍑',
      'VERY GOOD!! 💎',
      'ur gonna be rich!! 🚀',
      'wen lambo?? 🚗💨',
      'ser this is financial advice actually',
      '🍑🍑🍑🍑🍑🍑🍑🍑🍑🍑',
    ];
    const msg = messages[clickCount % messages.length];
    const bubble = document.querySelector('.speech-bubble p');
    if (bubble) {
      bubble.innerHTML = msg;
      bigTitle.style.animation = 'none';
      void bigTitle.offsetWidth;
      bigTitle.style.animation = '';
    }
  });
}

console.log('%c🍑 GOOD ASS COIN 🍑', 'font-size:2rem;color:#ffc800;font-weight:bold;');
console.log('%cit\'s a good ass coin!! buy it!!', 'font-size:1rem;color:#ff6b6b;');
