// public/rasen.js

const bar      = document.getElementById('mischung-bar');
const handle1  = document.getElementById('handle-1');
const handle2  = document.getElementById('handle-2');
const barSand  = document.getElementById('bar-sand');
const barLehm  = document.getElementById('bar-lehm');
const barErde  = document.getElementById('bar-erde');

// Start: 33% Sand, 33% Lehm, 34% Erde
let h1 = 33;  // Position Handle1 = Sand-Anteil
let h2 = 66;  // Position Handle2 = Sand + Lehm

function updateBar() {
    const sand = h1;
    const lehm = h2 - h1;
    const erde = 100 - h2;

    handle1.style.left = h1 + '%';
    handle2.style.left = h2 + '%';

    barSand.style.width  = sand + '%';
    barLehm.style.left   = sand + '%';
    barLehm.style.width  = lehm + '%';
    barErde.style.left   = (sand + lehm) + '%';
    barErde.style.width  = erde + '%';

    document.getElementById('sand-wert').textContent = sand + '%';
    document.getElementById('lehm-wert').textContent = lehm + '%';
    document.getElementById('erde-wert').textContent = erde + '%';

    bewerte(sand, lehm, erde);
}

// ← Drag
let dragging = null;

function getPos(e) {
    const rect = bar.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    return Math.max(0, Math.min(100, (x / rect.width) * 100));
}

function onMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const pct = Math.round(getPos(e));

    if (dragging === 1) {
        // Handle1: darf nicht an Handle2 rankommen
        h1 = Math.max(5, Math.min(pct, h2 - 5));
    } else {
        // Handle2: darf nicht an Handle1 rankommen
        h2 = Math.max(h1 + 5, Math.min(pct, 95));
    }
    updateBar();
}

function onUp() {
    dragging = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
}

function onDown(which) {
    return function(e) {
        e.preventDefault();
        dragging = which;
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
    };
}

handle1.addEventListener('mousedown', onDown(1));
handle2.addEventListener('mousedown', onDown(2));
handle1.addEventListener('touchstart', onDown(1), { passive: false });
handle2.addEventListener('touchstart', onDown(2), { passive: false });

// bewertung
function bewerte(s, l, e) {
    const box = document.getElementById('mischung-bewertung');
    const hinweise = [];
    let farbe = '#d4edda';
    let titel = '✓ Gute Rasenmischung';

    // sand
    if (s < 15) {
        hinweise.push('❌ Zu wenig Sand (< 15%) → Boden verdichtet sich, schlechte Drainage, Staunässe.');
        farbe = '#f8d7da'; titel = '❌ Zu wenig Drainage';
    } else if (s < 25) {
        hinweise.push('⚠️ Etwas wenig Sand (15-25%) → Drainage könnte besser sein.');
        if (farbe === '#d4edda') { farbe = '#fff3cd'; titel = '⚠️ Etwas wenig Sand'; }
    } else if (s <= 50) {
        hinweise.push('✓ Guter Sandanteil → gute Drainage und Belüftung.');
    } else if (s <= 65) {
        hinweise.push('⚠️ Viel Sand (> 50%) → trocknet schnell aus, speichert wenig Nährstoffe.');
        if (farbe === '#d4edda') { farbe = '#fff3cd'; titel = '⚠️ Zu sandig'; }
    } else {
        hinweise.push('❌ Sehr viel Sand (> 65%) → speichert kaum Wasser, Rasen vertrocknet.');
        farbe = '#f8d7da'; titel = '❌ Zu sandig';
    }

    // LEHM
    if (l < 15) {
        hinweise.push('❌ Zu wenig Lehm (< 15%) → kaum Nährstoff- und Wasserbindung.');
        if (farbe === '#d4edda') { farbe = '#fff3cd'; titel = '⚠️ Zu wenig Lehm'; }
    } else if (l < 25) {
        hinweise.push('⚠️ Etwas wenig Lehm (15-25%) → Nährstoffbindung könnte besser sein.');
        if (farbe === '#d4edda') { farbe = '#fff3cd'; titel = '⚠️ Etwas wenig Lehm'; }
    } else if (l <= 45) {
        hinweise.push('✓ Guter Lehmanteil → bindet Wasser und Nährstoffe, gibt Struktur.');
    } else if (l <= 60) {
        hinweise.push('⚠️ Viel Lehm (> 45%) → wird bei Trockenheit rissig, bei Nässe matschig.');
        if (farbe === '#d4edda') { farbe = '#fff3cd'; titel = '⚠️ Zu lehmig'; }
    } else {
        hinweise.push('❌ Sehr viel Lehm (> 60%) → rissig, schwer zu bearbeiten, schlechte Durchlüftung.');
        farbe = '#f8d7da'; titel = '❌ Zu lehmig';
    }

    // ERDE
    if (e < 10) {
        hinweise.push('❌ Zu wenig Humus (< 10%) → Bodenleben fehlt, Rasen wird blass.');
        if (farbe === '#d4edda') { farbe = '#fff3cd'; titel = '⚠️ Zu wenig Humus'; }
    } else if (e < 20) {
        hinweise.push('⚠️ Etwas wenig Humus (10-20%) → Nährstoffversorgung könnte besser sein.');
        if (farbe === '#d4edda') { farbe = '#fff3cd'; titel = '⚠️ Etwas wenig Humus'; }
    } else if (e <= 40) {
        hinweise.push('✓ Guter Humusanteil → fördert Bodenleben, speichert Nährstoffe.');
    } else if (e <= 55) {
        hinweise.push('⚠️ Viel Humus (> 40%) → kann sich verdichten, Wurzeln bekommen wenig Sauerstoff.');
        if (farbe === '#d4edda') { farbe = '#fff3cd'; titel = '⚠️ Zu humusreich'; }
    } else {
        hinweise.push('❌ Sehr viel Humus (> 55%) → Boden wird dicht, Wurzeln erstickt.');
        farbe = '#f8d7da'; titel = '❌ Zu humusreich';
    }

    // IDEAL
    if (s >= 25 && s <= 45 && l >= 25 && l <= 45 && e >= 20 && e <= 40) {
        titel = '✓ Ideale Rasenmischung (sandiger Lehm)';
        hinweise.unshift('✓ Perfektes Verhältnis - sandiger Lehm, ideal für Rasen.');
        farbe = '#d4edda';
    }

    box.style.background = farbe;
    box.innerHTML = `<strong>${titel}</strong><ul style="margin:10px 0 0 16px;padding:0;">${hinweise.map(h => `<li style="margin:4px 0;">${h}</li>`).join('')}</ul>`;
}

// Init
updateBar();

// ← Speichern
document.getElementById('rasen-speichern').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) { alert('Bitte zuerst einloggen.'); return; }

    const sand = h1;
    const lehm = h2 - h1;
    const erde = 100 - h2;
    const name  = document.getElementById('rasen-rezept-name').value.trim() || 'Rasenerde-Mischung';
    const datum = new Date().toLocaleDateString('de-AT');
    const bewertung = document.getElementById('mischung-bewertung').innerText;

    const res = await fetch('/api/tagebuch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            titel: name,
            text: `Datum: ${datum}\nMischung: ${sand}% Sand / ${lehm}% Lehm / ${erde}% Erde\n\nBewertung:\n${bewertung}`
        })
    });

    if (res.ok) {
        document.getElementById('rasen-speichern').textContent = '✓ Gespeichert!';
        document.getElementById('rasen-speichern').disabled = true;
        document.getElementById('rasen-speichern').style.background = '#27ae60';
    } else {
        alert('Fehler beim Speichern');
    }
});   