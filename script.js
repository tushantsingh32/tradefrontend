
/* ================= NAVBAR ================= */

const humburger = document.querySelector(".humburger");
const navLinks = document.querySelector(".navlink");

humburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!humburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("show");
  }
});

const light = document.querySelector(".light");
light.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  light.classList.toggle("dark");
});

/* ================= MARKET DATA ================= */

async function loadMarket() {
  try {
    /* ---------- CRYPTO ---------- */
    const cryptoRes = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
    );
    const crypto = await cryptoRes.json();

    updateCoin("eth", crypto.ethereum);
    updateCoin("btc", crypto.bitcoin);
    updateCoin("sol", crypto.solana);

    /* ---------- METALS ---------- */
    const metalRes = await fetch(
      "https://api.exchangerate.host/latest?base=USD&symbols=XAU,XAG"
    );
    const metals = await metalRes.json();

    updateMetal("gold", metals.rates.XAU);
    updateMetal("silver", metals.rates.XAG);

  } catch (err) {
    console.error("Market data error:", err);
  }
}

/* ================= HELPERS ================= */

function updateCoin(prefix, coin) {
  const priceEl = document.getElementById(`${prefix}-price`);
  const changeEl = document.getElementById(`${prefix}-change`);

  if (!priceEl || !changeEl) return;

  priceEl.textContent = `$${coin.usd.toLocaleString()}`;

  const change = coin.usd_24h_change.toFixed(2);
  changeEl.textContent = `${change}%`;
  changeEl.className = "change " + (change >= 0 ? "up" : "down");
}

function updateMetal(prefix, rate) {
  const priceEl = document.getElementById(`${prefix}-price`);
  const changeEl = document.getElementById(`${prefix}-change`);

  if (!priceEl || !changeEl) return;

  const price = (1 / rate).toFixed(2); // USD per ounce
  priceEl.textContent = `$${price}`;
  changeEl.textContent = "Live";
  changeEl.className = "change";
}

/* ================= START ================= */

loadMarket();
setInterval(loadMarket, 10000); // refresh every 10 seconds

// -----------------------------------------swiper------------------------------------------------------------------------

