// public/volumen.js

document.getElementById('volumen-berechnen')?.addEventListener('click', () => {

    // werte aus den 3 eingabefeldern holen
    const eingaben = document.querySelectorAll('.eingabe-volumen');
    const hoehe    = document.querySelector('.eingabe-volumen-2');
    const einheit  = document.getElementById('einheit').value;

    const l = parseFloat(eingaben[0].value) || 0;
    const b = parseFloat(eingaben[1].value) || 0;
    const h = parseFloat(hoehe.value) || 0;

    if (l === 0 || b === 0 || h === 0) {
        document.getElementById('volumen-ergebnis').innerHTML =
            '<p style="color:#c0392b;">Bitte alle drei Maße eingeben.</p>';
        return;
    }

    //  umrechnung auf cm
    const faktoren = { mm: 0.1, cm: 1, dm: 10, m: 100 };
    const f = faktoren[einheit];

    const volumenCm3 = l * f * b * f * h * f;
    const liter      = volumenCm3 / 1000;

    const cm3ProEinheit = { mm: 1, cm: 1, dm: 1000, m: 1000000 };
    const einheitName   = { mm: 'cm³', cm: 'cm³', dm: 'dm³', m: 'm³' };

    const volumenWert    = volumenCm3 / cm3ProEinheit[einheit];
    const volumenEinheit = einheitName[einheit];

    // ergebnis rendern
    document.getElementById('volumen-ergebnis').innerHTML = `
        <div style="max-width:400px;margin:20px auto;padding:16px;background:#d4edda;border-radius:8px;text-align:center;">
            <strong>${l} ${einheit} x ${b} ${einheit} x ${h} ${einheit}</strong><br><br>
            Volumen: <strong>${volumenWert.toFixed(2)} ${volumenEinheit}</strong><br>   
            ≈ <strong>${liter.toFixed(2)} Liter</strong>
            <div style="margin-top:16px;display:flex;gap:8px;justify-content:center;align-items:center;">
                <input type="text" id="volumen-rezept-name" placeholder="Rezept-Name"
                    style="padding:6px 10px;border-radius:4px;border:1px solid #999;width:160px;">
                <button id="volumen-speichern"
                    style="padding:8px 16px;background:#3a5a3a;color:#fff;border:none;border-radius:4px;cursor:pointer;">
                    Speichern
                </button>
            </div>
        </div>
    `;

    //  speichern-button
    document.getElementById('volumen-speichern').addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        if (!token) { alert('Bitte zuerst einloggen.'); return; }

        const name  = document.getElementById('volumen-rezept-name').value.trim() || 'Volumen-Berechnung';
        const datum = new Date().toLocaleDateString('de-AT');

        const res = await fetch('/api/tagebuch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                titel: name,
            text: `Datum: ${datum}\nMaße: ${l} ${einheit} x ${b} ${einheit} x ${h} ${einheit}\nVolumen: ${volumenWert.toFixed(2)} ${volumenEinheit} ≈ ${liter.toFixed(2)} Liter`   
            })
        });

        if (res.ok) {
            document.getElementById('volumen-speichern').textContent = ' Gespeichert!';
            document.getElementById('volumen-speichern').disabled = true;
            document.getElementById('volumen-speichern').style.background = '#27ae60';
        } else {
            alert('Fehler beim Speichern');
        }
    });
});   