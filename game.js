/* 学习奇遇记 · 主游戏逻辑 */
(function () {
  'use strict';

  var STORAGE_KEY = 'study_quest_v1';
  var HERO_HP = 3;

  /* ---------------- 怪兽造型（累计星星解锁） ---------------- */

  var SKINS = [
    { at: 0, name: '原味小怪', acc: 'none' },
    { at: 8, name: '派对尖帽', acc: 'party' },
    { at: 18, name: '酷酷墨镜', acc: 'shades' },
    { at: 30, name: '皇冠加冕', acc: 'crown' },
    { at: 45, name: '幸运光环', acc: 'halo' },
    { at: 60, name: '魔法披风', acc: 'cape' },
    { at: 80, name: '战神铠甲', acc: 'armor' }
  ];

  var state = { view: 'home', subjectId: null, chapterId: null, levelId: null, run: null };

  var app = document.getElementById('app');
  var overlay = document.getElementById('overlay');
  var hudTitle = document.getElementById('hudTitle');
  var hudKicker = document.getElementById('hudKicker');
  var btnBack = document.getElementById('btnBack');
  var btnSound = document.getElementById('btnSound');
  var totalStarsEl = document.getElementById('totalStars');

  /* ---------------- 图标 ---------------- */

  function icon(inner, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + inner + '</svg>';
  }

  var ICON = {
    back: icon('<path d="M15 18l-6-6 6-6"/>'),
    sound: icon('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 6a8 8 0 0 1 0 12"/>'),
    mute: icon('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 5 6"/><path d="m21 9-5 6"/>'),
    lock: icon('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    play: icon('<path d="M8 5v14l11-7z"/>', ' fill="currentColor" stroke="none"'),
    book: icon('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'),
    calc: icon('<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="8" y2="12"/><line x1="12" y1="12" x2="12" y2="12"/><line x1="16" y1="12" x2="16" y2="12"/><line x1="8" y1="18" x2="16" y2="18"/>'),
    star: icon('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>', ' fill="currentColor" stroke="none"')
  };

  /* ---------------- 卡通角色 ---------------- */

  function heroSVG() {
    return '<svg viewBox="0 0 120 140" aria-hidden="true">' +
      '<ellipse cx="60" cy="132" rx="32" ry="7" fill="rgba(60,110,80,.16)"/>' +
      '<rect x="42" y="100" width="11" height="24" rx="5.5" fill="#5A6B7B"/>' +
      '<rect x="67" y="100" width="11" height="24" rx="5.5" fill="#5A6B7B"/>' +
      '<ellipse cx="60" cy="90" rx="31" ry="25" fill="#F2F8FF"/>' +
      '<circle cx="33" cy="82" r="13" fill="#F2F8FF"/>' +
      '<circle cx="87" cy="82" r="13" fill="#F2F8FF"/>' +
      '<circle cx="44" cy="100" r="13" fill="#F2F8FF"/>' +
      '<circle cx="76" cy="100" r="13" fill="#F2F8FF"/>' +
      '<circle cx="30" cy="42" r="12" fill="#FFFFFF"/>' +
      '<circle cx="90" cy="42" r="12" fill="#FFFFFF"/>' +
      '<circle cx="43" cy="28" r="11" fill="#FFFFFF"/>' +
      '<circle cx="77" cy="28" r="11" fill="#FFFFFF"/>' +
      '<ellipse cx="60" cy="52" rx="32" ry="29" fill="#FFFFFF"/>' +
      '<path d="M27 36 q-13 -11 -1 -20 q10 -6 12 7" fill="#E8C07A" stroke="#C9A052" stroke-width="2"/>' +
      '<path d="M93 36 q13 -11 1 -20 q-10 -6 -12 7" fill="#E8C07A" stroke="#C9A052" stroke-width="2"/>' +
      '<ellipse cx="60" cy="58" rx="23" ry="20" fill="#FFE9D6"/>' +
      '<circle cx="51" cy="54" r="3.6" fill="#2B333B"/>' +
      '<circle cx="69" cy="54" r="3.6" fill="#2B333B"/>' +
      '<circle cx="52.4" cy="52.6" r="1.2" fill="#fff"/>' +
      '<circle cx="70.4" cy="52.6" r="1.2" fill="#fff"/>' +
      '<path d="M53 64 q7 6 14 0" stroke="#2B333B" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="43" cy="62" rx="4.5" ry="3" fill="#FFB4A8" opacity=".85"/>' +
      '<ellipse cx="77" cy="62" rx="4.5" ry="3" fill="#FFB4A8" opacity=".85"/>' +
      '</svg>';
  }

  function skinLayer(acc, boss) {
    if (acc === 'party') {
      return '<path d="M45 44 L60 6 L75 44 Z" fill="#FF8A65" stroke="#E2603C" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M51 31 h18" stroke="#FFE0B2" stroke-width="3.4" stroke-linecap="round"/>' +
        '<path d="M48 38 h24" stroke="#FFE0B2" stroke-width="3.4" stroke-linecap="round"/>' +
        '<circle cx="60" cy="6" r="5" fill="#FFD54F" stroke="#E0A800" stroke-width="1.6"/>';
    }
    if (acc === 'shades') {
      return '<rect x="30" y="53" width="29" height="19" rx="7" fill="#243B4A"/>' +
        '<rect x="61" y="53" width="29" height="19" rx="7" fill="#243B4A"/>' +
        '<rect x="56" y="59" width="8" height="5" rx="2" fill="#243B4A"/>' +
        '<path d="M35 58 h8" stroke="rgba(255,255,255,.55)" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M66 58 h8" stroke="rgba(255,255,255,.55)" stroke-width="3" stroke-linecap="round"/>';
    }
    if (acc === 'crown' && !boss) {
      return '<path d="M34 36 l5 -20 l10 13 l11 -20 l11 20 l10 -13 l5 20z" fill="#FFD75E" stroke="#D9A21B" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<circle cx="60" cy="21" r="2.6" fill="#F0715C"/>';
    }
    if (acc === 'halo') {
      return '<ellipse cx="60" cy="20" rx="27" ry="9" fill="none" stroke="#FFD75E" stroke-width="5"/>' +
        '<circle cx="26" cy="28" r="2.6" fill="#FFE9A6"/>' +
        '<circle cx="94" cy="28" r="2.6" fill="#FFE9A6"/>';
    }
    if (acc === 'cape') {
      return '<path d="M20 96 q-8 4 -6 34 q8 6 22 -2 q8 -24 24 -30 q16 6 24 30 q14 8 22 2 q2 -30 -6 -34 q-10 -8 -30 -14 q-18 -8 -28 -8 q-10 0 -28 8 q-20 6 -30 14z" fill="#7E57C2" opacity=".85"/>' +
        '<path d="M60 78 q-14 8 -28 20" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none"/>';
    }
    if (acc === 'armor') {
      return '<path d="M28 76 q-2 -10 8 -14 l14 -6 l14 6 q10 4 8 14 q-2 18 -22 22 q-20 -4 -22 -22z" fill="#B0BEC5" stroke="#546E7A" stroke-width="2"/>' +
        '<circle cx="60" cy="86" r="5" fill="#FFD75E" stroke="#D9A21B" stroke-width="1.5"/>';
    }
    return '';
  }

  function monsterSVG(color, boss, acc) {
    var crown = boss
      ? '<path d="M30 34 l6 -22 l10 14 l14 -22 l14 22 l10 -14 l6 22z" fill="#FFD75E" stroke="#D9A21B" stroke-width="2.5" stroke-linejoin="round"/>'
      : '';
    var horns = boss
      ? ''
      : '<path d="M37 42 l-13 -22 l20 10z" fill="' + color + '" stroke="rgba(0,0,0,.14)" stroke-width="2" stroke-linejoin="round"/>' +
        '<path d="M83 42 l13 -22 l-20 10z" fill="' + color + '" stroke="rgba(0,0,0,.14)" stroke-width="2" stroke-linejoin="round"/>';
    return '<svg viewBox="0 0 120 132" aria-hidden="true">' +
      '<ellipse cx="60" cy="124" rx="34" ry="7" fill="rgba(60,80,60,.16)"/>' +
      crown + horns +
      '<path d="M22 96 q-16 2 -15 -14 q1 -12 12 -9" fill="' + color + '"/>' +
      '<path d="M98 96 q16 2 15 -14 q-1 -12 -12 -9" fill="' + color + '"/>' +
      '<ellipse cx="60" cy="76" rx="41" ry="38" fill="' + color + '"/>' +
      '<ellipse cx="60" cy="88" rx="30" ry="23" fill="rgba(255,255,255,.15)"/>' +
      '<circle cx="45" cy="64" r="12" fill="#fff"/>' +
      '<circle cx="75" cy="64" r="12" fill="#fff"/>' +
      '<circle cx="48" cy="67" r="6" fill="#22303A"/>' +
      '<circle cx="72" cy="67" r="6" fill="#22303A"/>' +
      '<circle cx="49.8" cy="65" r="1.8" fill="#fff"/>' +
      '<circle cx="73.8" cy="65" r="1.8" fill="#fff"/>' +
      '<path d="M42 90 q18 16 36 0" stroke="#22303A" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      '<path d="M48 90 l4 8 l4 -8z M68 90 l4 8 l4 -8z" fill="#fff"/>' +
      '<ellipse cx="30" cy="84" rx="6" ry="4" fill="rgba(255,255,255,.28)"/>' +
      '<ellipse cx="90" cy="84" rx="6" ry="4" fill="rgba(255,255,255,.28)"/>' +
      skinLayer(acc, boss) +
      '</svg>';
  }

  /* ---------------- 存档 ---------------- */

  function loadProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && p.levels) {
          if (typeof p.total !== 'number') {
            p.total = 0;
            for (var k in p.levels) {
              if (p.levels[k] && p.levels[k].stars) p.total += p.levels[k].stars;
            }
          }
          return p;
        }
      }
    } catch (e) { }
    return { levels: {}, total: 0 };
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { }
  }

  var progress = loadProgress();

  function starsOf(id) {
    var p = progress.levels[id];
    return p && p.stars ? p.stars : 0;
  }

  function isPassed(id) {
    var p = progress.levels[id];
    return !!(p && p.passed);
  }

  function totalStars() {
    return progress.total || 0;
  }

  function skinIndex(stars) {
    var idx = 0;
    for (var i = 0; i < SKINS.length; i++) {
      if (stars >= SKINS[i].at) idx = i;
    }
    return idx;
  }

  function currentSkin() {
    return SKINS[skinIndex(totalStars())];
  }

  function skinBetween(before, after) {
    for (var i = 0; i < SKINS.length; i++) {
      if (SKINS[i].at > before && SKINS[i].at <= after) return SKINS[i];
    }
    return null;
  }

  function renderStarHud(gain) {
    totalStarsEl.textContent = totalStars();
    if (!gain) return;
    var box = totalStarsEl.parentNode;
    box.classList.remove('is-bump');
    void box.offsetWidth;
    box.classList.add('is-bump');
    var s = document.createElement('span');
    s.className = 'hud__plus';
    s.textContent = '+' + gain;
    box.appendChild(s);
    window.setTimeout(function () {
      if (s.parentNode) s.parentNode.removeChild(s);
    }, 1100);
  }

  function saveLevel(id, stars) {
    var prev = progress.levels[id] || { stars: 0, passed: false };
    var newStars = Math.max(prev.stars || 0, stars);
    progress.levels[id] = { stars: newStars, passed: true };
    var gain = newStars - (prev.stars || 0);
    if (gain > 0) progress.total = (progress.total || 0) + gain;
    saveProgress();
    if (gain > 0) renderStarHud(gain);
    return { total: progress.total, gain: gain };
  }

  /* ---------------- 工具 ---------------- */

  function rand(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  /* 中文数字与乘法口诀（二年级上册用） */

  var CN_DIGITS = '零一二三四五六七八九';

  function cnNum(n) {
    if (n < 10) return CN_DIGITS.charAt(n);
    if (n < 20) return '十' + (n % 10 ? CN_DIGITS.charAt(n % 10) : '');
    return CN_DIGITS.charAt(Math.floor(n / 10)) + '十' + (n % 10 ? CN_DIGITS.charAt(n % 10) : '');
  }

  function kouJue(a, b) {
    var s = a < b ? a : b;
    var l = a < b ? b : a;
    var p = a * b;
    return cnNum(s) + cnNum(l) + (p < 10 ? '得' : '') + cnNum(p);
  }

  function starHTML(n) {
    var out = '';
    for (var i = 1; i <= 3; i++) {
      out += '<i class="' + (i <= n ? 'on' : '') + '">★</i>';
    }
    return out;
  }

  /* ---------------- 顶栏 ---------------- */

  function paintSound() {
    btnSound.innerHTML = Sound.isMuted() ? ICON.mute : ICON.sound;
    btnSound.classList.toggle('is-muted', Sound.isMuted());
  }

  btnBack.innerHTML = ICON.back;
  paintSound();
  renderStarHud(0);

  btnBack.addEventListener('click', function () {
    Sound.tap();
    goBack();
  });

  btnSound.addEventListener('click', function () {
    Sound.setMuted(!Sound.isMuted());
    paintSound();
    if (!Sound.isMuted()) Sound.tap();
  });

  document.addEventListener('pointerdown', function () {
    Sound.unlock();
  }, { once: true });

  function goBack() {
    if (state.view === 'battle') {
      if (state.run && state.run.raf) cancelAnimationFrame(state.run.raf);
      hideOverlay();
      renderChapter(state.chapterId);
    } else if (state.view === 'chapter') {
      renderHome();
    }
  }

  /* ================= 题目生成引擎 ================= */

  function genQuestion(level, used) {
    var mode = level.mode;
    var q = null;

    if (mode === 'time_conv') q = genTimeConv();
    else if (mode === 'time_calc') q = genTimeCalc();
    else if (mode === 'add_easy') q = genAddNoCarry();
    else if (mode === 'add_hard') q = genAddCarry();
    else if (mode === 'sub_easy') q = genSubNoCarry();
    else if (mode === 'sub_hard') q = genSubBorrow();
    else if (mode === 'length_unit') q = genLengthUnit();
    else if (mode === 'km_unit') q = genKmUnit();
    else if (mode === 'ton_unit') q = genTonUnit();
    else if (mode === 'times_div') q = genTimesDiv();
    else if (mode === 'times_mul') q = genTimesMul();
    else if (mode === 'mul_ten') q = genMulTen();
    else if (mode === 'mul_nocarry') q = genMulNoCarry();
    else if (mode === 'mul_carry') q = genMulCarry();
    else if (mode === 'mul_boss') q = genMulBoss();
    else if (mode === 'shape_know') q = genShapeKnow();
    else if (mode === 'perimeter') q = genPerimeter();
    else if (mode === 'frac_half') q = genFracHalf();
    else if (mode === 'frac_calc') q = genFracCalc();
    else if (mode === 'frac_boss') q = genFracBoss();
    else if (mode === 'pinyin' || mode === 'pinyin_boss') q = genPinyin(level);
    else if (mode === 'synonym') q = genSynonym(used);
    else if (mode === 'antonym') q = genAntonym(used);
    else if (mode === 'duoyin' || mode === 'duoyin_boss') q = genDuoyin(used);
    else if (mode === 'poem_next') q = genPoemNext(used);
    else if (mode === 'poem_boss') q = genPoemBoss(used);
    else if (mode === 'idiom') q = genIdiom(used);
    else if (mode === 'sentence') q = genSentence(used);
    else q = { text: '1 + 1 =', answer: 2, options: [1, 2, 3, 4], kind: 'mul' };

    if (!q.options) {
      q.options = buildOptions(q);
    }
    used.push(q.text + q.answer);
    return q;
  }

  function buildOptions(q) {
    var ans = q.answer;
    var pool = q.distractors || [ans + 1, ans - 1, ans + 2, ans - 2, ans + 10, ans - 10];
    shuffle(pool);
    var out = [ans];
    for (var i = 0; i < pool.length && out.length < 4; i++) {
      var v = pool[i];
      if (v !== ans && out.indexOf(v) === -1 && (typeof v === 'string' || v > 0)) out.push(v);
    }
    var extra = 1;
    while (out.length < 4) {
      var nv = typeof ans === 'number' ? ans + extra : ans + '_' + extra;
      if (out.indexOf(nv) === -1) out.push(nv);
      extra += 1;
    }
    return shuffle(out);
  }

  /* ---- 数学：认识时间（二上：时、分） ---- */

  function genTimeConv() {
    var types = [
      function () {
        var h = rand(1, 6);
        return { text: h + ' 时 = ? 分', answer: h * 60, kind: 'num', unit: '分' };
      },
      function () {
        var m = rand(2, 5) * 60;
        return { text: m + ' 分 = ? 时', answer: m / 60, kind: 'num', unit: '时' };
      },
      function () {
        var n = rand(1, 11);
        return { text: '分针指向 ' + n + '，是 ? 分', answer: n * 5, kind: 'num', unit: '分' };
      },
      function () {
        return { text: '半时 = ? 分', answer: 30, kind: 'num', unit: '分' };
      }
    ];
    return types[rand(0, types.length - 1)]();
  }

  function genTimeCalc() {
    var types = [
      function () {
        var a = rand(5, 45);
        var b = rand(5, 55 - a);
        return { text: a + ' 分 + ' + b + ' 分 = ? 分', answer: a + b, kind: 'num', unit: '分' };
      },
      function () {
        var a = rand(25, 59);
        var b = rand(5, 20);
        return { text: a + ' 分 - ' + b + ' 分 = ? 分', answer: a - b, kind: 'num', unit: '分' };
      },
      function () {
        var h = rand(1, 5);
        var m = rand(5, 55);
        return { text: h + ' 时 ' + m + ' 分 = ? 分', answer: h * 60 + m, kind: 'num', unit: '分' };
      },
      function () {
        var h = rand(1, 8);
        var m1 = rand(10, 50);
        var m2 = rand(5, 40);
        var total = h * 60 + m1 + m2;
        var hh = Math.floor(total / 60);
        var mm = total % 60;
        return {
          text: h + '时' + m1 + '分 再过 ' + m2 + '分 是 ?',
          answer: hh + '时' + mm + '分',
          kind: 'text',
          options: shuffle([
            hh + '时' + mm + '分',
            (hh + 1) + '时' + mm + '分',
            hh + '时' + ((mm + 10) % 60) + '分',
            (hh - 1 < 0 ? 0 : hh - 1) + '时' + mm + '分'
          ])
        };
      }
    ];
    return types[rand(0, types.length - 1)]();
  }

  /* ---- 数学：100以内的加法（二上） ---- */

  function genAddNoCarry() {
    var t = rand(0, 2);
    if (t === 0) {
      var ones = rand(1, 8);
      var a1 = rand(1, 8) * 10 + ones;
      var b1 = rand(1, 9 - ones);
      return { text: a1 + ' + ' + b1 + ' =', answer: a1 + b1, kind: 'num' };
    }
    if (t === 1) {
      var a2 = rand(1, 4) * 10;
      var b2 = rand(1, 5) * 10;
      return { text: a2 + ' + ' + b2 + ' =', answer: a2 + b2, kind: 'num' };
    }
    var a3 = rand(1, 7) * 10 + rand(1, 9);
    var b3 = rand(1, Math.floor((99 - a3) / 10)) * 10;
    return { text: a3 + ' + ' + b3 + ' =', answer: a3 + b3, kind: 'num' };
  }

  function genAddCarry() {
    var t = rand(0, 1);
    if (t === 0) {
      var ones = rand(2, 9);
      var a = rand(1, 7) * 10 + ones;
      var b = rand(10 - ones, 9);
      return { text: a + ' + ' + b + ' =', answer: a + b, kind: 'num' };
    }
    for (var i = 0; i < 60; i++) {
      var x = rand(11, 88);
      var y = rand(11, 99 - x);
      if (y >= 11 && (x % 10) + (y % 10) >= 10) {
        return { text: x + ' + ' + y + ' =', answer: x + y, kind: 'num' };
      }
    }
    return { text: '38 + 24 =', answer: 62, kind: 'num' };
  }

  /* ---- 数学：100以内的减法（二上） ---- */

  function genSubNoCarry() {
    var t = rand(0, 2);
    if (t === 0) {
      var ones = rand(2, 9);
      var a1 = rand(1, 8) * 10 + ones;
      var b1 = rand(1, ones);
      return { text: a1 + ' - ' + b1 + ' =', answer: a1 - b1, kind: 'num' };
    }
    if (t === 1) {
      var tens = rand(3, 9);
      var a2 = tens * 10 + rand(0, 9);
      var b2 = rand(1, tens - 1) * 10;
      return { text: a2 + ' - ' + b2 + ' =', answer: a2 - b2, kind: 'num' };
    }
    var tens3 = rand(4, 9);
    var a3 = tens3 * 10;
    var b3 = rand(1, tens3 - 1) * 10;
    return { text: a3 + ' - ' + b3 + ' =', answer: a3 - b3, kind: 'num' };
  }

  function genSubBorrow() {
    var t = rand(0, 1);
    if (t === 0) {
      var b1 = rand(2, 9);
      var a1 = rand(2, 9) * 10 + rand(0, b1 - 1);
      return { text: a1 + ' - ' + b1 + ' =', answer: a1 - b1, kind: 'num' };
    }
    for (var i = 0; i < 60; i++) {
      var x = rand(21, 99);
      var y = rand(11, x - 1);
      if ((x % 10) < (y % 10)) {
        return { text: x + ' - ' + y + ' =', answer: x - y, kind: 'num' };
      }
    }
    return { text: '62 - 38 =', answer: 24, kind: 'num' };
  }

  /* ---- 数学：长度单位（二上：厘米和米） ---- */

  function genLengthUnit() {
    var types = [
      function () {
        var n = rand(2, 9);
        return { text: n + ' 米 = ? 厘米', answer: n * 100, kind: 'num', unit: '厘米' };
      },
      function () {
        var n = rand(2, 9) * 100;
        return { text: n + ' 厘米 = ? 米', answer: n / 100, kind: 'num', unit: '米' };
      },
      function () {
        var a = rand(3, 9);
        var b = rand(2, 9);
        return {
          text: '一条线段长 ' + a + ' 厘米，另一条长 ' + b + ' 厘米，一共长 ? 厘米',
          answer: a + b, kind: 'num', unit: '厘米'
        };
      },
      function () {
        var a = rand(5, 9);
        var b = rand(1, a - 1);
        return {
          text: '绳子长 ' + a + ' 厘米，用去 ' + b + ' 厘米，还剩 ? 厘米',
          answer: a - b, kind: 'num', unit: '厘米'
        };
      },
      function () {
        return { text: '1 米 = ? 厘米', answer: 100, kind: 'num', unit: '厘米' };
      },
      function () {
        var c = rand(2, 9);
        return { text: '用尺子从刻度 0 量到刻度 ' + c + '，长 ? 厘米', answer: c, kind: 'num', unit: '厘米' };
      }
    ];
    return types[rand(0, types.length - 1)]();
  }

  function genKmUnit() {
    var types = [
      function () {
        return { text: '1 米 = ? 厘米', answer: 100, kind: 'num', unit: '厘米' };
      },
      function () {
        var n = rand(2, 9);
        return { text: n + ' 米 = ? 厘米', answer: n * 100, kind: 'num', unit: '厘米' };
      },
      function () {
        var n = rand(2, 9) * 100;
        return { text: n + ' 厘米 = ? 米', answer: n / 100, kind: 'num', unit: '米' };
      },
      function () {
        return { text: '一张桌子长约 1 米，合 ? 厘米', answer: 100, kind: 'num', unit: '厘米' };
      },
      function () {
        return {
          text: '一条跳绳长 3 米，比 250 厘米（ ）', answer: '长',
          options: ['长', '短', '一样长', '不能比'], kind: 'text'
        };
      }
    ];
    return types[rand(0, types.length - 1)]();
  }

  function genTonUnit() {
    var types = [
      function () {
        var n = rand(2, 9);
        return { text: n + ' 米 = ? 厘米', answer: n * 100, kind: 'num', unit: '厘米' };
      },
      function () {
        var n = rand(2, 6) * 100;
        return { text: n + ' 厘米 = ? 米', answer: n / 100, kind: 'num', unit: '米' };
      },
      function () {
        var a = rand(2, 7);
        var b = rand(2, 7);
        return { text: a + ' 米 + ' + b + ' 米 = ? 米', answer: a + b, kind: 'num', unit: '米' };
      },
      function () {
        return {
          text: '1 米 ○ 100 厘米，○ 里应填', answer: '=',
          options: ['=', '>', '<', '不能比较'], kind: 'text'
        };
      },
      function () {
        return {
          text: '2 米 ○ 180 厘米，○ 里应填', answer: '>',
          options: ['>', '<', '=', '不能比较'], kind: 'text'
        };
      }
    ];
    return types[rand(0, types.length - 1)]();
  }

  /* ---- 数学：表内乘法（一）2~6的口诀 ---- */

  function genTimesDiv() {
    var t = rand(0, 2);
    var a = rand(2, 4);
    var b = rand(2, 9);
    if (t === 0) {
      return { text: a + ' × ' + b + ' =', answer: a * b, kind: 'num' };
    }
    if (t === 1) {
      return { text: '( ) × ' + a + ' = ' + a * b, answer: b, kind: 'num' };
    }
    var ans = kouJue(a, b);
    var opts = [ans];
    var pool = [kouJue(2, 3), kouJue(3, 4), kouJue(4, 5), kouJue(5, 6),
      kouJue(2, 8), kouJue(6, 6), kouJue(3, 7), kouJue(4, 8), kouJue(2, 9)];
    shuffle(pool);
    for (var i = 0; i < pool.length && opts.length < 4; i++) {
      if (opts.indexOf(pool[i]) === -1) opts.push(pool[i]);
    }
    return { text: a + ' × ' + b + ' 用哪句口诀？', answer: ans, options: shuffle(opts), kind: 'text' };
  }

  function genTimesMul() {
    var t = rand(0, 2);
    var a = rand(5, 6);
    var b = rand(2, 9);
    if (t === 0) {
      return { text: a + ' × ' + b + ' =', answer: a * b, kind: 'num' };
    }
    if (t === 1) {
      return { text: '( ) × ' + a + ' = ' + a * b, answer: b, kind: 'num' };
    }
    return { text: '每盘有 ' + a + ' 个苹果，' + b + ' 盘一共有 ? 个', answer: a * b, kind: 'num', unit: '个' };
  }

  /* ---- 数学：表内乘法（二）7~9的口诀 ---- */

  function genMulTen() {
    var t = rand(0, 2);
    var b = rand(2, 9);
    if (t === 0) {
      return { text: '7 × ' + b + ' =', answer: 7 * b, kind: 'num' };
    }
    if (t === 1) {
      return { text: '7 × ( ) = ' + 7 * b, answer: b, kind: 'num' };
    }
    var w = rand(2, 6);
    return { text: '一个星期有 7 天，' + w + ' 个星期一共有 ? 天', answer: 7 * w, kind: 'num', unit: '天' };
  }

  function genMulNoCarry() {
    var t = rand(0, 2);
    var b = rand(2, 9);
    if (t === 0) {
      return { text: '8 × ' + b + ' =', answer: 8 * b, kind: 'num' };
    }
    if (t === 1) {
      return { text: '8 × ( ) = ' + 8 * b, answer: b, kind: 'num' };
    }
    var n = rand(2, 5);
    return { text: '一只螃蟹有 8 条腿，' + n + ' 只螃蟹一共有 ? 条腿', answer: 8 * n, kind: 'num', unit: '条' };
  }

  function genMulCarry() {
    var t = rand(0, 2);
    var b = rand(2, 9);
    if (t === 0) {
      return { text: '9 × ' + b + ' =', answer: 9 * b, kind: 'num' };
    }
    if (t === 1) {
      return { text: '9 × ( ) = ' + 9 * b, answer: b, kind: 'num' };
    }
    var m = rand(2, 6);
    return { text: '每盒有 9 块糖，' + m + ' 盒一共有 ? 块', answer: 9 * m, kind: 'num', unit: '块' };
  }

  function genMulBoss() {
    var t = rand(0, 2);
    var a = rand(7, 9);
    var b = rand(2, 9);
    if (t === 0) {
      return { text: a + ' × ' + b + ' =', answer: a * b, kind: 'num' };
    }
    if (t === 1) {
      return { text: '( ) × ' + a + ' = ' + a * b, answer: b, kind: 'num' };
    }
    var e = rand(7, 9);
    var f = rand(2, 5);
    var g = rand(2, 9);
    return { text: e + ' × ' + f + ' + ' + g + ' =', answer: e * f + g, kind: 'num' };
  }

  /* ---- 数学：角的初步认识 ---- */

  function genShapeKnow() {
    var types = [
      { text: '一个角有几个顶点？', answer: '1个', options: ['1个', '2个', '3个', '4个'], kind: 'text' },
      { text: '一个角有几条边？', answer: '2条', options: ['1条', '2条', '3条', '4条'], kind: 'text' },
      {
        text: '把角的两条边画得更长一些，这个角会（ ）',
        answer: '不变', options: ['不变', '变大', '变小', '消失'], kind: 'text'
      },
      { text: '数学书的封面有几个角？', answer: '4个', options: ['1个', '2个', '3个', '4个'], kind: 'text' },
      {
        text: '角的大小和什么有关？',
        answer: '两条边张开的大小', options: ['两条边张开的大小', '边的长短', '顶点的位置', '纸的颜色'], kind: 'text'
      },
      { text: '用一副三角尺可以画出（ ）', answer: '直角', options: ['直角', '圆角', '弯角', '球角'], kind: 'text' }
    ];
    return Object.assign({}, types[rand(0, types.length - 1)]);
  }

  function genPerimeter() {
    var types = [
      { text: '比直角小的角叫什么角？', answer: '锐角', options: ['锐角', '钝角', '直角', '平角'], kind: 'text' },
      { text: '比直角大的角叫什么角？', answer: '钝角', options: ['钝角', '锐角', '直角', '平角'], kind: 'text' },
      { text: '三角尺上最大的那个角是（ ）', answer: '直角', options: ['直角', '锐角', '钝角', '圆角'], kind: 'text' },
      { text: '长方形的四个角都是（ ）', answer: '直角', options: ['直角', '锐角', '钝角', '平角'], kind: 'text' },
      { text: '一个三角形里最多有几个直角？', answer: '1个', options: ['1个', '2个', '3个', '4个'], kind: 'text' },
      { text: '钟面上 3 时整，时针和分针组成的角是（ ）', answer: '直角', options: ['直角', '锐角', '钝角', '平角'], kind: 'text' },
      { text: '一张正方形纸有几个直角？', answer: '4个', options: ['1个', '2个', '3个', '4个'], kind: 'text' }
    ];
    return Object.assign({}, types[rand(0, types.length - 1)]);
  }

  /* ---- 数学：数学广角 · 搭配（一） ---- */

  function genFracHalf() {
    var types = [
      function () {
        return { text: '用 1、2、3 组成没有重复数字的两位数，一共能组成几个？', answer: 6, kind: 'num', unit: '个' };
      },
      function () {
        return { text: '用 4、7 组成没有重复数字的两位数，一共能组成几个？', answer: 2, kind: 'num', unit: '个' };
      },
      function () {
        return {
          text: '用 5、6、7、8 中的两个数字组成没有重复数字的两位数，一共能组成几个？',
          answer: 12, kind: 'num', unit: '个'
        };
      },
      function () {
        return {
          text: '用 2、5 组成的两位数中，最大的一个是（ ）',
          answer: 52, options: [52, 25, 55, 22], kind: 'num'
        };
      }
    ];
    return types[rand(0, types.length - 1)]();
  }

  function genFracCalc() {
    var types = [
      function () {
        return {
          text: '有 3 件上衣和 2 条裤子，一件上衣配一条裤子，一共有几种搭配？',
          answer: 6, kind: 'num', unit: '种'
        };
      },
      function () {
        return {
          text: '有 2 顶帽子和 3 条围巾，一顶帽子配一条围巾，一共有几种搭配？',
          answer: 6, kind: 'num', unit: '种'
        };
      },
      function () {
        return { text: '从 3 种水果中选 2 种，一共有几种选法？', answer: 3, kind: 'num', unit: '种' };
      },
      function () {
        return { text: '小明有 4 件上衣和 3 条裤子，一共有几种穿法？', answer: 12, kind: 'num', unit: '种' };
      },
      function () {
        return { text: '三个人见面，每两人握一次手，一共要握几次？', answer: 3, kind: 'num', unit: '次' };
      }
    ];
    return types[rand(0, types.length - 1)]();
  }

  function genFracBoss() {
    var types = [
      function () {
        return { text: '用 6、8、9 组成没有重复数字的两位数，一共能组成几个？', answer: 6, kind: 'num', unit: '个' };
      },
      function () {
        return { text: '有 3 件上衣和 3 条裤子，一共有几种搭配？', answer: 9, kind: 'num', unit: '种' };
      },
      function () {
        return { text: '用 1、2、3 可以组成多少个不同的两位数？', answer: 6, kind: 'num', unit: '个' };
      },
      function () {
        return { text: '四个小朋友两两握手，一共要握几次？', answer: 6, kind: 'num', unit: '次' };
      },
      function () {
        return {
          text: '用 3、5 组成的两位数从小到大排，第二个数是（ ）',
          answer: 53, options: [53, 35, 33, 55], kind: 'num'
        };
      }
    ];
    return types[rand(0, types.length - 1)]();
  }

  /* ---- 语文：拼音 ---- */

  function genPinyin(level) {
    var unit = level.unit || 0;
    var pool = GameData.PINYIN_POOL[unit] || GameData.PINYIN_POOL[0];
    var pick = pool[rand(0, pool.length - 1)];
    var wrongs = [];
    for (var i = 0; i < pool.length && wrongs.length < 3; i++) {
      if (pool[i].zi !== pick.zi) wrongs.push(pool[i].pinyin);
    }
    if (wrongs.length < 3) wrongs.push(pick.distractor);
    var opts = [pick.pinyin].concat(wrongs.slice(0, 3));
    shuffle(opts);
    return { text: '选出「' + pick.zi + '」的正确读音', answer: pick.pinyin, options: opts, kind: 'pinyin', zi: pick.zi };
  }

  /* ---- 语文：近义词 ---- */

  function genSynonym(used) {
    var pool = GameData.SYNONYM_POOL;
    var pick;
    for (var t = 0; t < 40; t++) {
      pick = pool[rand(0, pool.length - 1)];
      if (used.indexOf(pick.word) === -1) break;
    }
    used.push(pick.word);
    return {
      text: '「' + pick.word + '」的近义词是？',
      answer: pick.answer,
      options: pick.options.slice(),
      kind: 'text'
    };
  }

  /* ---- 语文：反义词 ---- */

  function genAntonym(used) {
    var pool = GameData.ANTONYM_POOL;
    var pick;
    for (var t = 0; t < 40; t++) {
      pick = pool[rand(0, pool.length - 1)];
      if (used.indexOf(pick.word) === -1) break;
    }
    used.push(pick.word);
    return {
      text: '「' + pick.word + '」的反义词是？',
      answer: pick.answer,
      options: pick.options.slice(),
      kind: 'text'
    };
  }

  /* ---- 语文：多音字 ---- */

  function genDuoyin(used) {
    var pool = GameData.DUOYIN_POOL;
    var pick;
    for (var t = 0; t < 40; t++) {
      pick = pool[rand(0, pool.length - 1)];
      if (used.indexOf(pick.zi + pick.word) === -1) break;
    }
    used.push(pick.zi + pick.word);
    return {
      text: '「' + pick.word + '」中「' + pick.zi + '」读？',
      answer: pick.answer,
      options: pick.options.slice(),
      kind: 'pinyin'
    };
  }

  /* ---- 语文：古诗 ---- */

  function genPoemNext(used) {
    var pool = GameData.POEM_POOL;
    var pick;
    for (var t = 0; t < 40; t++) {
      pick = pool[rand(0, pool.length - 1)];
      if (used.indexOf(pick.title) === -1) break;
    }
    used.push(pick.title);
    var idx = rand(0, pick.lines.length - 2);
    var cur = pick.lines[idx];
    var next = pick.lines[idx + 1];
    var wrongs = [];
    for (var i = 0; i < pool.length && wrongs.length < 3; i++) {
      if (pool[i].title !== pick.title) {
        var wl = pool[i].lines[rand(0, pool[i].lines.length - 1)];
        if (wrongs.indexOf(wl) === -1) wrongs.push(wl);
      }
    }
    var opts = [next].concat(wrongs.slice(0, 3));
    shuffle(opts);
    return {
      text: '《' + pick.title + '》' + cur + '，下一句是？',
      answer: next,
      options: opts,
      kind: 'poem'
    };
  }

  function genPoemBoss(used) {
    var pool = GameData.POEM_POOL;
    var pick;
    for (var t = 0; t < 40; t++) {
      pick = pool[rand(0, pool.length - 1)];
      if (used.indexOf(pick.title + 'boss') === -1) break;
    }
    used.push(pick.title + 'boss');
    var idx = rand(0, pick.lines.length - 1);
    var line = pick.lines[idx];
    var chars = line.split('');
    var blankIdx = rand(0, chars.length - 2);
    if (blankIdx < 0) blankIdx = 0;
    var answer = chars[blankIdx];
    var before = chars.slice(0, blankIdx).join('');
    var after = chars.slice(blankIdx + 1).join('');
    var wrongs = [];
    var allChars = '山水风云月花鸟雪天日春秋冬红黄蓝绿青白';
    for (var i = 0; i < allChars.length && wrongs.length < 3; i++) {
      if (allChars[i] !== answer) wrongs.push(allChars[i]);
    }
    shuffle(wrongs);
    var opts = [answer].concat(wrongs.slice(0, 3));
    shuffle(opts);
    return {
      text: '《' + pick.title + '》' + before + '？' + after,
      answer: answer,
      options: opts,
      kind: 'poem_blank'
    };
  }

  /* ---- 语文：成语 ---- */

  function genIdiom(used) {
    var pool = GameData.IDIOM_POOL;
    var pick;
    for (var t = 0; t < 40; t++) {
      pick = pool[rand(0, pool.length - 1)];
      if (used.indexOf(pick.idiom) === -1) break;
    }
    used.push(pick.idiom);
    var chars = pick.idiom.split('');
    var display = chars.slice();
    display[pick.blank] = '？';
    return {
      text: '补全成语：' + display.join(''),
      answer: pick.answer,
      options: pick.options.slice(),
      kind: 'text'
    };
  }

  /* ---- 语文：句子 ---- */

  function genSentence(used) {
    var pool = GameData.SENTENCE_POOL;
    var pick;
    for (var t = 0; t < 40; t++) {
      pick = pool[rand(0, pool.length - 1)];
      if (used.indexOf(pick.question + pick.answer) === -1) break;
    }
    used.push(pick.question + pick.answer);
    return {
      text: pick.question,
      answer: pick.answer,
      options: pick.options.slice(),
      kind: 'sentence'
    };
  }

  /* ================= 首页（科目选择） ================= */

  function renderHome() {
    state.view = 'home';
    state.subjectId = null;
    state.chapterId = null;
    state.levelId = null;
    state.run = null;
    hudKicker.textContent = '学习奇遇记';
    hudTitle.textContent = '选择科目';
    btnBack.hidden = true;
    renderStarHud(0);

    var totalLv = GameData.totalLevels();
    var passed = 0;
    var allChs = GameData.MATH_CHAPTERS.concat(GameData.CHINESE_CHAPTERS);
    for (var i = 0; i < allChs.length; i++) {
      for (var j = 0; j < allChs[i].levels.length; j++) {
        if (isPassed(allChs[i].levels[j].id)) passed++;
      }
    }

    app.innerHTML =
      '<section class="home rise">' +
        '<div class="home__banner">' +
          '<div class="home__hero">' + heroSVG() + '</div>' +
          '<div class="home__info">' +
            '<h2 class="home__h">学习奇遇记</h2>' +
            '<p class="home__sub">打败怪兽，收集星星，解锁新造型！</p>' +
          '</div>' +
        '</div>' +
        '<div class="home__progress">' +
          '<span>已通关 <b>' + passed + '</b> / ' + totalLv + ' 关</span>' +
          '<span class="home__bar"><i style="width:' + Math.round(passed / totalLv * 100) + '%"></i></span>' +
        '</div>' +
        '<div class="subj-list">' +
          GameData.SUBJECTS.map(function (s, i) {
            var chs = GameData.getChapters(s.id);
            var lvCount = 0;
            var lvPassed = 0;
            for (var k = 0; k < chs.length; k++) {
              lvCount += chs[k].levels.length;
              for (var j = 0; j < chs[k].levels.length; j++) {
                if (isPassed(chs[k].levels[j].id)) lvPassed++;
              }
            }
            return '<div class="subj-card rise" style="--i:' + (i + 1) + ';--c:' + s.color + ';--bg:' + s.bg + '" data-subj="' + s.id + '">' +
              '<div class="subj-card__emoji">' + s.emoji + '</div>' +
              '<div class="subj-card__body">' +
                '<h3 class="subj-card__name">' + s.name + '</h3>' +
                '<p class="subj-card__desc">' + s.subtitle + ' · ' + chs.length + ' 个章节</p>' +
                '<div class="subj-card__stars"><i>★</i><span>' + lvPassed + ' / ' + lvCount + ' 关</span></div>' +
              '</div>' +
              '<button class="subj-card__go" type="button" data-go-subj="' + s.id + '">' +
                ICON.play + '<span>开始</span>' +
              '</button>' +
            '</div>';
          }).join('') +
        '</div>' +
        rewardsHTML() +
      '</section>';

    Array.prototype.forEach.call(app.querySelectorAll('[data-go-subj]'), function (b) {
      b.addEventListener('click', function () {
        if (b.disabled) return;
        Sound.bigBtn();
        renderChapterList(b.getAttribute('data-go-subj'));
      });
    });
  }

  /* ================= 章节地图 ================= */

  function renderChapterList(subjectId) {
    state.view = 'chapterList';
    state.subjectId = subjectId;
    state.chapterId = null;
    state.run = null;
    var subj = GameData.getSubject(subjectId);
    hudKicker.textContent = subj.name + ' · ' + subj.subtitle;
    hudTitle.textContent = '选择章节';
    btnBack.hidden = false;
    renderStarHud(0);

    var chapters = GameData.getChapters(subjectId);
    var html = chapters.map(function (ch, idx) {
      var prevPassed = idx === 0 ? true : ch.levels.some(function () {
        var prevCh = chapters[idx - 1];
        return prevCh.levels.every(function (l) { return isPassed(l.id); });
      });
      var locked = idx > 0 && !chapters[idx - 1].levels.every(function (l) { return isPassed(l.id); });
      var stars = 0;
      var totalLvStars = ch.levels.length * 3;
      for (var i = 0; i < ch.levels.length; i++) {
        stars += starsOf(ch.levels[i].id);
      }
      var sampleColor = ch.levels[0].colors[0];

      return '<div class="ch-card rise' + (locked ? ' is-locked' : '') + '" style="--i:' + (idx + 1) + ';--c:' + sampleColor + '">' +
        '<div class="ch-card__head">' +
          '<div class="ch-card__mon">' + monsterSVG(sampleColor, ch.levels[ch.levels.length - 1].boss, currentSkin().acc) + '</div>' +
          '<div class="ch-card__info">' +
            '<div class="ch-card__tag">第 ' + (idx + 1) + ' 章</div>' +
            '<h3 class="ch-card__name">' + ch.name + '</h3>' +
            '<p class="ch-card__desc">' + ch.concept + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="ch-card__foot">' +
          '<span class="ch-card__lv">' + ch.levels.length + ' 关</span>' +
          '<span class="ch-card__stars"><i>★</i><b>' + stars + '</b>/' + totalLvStars + '</span>' +
          '<button class="ch-card__go" type="button" data-go-ch="' + ch.id + '"' + (locked ? ' disabled' : '') + '>' +
            (locked ? ICON.lock : ICON.play + '<span>进入</span>') +
          '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    app.innerHTML =
      '<section class="chapter-list rise" style="--theme:' + subj.color + '">' +
        '<div class="ch-list__grid">' + html + '</div>' +
      '</section>';

    Array.prototype.forEach.call(app.querySelectorAll('[data-go-ch]'), function (b) {
      b.addEventListener('click', function () {
        if (b.disabled) return;
        Sound.bigBtn();
        renderChapter(b.getAttribute('data-go-ch'));
      });
    });
  }

  /* ================= 单章关卡地图 ================= */

  function renderChapter(chapterId) {
    state.view = 'chapter';
    state.chapterId = chapterId;
    state.run = null;
    var ch = GameData.getChapter(chapterId);
    var subj = GameData.getSubject(ch.subject);
    hudKicker.textContent = subj.name + ' · 第' + (GameData.getChapters(ch.subject).indexOf(ch) + 1) + '章';
    hudTitle.textContent = ch.name;
    btnBack.hidden = false;
    renderStarHud(0);

    var passedCount = 0;
    for (var i = 0; i < ch.levels.length; i++) {
      if (isPassed(ch.levels[i].id)) passedCount++;
    }
    var pct = Math.round(passedCount / ch.levels.length * 100);

    app.innerHTML =
      '<section class="lv-map rise">' +
        '<div class="lv-map__banner">' +
          '<div class="lv-map__mon">' + monsterSVG(ch.levels[0].colors[0], ch.levels[ch.levels.length - 1].boss, currentSkin().acc) + '</div>' +
          '<div class="lv-map__info">' +
            '<h2 class="lv-map__h">' + ch.name + '</h2>' +
            '<p class="lv-map__sub">' + ch.concept + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="lv-map__progress">' +
          '<span>已通关 <b>' + passedCount + '</b> / ' + ch.levels.length + '</span>' +
          '<span class="lv-map__bar"><i style="width:' + pct + '%"></i></span>' +
        '</div>' +
        '<ul class="lv-list">' + ch.levels.map(function (lv, i) {
          var prev = i === 0 ? null : ch.levels[i - 1];
          var locked = prev ? !isPassed(prev.id) : false;
          var n = starsOf(lv.id);
          return '<li class="lv-card rise' + (locked ? ' is-locked' : '') + '" style="--i:' + (i + 1) + '">' +
            '<div class="lv-card__mon">' + monsterSVG(lv.colors[0], lv.boss, currentSkin().acc) + '</div>' +
            '<div class="lv-card__body">' +
              '<div class="lv-card__name">第 ' + (i + 1) + ' 关 · ' + lv.name + '</div>' +
              '<div class="lv-card__desc">' + lv.concept + '</div>' +
              '<div class="lv-card__stars">' + starHTML(n) + '</div>' +
            '</div>' +
            '<button class="lv-card__go" type="button" data-enter="' + lv.id + '"' + (locked ? ' disabled' : '') + '>' +
              (locked ? ICON.lock : ICON.play + '<span>开打</span>') +
            '</button>' +
          '</li>';
        }).join('') + '</ul>' +
      '</section>';

    Array.prototype.forEach.call(app.querySelectorAll('[data-enter]'), function (b) {
      b.addEventListener('click', function () {
        if (b.disabled) return;
        Sound.bigBtn();
        startLevel(b.getAttribute('data-enter'));
      });
    });
  }

  /* ================= 奖励面板 ================= */

  function rewardsHTML() {
    var total = totalStars();
    var idx = skinIndex(total);
    var next = SKINS[idx + 1];
    var base = SKINS[idx].at;
    var pct = next ? Math.min(100, Math.round((total - base) / (next.at - base) * 100)) : 100;

    var list = SKINS.map(function (sk, i) {
      var on = i <= idx;
      return '<li class="rw' + (on ? ' is-on' : '') + '">' +
        '<span class="rw__mon">' + monsterSVG('#7BC96F', false, sk.acc) + '</span>' +
        '<span class="rw__name">' + sk.name + '</span>' +
        '<span class="rw__need">' + (on ? '已解锁' : sk.at + ' ★') + '</span>' +
      '</li>';
    }).join('');

    return '<div class="rewards rise" style="--i:3">' +
      '<div class="rewards__head">' +
        '<h3 class="rewards__h">怪兽造型</h3>' +
        '<span class="rewards__count"><i>★</i><b>' + total + '</b></span>' +
      '</div>' +
      '<p class="rewards__hint">' + (next
        ? '再攒 <b>' + (next.at - total) + '</b> 颗星星，解锁「' + next.name + '」'
        : '全部造型都解锁啦，太厉害了！') + '</p>' +
      '<div class="rewards__bar"><i style="width:' + pct + '%"></i></div>' +
      '<ul class="rewards__list">' + list + '</ul>' +
    '</div>';
  }

  /* ================= 战斗 ================= */

  function curMonster() {
    var r = state.run;
    var i = Math.min(r.monIndex, r.level.names.length - 1);
    return { name: r.level.names[i], color: r.level.colors[i], boss: r.level.boss };
  }

  function startLevel(id) {
    if (state.run && state.run.raf) cancelAnimationFrame(state.run.raf);
    Sound.unlock();
    Sound.click();

    var info = GameData.getLevel(id);
    if (!info) return;
    var lv = info.level;
    state.view = 'battle';
    state.levelId = id;
    state.run = {
      level: lv,
      monIndex: 0,
      monsterHp: lv.hp,
      heroHp: HERO_HP,
      combo: 0,
      maxCombo: 0,
      used: [],
      q: null,
      locked: true,
      paused: true,
      raf: 0,
      deadline: 0,
      totalTime: lv.time * 1000
    };

    hideOverlay();
    renderBattle();
    requestAnimationFrame(tick);
    window.setTimeout(function () {
      if (state.run && state.run.level === lv) startQuestion();
    }, 520);
  }

  function renderBattle() {
    var r = state.run;
    hudKicker.textContent = '战斗中';
    hudTitle.textContent = r.level.name;
    btnBack.hidden = false;

    app.innerHTML =
      '<section class="battle rise">' +
        '<div class="hud-row">' +
          '<div class="who who--hero">' +
            '<span class="who__name">喜羊羊</span>' +
            '<span class="hearts" id="hearts"></span>' +
          '</div>' +
          '<div class="who who--monster">' +
            '<span class="who__name" id="monName"></span>' +
            '<span class="pips" id="pips"></span>' +
          '</div>' +
        '</div>' +
        '<div class="stage" id="stage">' +
          '<div class="cloud c1"></div><div class="cloud c2"></div><div class="cloud c3"></div>' +
          '<div class="stage__hero" id="heroEl">' + heroSVG() + '</div>' +
          '<div class="stage__monster" id="monsterEl"></div>' +
          '<div class="combo" id="combo" hidden></div>' +
          '<div class="fx" id="fx"></div>' +
        '</div>' +
        '<div class="sign" id="sign">准备…</div>' +
        '<div class="timer"><i id="timerFill"></i></div>' +
        '<div class="orbs" id="orbs"></div>' +
      '</section>';

    renderMonster();
    updateHearts();
    updateCombo();
  }

  function renderMonster() {
    var r = state.run;
    var el = document.getElementById('monsterEl');
    if (!el) return;
    var m = curMonster();
    el.className = 'stage__monster enter';
    el.innerHTML = monsterSVG(m.color, m.boss, currentSkin().acc);
    var nameEl = document.getElementById('monName');
    if (nameEl) nameEl.textContent = m.name;
    updatePips();
    Sound.monsterIn();
    window.setTimeout(function () { el.classList.remove('enter'); }, 520);
  }

  function updateHearts() {
    var el = document.getElementById('hearts');
    if (!el || !state.run) return;
    var r = state.run;
    var html = '';
    for (var i = 0; i < HERO_HP; i++) {
      html += '<i class="heart' + (i < r.heroHp ? '' : ' off') + '">♥</i>';
    }
    el.innerHTML = html;
  }

  function updatePips() {
    var el = document.getElementById('pips');
    if (!el || !state.run) return;
    var r = state.run;
    var html = '';
    for (var i = 0; i < r.level.hp; i++) {
      html += '<i class="' + (i < r.monsterHp ? '' : 'off') + '"></i>';
    }
    el.innerHTML = html;
  }

  function updateCombo() {
    var el = document.getElementById('combo');
    if (!el || !state.run) return;
    var r = state.run;
    if (r.combo >= 2) {
      el.hidden = false;
      el.textContent = '连击 x' + r.combo;
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
      if (r.combo === 2 || r.combo === 3 || r.combo === 5 || r.combo % 5 === 0) {
        Sound.combo();
      }
    } else {
      el.hidden = true;
    }
  }

  /* ================= 题目流程 ================= */

  function startQuestion() {
    var r = state.run;
    if (!r) return;
    r.q = genQuestion(r.level, r.used);

    var heroEl = document.getElementById('heroEl');
    if (heroEl) heroEl.classList.remove('cheer', 'attack', 'hurt');

    var sign = document.getElementById('sign');
    var q = r.q;
    var displayText = q.text;
    var hasSlot = displayText.indexOf('?') !== -1;
    var slotHtml = '<span class="sign__slot" id="signSlot">?</span>';

    if (hasSlot) {
      sign.innerHTML =
        '<span class="sign__eq">' + displayText.replace('?', slotHtml) + '</span>';
    } else {
      sign.innerHTML =
        '<span class="sign__eq sign__eq--full">' + displayText + '</span>';
    }
    sign.classList.remove('pop');
    void sign.offsetWidth;
    sign.classList.add('pop');

    renderOrbs(r.q);

    r.locked = false;
    r.paused = false;
    r.totalTime = r.level.time * 1000;
    r.deadline = performance.now() + r.totalTime;

    var fill = document.getElementById('timerFill');
    if (fill) {
      fill.style.width = '100%';
      fill.classList.remove('is-low');
    }
  }

  function renderOrbs(q) {
    var box = document.getElementById('orbs');
    if (!box) return;
    var isChinese = q.kind === 'pinyin' || q.kind === 'poem' || q.kind === 'poem_blank' || q.kind === 'sentence' || q.kind === 'text' || q.kind === 'frac';
    box.className = 'orbs' + (isChinese ? ' orbs--text' : '');
    box.innerHTML = q.options.map(function (v) {
      return '<button class="orb' + (isChinese ? ' orb--text' : '') + '" type="button" data-v="' + String(v).replace(/"/g, '&quot;') + '">' + v + '</button>';
    }).join('');
    Array.prototype.forEach.call(box.querySelectorAll('.orb'), function (b) {
      b.addEventListener('click', function () {
        answer(b.getAttribute('data-v'), b);
      });
    });
  }

  function tick(now) {
    var r = state.run;
    if (!r || state.view !== 'battle') return;
    if (!r.paused && !r.locked) {
      var left = r.deadline - now;
      if (left <= 0) {
        onTimeout();
      } else {
        var pct = left / r.totalTime;
        var fill = document.getElementById('timerFill');
        if (fill) {
          fill.style.width = (pct * 100).toFixed(2) + '%';
          fill.classList.toggle('is-low', pct < 0.3);
        }
        var secLeft = Math.ceil(left / 1000);
        if (secLeft <= 3 && secLeft !== r._lastTickSec) {
          r._lastTickSec = secLeft;
          Sound.tickUrgent();
        }
      }
    }
    r.raf = requestAnimationFrame(tick);
  }

  /* ================= 作答 ================= */

  function answer(v, btn) {
    var r = state.run;
    if (!r || r.locked) return;
    r.locked = true;
    r.paused = true;
    Sound.select();

    var correct = String(v) === String(r.q.answer);
    var orbs = app.querySelectorAll('.orb');
    Array.prototype.forEach.call(orbs, function (b) { b.disabled = true; });
    btn.classList.add(correct ? 'good' : 'bad');
    fillSlot(v, correct ? 'ok' : 'bad');
    if (!correct) {
      Array.prototype.forEach.call(orbs, function (b) {
        if (String(b.getAttribute('data-v')) === String(r.q.answer)) b.classList.add('good');
      });
    }

    if (correct) onCorrect();
    else onWrong();
  }

  function fillSlot(value, kind) {
    var slot = document.getElementById('signSlot');
    if (!slot) return;
    slot.textContent = value;
    slot.className = 'sign__slot ' + (kind || '');
    void slot.offsetWidth;
    slot.classList.add('filled');
  }

  function onCorrect() {
    var r = state.run;
    Sound.correct();
    Sound.applauseLight();
    var hero = document.getElementById('heroEl');
    var mon = document.getElementById('monsterEl');
    hero.classList.add('attack');

    window.setTimeout(function () {
      mon.classList.add('hit');
      Sound.hit();
      floatText(mon, '-1', 'dmg');
      r.monsterHp -= 1;
      updatePips();
      r.combo += 1;
      if (r.combo > r.maxCombo) r.maxCombo = r.combo;
      updateCombo();

      window.setTimeout(function () {
        mon.classList.remove('hit');
        hero.classList.remove('attack');
        hero.classList.add('cheer');
        if (r.monsterHp <= 0) { defeatMonster(); return; }
        window.setTimeout(function () {
          hero.classList.remove('cheer');
          startQuestion();
        }, 300);
      }, 520);
    }, 260);
  }

  function onWrong() {
    var r = state.run;
    Sound.wrong();
    var hero = document.getElementById('heroEl');
    var mon = document.getElementById('monsterEl');
    var stage = document.getElementById('stage');
    mon.classList.add('headShake');

    window.setTimeout(function () {
      Sound.counter();
      stage.classList.add('shake');
      hero.classList.add('hurt');
      r.heroHp -= 1;
      updateHearts();
      floatText(hero, '-1', 'hp');
      r.combo = 0;
      updateCombo();

      window.setTimeout(function () {
        fillSlot(r.q.answer, 'ok');
      }, 220);

      window.setTimeout(function () {
        stage.classList.remove('shake');
        hero.classList.remove('hurt');
        mon.classList.remove('headShake');
        if (r.heroHp <= 0) defeat();
        else startQuestion();
      }, 780);
    }, 280);
  }

  function onTimeout() {
    var r = state.run;
    if (!r || r.locked) return;
    r.locked = true;
    r.paused = true;
    var orbs = app.querySelectorAll('.orb');
    Array.prototype.forEach.call(orbs, function (b) {
      b.disabled = true;
      if (String(b.getAttribute('data-v')) === String(r.q.answer)) b.classList.add('good');
    });
    fillSlot(r.q.answer, 'ok');
    onWrong();
  }

  function defeatMonster() {
    var r = state.run;
    var mon = document.getElementById('monsterEl');
    mon.classList.add('die');
    Sound.hit();

    window.setTimeout(function () {
      r.monIndex += 1;
      if (r.monIndex >= r.level.monsters) {
        victory();
        return;
      }
      r.monsterHp = r.level.hp;
      r.combo = 0;
      updateCombo();
      renderMonster();
      window.setTimeout(function () { startQuestion(); }, 480);
    }, 700);
  }

  /* ================= 飘字 ================= */

  function floatText(target, text, kind) {
    var fx = document.getElementById('fx');
    var stage = document.getElementById('stage');
    if (!fx || !stage || !target) return;
    var sr = stage.getBoundingClientRect();
    var tr = target.getBoundingClientRect();
    var s = document.createElement('span');
    s.className = 'float ' + (kind || '');
    s.textContent = text;
    s.style.left = (tr.left - sr.left + tr.width / 2) + 'px';
    s.style.top = (tr.top - sr.top + tr.height * 0.32) + 'px';
    fx.appendChild(s);
    window.setTimeout(function () {
      if (s.parentNode) s.parentNode.removeChild(s);
    }, 980);
  }

  /* ================= 胜负 ================= */

  function stopTimer() {
    var r = state.run;
    if (!r) return;
    r.paused = true;
    r.locked = true;
    if (r.raf) { cancelAnimationFrame(r.raf); r.raf = 0; }
  }

  function victory() {
    var r = state.run;
    if (!r) return;
    stopTimer();

    var stars = r.heroHp >= 3 ? 3 : (r.heroHp === 2 ? 2 : 1);
    var before = totalStars();
    var result = saveLevel(r.level.id, stars);
    var after = result.total;
    var gain = result.gain;
    var newSkin = skinBetween(before, after);

    Sound.victory();
    Sound.applause();
    window.setTimeout(function () { Sound.say('太棒了，过关啦！'); }, 650);
    if (newSkin) {
      window.setTimeout(function () { Sound.unlockSkin(); }, 1000);
      window.setTimeout(function () { Sound.say('解锁新造型，' + newSkin.name + '！'); }, 1700);
    }

    var info = GameData.getLevel(r.level.id);
    var ch = info.chapter;
    var nextLv = null;
    for (var i = 0; i < ch.levels.length - 1; i++) {
      if (ch.levels[i].id === r.level.id) { nextLv = ch.levels[i + 1]; break; }
    }

    overlay.innerHTML =
      confettiHTML() +
      '<div class="overlay__card">' +
        '<div class="ov-stars">' +
          [1, 2, 3].map(function (i) {
            return '<span class="ov-star ' + (i <= stars ? 'on' : '') + '" style="--d:' + (i * 0.16) + 's">★</span>';
          }).join('') +
        '</div>' +
        '<h2 class="ov-title">过关啦！</h2>' +
        '<p class="ov-msg">' +
          (stars === 3 ? '满血通关，太厉害了！' : '还剩 ' + r.heroHp + ' 颗心，再打一次能拿三颗星哦。') +
        '</p>' +
        '<div class="ov-gain">' +
          '<span class="ov-gain__plus">+' + gain + ' ★</span>' +
          '<span class="ov-gain__all">累计 ' + after + ' ★</span>' +
        '</div>' +
        (newSkin
          ? '<div class="ov-unlock">' + monsterSVG('#7BC96F', false, newSkin.acc) +
            '<div class="ov-unlock__txt"><b>解锁新造型</b><span>' + newSkin.name + '</span></div></div>'
          : '') +
        '<div class="ov-actions">' +
          (nextLv ? '<button class="btn btn--primary" type="button" id="ovNext">下一关</button>' : '') +
          '<button class="btn btn--ghost" type="button" id="ovMap">回到章节</button>' +
        '</div>' +
      '</div>';
    overlay.hidden = false;

    if (nextLv) {
      document.getElementById('ovNext').addEventListener('click', function () { Sound.bigBtn(); startLevel(nextLv.id); });
    }
    document.getElementById('ovMap').addEventListener('click', function () {
      Sound.tap();
      renderChapter(ch.id);
    });
  }

  function defeat() {
    var r = state.run;
    if (!r) return;
    stopTimer();
    Sound.wrong();
    window.setTimeout(function () { Sound.say('没关系，再试一次！'); }, 300);

    var info = GameData.getLevel(r.level.id);
    var ch = info.chapter;

    overlay.innerHTML =
      '<div class="overlay__card">' +
        '<h2 class="ov-title ov-title--bad">被打败了</h2>' +
        '<p class="ov-msg">怪兽太强了，再来一次一定行！</p>' +
        '<div class="ov-actions">' +
          '<button class="btn btn--primary" type="button" id="ovRetry">再来一次</button>' +
          '<button class="btn btn--ghost" type="button" id="ovMap">回到章节</button>' +
        '</div>' +
      '</div>';
    overlay.hidden = false;

    document.getElementById('ovRetry').addEventListener('click', function () {
      Sound.bigBtn();
      startLevel(r.level.id);
    });
    document.getElementById('ovMap').addEventListener('click', function () {
      Sound.tap();
      renderChapter(ch.id);
    });
  }

  function confettiHTML() {
    var colors = ['#FFC12E', '#63D6A6', '#4A9BF5', '#F0715C', '#B58BE8'];
    var out = '<div class="confetti">';
    for (var i = 0; i < 26; i++) {
      out += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;background:' + colors[i % colors.length] +
        ';animation-duration:' + (1.4 + Math.random() * 1.4).toFixed(2) + 's;animation-delay:' +
        (Math.random() * 0.5).toFixed(2) + 's"></i>';
    }
    out += '</div>';
    return out;
  }

  function hideOverlay() {
    overlay.hidden = true;
    overlay.innerHTML = '';
  }

  /* ================= 返回键处理 ================= */

  btnBack.onclick = function () {
    Sound.tap();
    if (state.view === 'battle') {
      if (state.run && state.run.raf) cancelAnimationFrame(state.run.raf);
      hideOverlay();
      var info = state.levelId ? GameData.getLevel(state.levelId) : null;
      if (info) renderChapter(info.chapter.id);
      else renderHome();
    } else if (state.view === 'chapter') {
      var info2 = state.chapterId ? GameData.getChapter(state.chapterId) : null;
      if (info2) renderChapterList(info2.subject);
      else renderHome();
    } else if (state.view === 'chapterList') {
      renderHome();
    } else {
      renderHome();
    }
  };

  /* ================= 启动 ================= */

  renderHome();
})();
