<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BMI Calculator — ToolVerse</title>
<meta name="description" content="Vücut kitle indeksini boy ve kilona göre anında hesapla.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  :root{
    --bg:#FAFAFF; --surface:rgba(255,255,255,0.6); --surface-solid:#fff;
    --border:rgba(20,20,40,0.08); --text:#14142B; --muted:#6B6B85;
    --indigo:#5B5FEF; --teal:#14C8A4; --coral:#FF6B5D; --danger:#E5484D;
    --shadow:0 8px 30px rgba(20,20,60,0.07); --radius:18px;
  }
  [data-theme="dark"]{
    --bg:#0B0E1A; --surface:rgba(255,255,255,0.045); --surface-solid:#131629;
    --border:rgba(255,255,255,0.09); --text:#F2F2FA; --muted:#8D8FA8;
    --shadow:0 8px 30px rgba(0,0,0,0.35);
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  body{ background:var(--bg); color:var(--text); font-family:'Inter',sans-serif; transition:background .3s,color .3s;}
  .display{font-family:'Space Grotesk',sans-serif;}
  .mono{font-family:'JetBrains Mono',monospace;}
  a{color:inherit; text-decoration:none;}
  header{ display:flex; justify-content:space-between; align-items:center; padding:18px 6%; border-bottom:1px solid var(--border); backdrop-filter: blur(14px); position:sticky; top:0; background: color-mix(in srgb, var(--bg) 70%, transparent); z-index:10;}
  .logo{ display:flex; align-items:center; gap:10px; font-weight:700; font-size:18px;}
  .logo .dot{ width:9px; height:9px; border-radius:50%; background:linear-gradient(135deg,var(--indigo),var(--teal)); }
  .back{ font-size:13px; color:var(--muted); font-weight:500;}
  .theme-toggle{ width:40px; height:40px; border-radius:50%; background:var(--surface); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; cursor:pointer;}
  main{ max-width:600px; margin:0 auto; padding:50px 6% 100px; }
  .eyebrow{ display:inline-flex; align-items:center; gap:8px; background:var(--surface); border:1px solid var(--border); padding:6px 14px; border-radius:100px; font-size:12.5px; font-weight:600; color:var(--indigo); margin-bottom:18px;}
  h1{ font-size:32px; margin-bottom:8px; letter-spacing:-0.5px;}
  .sub{ color:var(--muted); font-size:14.5px; margin-bottom:30px;}
  .panel{ background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:28px; backdrop-filter:blur(14px); box-shadow:var(--shadow);}
  .unit-toggle{ display:flex; background:var(--surface-solid); border:1px solid var(--border); border-radius:100px; padding:4px; margin-bottom:22px; width:fit-content;}
  .unit-toggle div{ padding:8px 18px; border-radius:100px; font-size:13px; font-weight:600; cursor:pointer; color:var(--muted);}
  .unit-toggle div.active{ background:var(--indigo); color:white;}
  .field{ margin-bottom:18px;}
  .field label{ display:block; font-size:13px; font-weight:600; margin-bottom:8px;}
  .field input{
    width:100%; padding:14px 16px; border-radius:12px; border:1px solid var(--border);
    background:var(--surface-solid); color:var(--text); font-size:15px; outline:none; font-family:'JetBrains Mono',monospace;
  }
  .field input:focus{ border-color:var(--indigo); }
  .btn{ width:100%; padding:15px; border:none; border-radius:12px; font-weight:700; font-size:14.5px; cursor:pointer; background:linear-gradient(120deg,var(--indigo),var(--teal)); color:white; margin-top:8px;}
  .result{ margin-top:26px; text-align:center; display:none;}
  .result.show{ display:block; }
  .result .value{ font-size:52px; font-family:'Space Grotesk',sans-serif; font-weight:700;}
  .result .cat{ font-size:14px; font-weight:700; padding:6px 16px; border-radius:100px; display:inline-block; margin-top:8px;}
  .gauge{ height:10px; border-radius:6px; background:var(--border); margin-top:22px; position:relative; overflow:hidden;}
  .gauge-fill{ position:absolute; top:0; left:0; height:100%; border-radius:6px; background:linear-gradient(90deg,#4FA8E8,#14C8A4,#F5B942,var(--danger)); width:100%;}
  .gauge-marker{ position:absolute; top:-4px; width:3px; height:18px; background:var(--text); border-radius:2px; transition: left .3s ease;}
</style>
</head>
<body>
<header>
  <div class="logo"><div class="dot"></div><span class="display">ToolVerse</span></div>
  <a class="back" href="../index.html">← Tüm araçlar</a>
  <div class="theme-toggle" id="themeToggle">🌙</div>
</header>
<main>
  <div class="eyebrow">⚖ HESAPLAYICI</div>
  <h1 class="display">BMI Calculator</h1>
  <p class="sub">Boy ve kilona göre vücut kitle indeksini (BMI) hesapla ve kategori aralığını gör.</p>

  <div class="panel">
    <div class="unit-toggle">
      <div class="active" data-unit="metric">Metrik (kg/cm)</div>
      <div data-unit="imperial">İmperyal (lb/in)</div>
    </div>

    <div class="field">
      <label id="weightLabel">Kilo (kg)</label>
      <input type="number" id="weight" placeholder="70" inputmode="decimal">
    </div>
    <div class="field">
      <label id="heightLabel">Boy (cm)</label>
      <input type="number" id="height" placeholder="175" inputmode="decimal">
    </div>

    <button class="btn" id="calcBtn">Hesapla</button>

    <div class="result" id="result">
      <div class="value mono" id="bmiValue">0</div>
      <div class="cat" id="bmiCat">—</div>
      <div class="gauge"><div class="gauge-fill"></div><div class="gauge-marker" id="marker" style="left:0%"></div></div>
    </div>
  </div>
</main>
<script>
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  function setTheme(t){ root.setAttribute('data-theme',t); themeToggle.textContent = t==='dark' ? '☀️' : '🌙'; }
  setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  themeToggle.onclick = ()=> setTheme(root.getAttribute('data-theme')==='dark' ? 'light':'dark');

  let unit = 'metric';
  const unitToggle = document.querySelectorAll('.unit-toggle div');
  const weightLabel = document.getElementById('weightLabel');
  const heightLabel = document.getElementById('heightLabel');
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');

  unitToggle.forEach(el=>{
    el.onclick = ()=>{
      unitToggle.forEach(e=>e.classList.remove('active'));
      el.classList.add('active');
      unit = el.dataset.unit;
      if(unit === 'metric'){
        weightLabel.textContent = 'Kilo (kg)'; heightLabel.textContent = 'Boy (cm)';
        weightInput.placeholder = '70'; heightInput.placeholder = '175';
      } else {
        weightLabel.textContent = 'Kilo (lb)'; heightLabel.textContent = 'Boy (inç)';
        weightInput.placeholder = '154'; heightInput.placeholder = '69';
      }
    };
  });

  function calculate(){
    let w = parseFloat(weightInput.value);
    let h = parseFloat(heightInput.value);
    if(!w || !h || w<=0 || h<=0) return;

    let bmi;
    if(unit === 'metric'){
      bmi = w / Math.pow(h/100, 2);
    } else {
      bmi = (w / Math.pow(h, 2)) * 703;
    }

    let cat, color, pct;
    if(bmi < 18.5){ cat='Zayıf'; color='#4FA8E8'; pct = (bmi/18.5)*25; }
    else if(bmi < 25){ cat='Normal'; color='#14C8A4'; pct = 25 + ((bmi-18.5)/6.5)*25; }
    else if(bmi < 30){ cat='Fazla Kilolu'; color='#F5B942'; pct = 50 + ((bmi-25)/5)*25; }
    else { cat='Obez'; color='#E5484D'; pct = Math.min(75 + ((bmi-30)/10)*25, 100); }

    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    const catEl = document.getElementById('bmiCat');
    catEl.textContent = cat;
    catEl.style.background = color + '22';
    catEl.style.color = color;
    document.getElementById('marker').style.left = Math.min(Math.max(pct,0),100) + '%';
    document.getElementById('result').classList.add('show');
  }

  document.getElementById('calcBtn').onclick = calculate;
  [weightInput, heightInput].forEach(el => el.addEventListener('keydown', e=>{ if(e.key==='Enter') calculate(); }));
</script>
</body>
</html>
