let heft = {};
const EINHEIT = 100;
let npkDaten = {};

// daten von MongoDB laden - material npkDaten
async function ladeDaten() {
    const res = await fetch('/api/npk');
    const arr = await res.json();
    arr.forEach(d => { npkDaten[d.key] = d; });
}

// materialien - liste anzeigen
function renderListe() {
    const liste = document.getElementById('npk-liste');
    let html = '';

    Object.entries(heft).forEach(([key, anzahl]) => {
        const d = npkDaten[key];
        const gewicht = anzahl * EINHEIT;
        html += `<div class="npk-eintrag">
            <span>${anzahl}x ${d.name} (${gewicht} g)</span>
            <button class="npk-entfernen" data-key="${key}">-</button>
        </div>`;
    });

    liste.innerHTML = html;

    // button anzahl reduzieren, bei 0 entfernen
    liste.querySelectorAll('.npk-entfernen').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            heft[key]--;
            if (heft[key] <= 0) delete heft[key];
            renderListe();
            document.getElementById('npk-ergebnis').textContent = '';
        });
    });
}

// warten bis DOM bereit ist (setInterval-Polling), dann listener binden
ladeDaten().then(() => {
    const check = setInterval(() => {
        if (document.getElementById('npk-rechnen-btn')) {
            clearInterval(check);

            //rechen-button: berechnen und anzeigen lassen
            document.getElementById('npk-rechnen-btn').addEventListener('click', () => {
                if (Object.keys(heft).length === 0) {
                    document.getElementById('npk-ergebnis').textContent = 'Bitte Material auswählen.';
                    return;
                }

                // die werte werden durch alle materialien berechnet
                const nährstoffe = ['n', 'p', 'k', 'ca', 'mg', 's', 'fe', 'si', 'na'];
                const totalGewicht = Object.values(heft).reduce((summe, anzahl) => summe + anzahl * EINHEIT, 0);

                let totals = {};
                nährstoffe.forEach(key => totals[key] = 0);

                Object.entries(heft).forEach(([key, anzahl]) => {
                    const d = npkDaten[key];
                    const gewicht = anzahl * EINHEIT;
                    nährstoffe.forEach(n => {
                        totals[n] += (d[n] || 0) / 100 * gewicht;
                    });
                });

                //ergebnis formatieren
                const anzahlTeile = Object.values(heft).reduce((summe, anzahl) => summe + anzahl, 0);
                const mitWert = nährstoffe.filter(key => totals[key] > 0);
                const werteText = mitWert.map(key => {
                    const prozent = ((totals[key] / totalGewicht) * 100).toFixed(2);
                    return `${key.toUpperCase()}: ${prozent}%`;
                }).join(' &nbsp; ');

                const materialText = Object.entries(heft).map(([key, anzahl]) =>
                    `${anzahl}x ${npkDaten[key].name}`
                ).join(', ');

                const datum = new Date().toLocaleDateString('de-AT');

                //ergebnis in DOM schreiben
                document.getElementById('npk-ergebnis').innerHTML =
                    `<strong>${anzahlTeile} Teile | ${totalGewicht} g</strong><br>${werteText}` +
                    `<br><input type="text" id="npk-rezept-name" placeholder="Rezept-Name" style="margin-top:10px;padding:6px 10px;width:200px;border-radius:4px;border:1px solid #999;">` +
                    `<button id="npk-speichern" style="margin-top:10px;margin-left:8px;padding:8px 16px;background:#3a5a3a;color:#fff;border:none;border-radius:4px;cursor:pointer;">Speichern💾</button>`;

                //speicher-button: rezepte werden in tagebuch - DB eingetragen
                document.getElementById('npk-speichern').addEventListener('click', async () => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                        alert('Bitte zuerst einloggen.');
                        return;
                    }

                    const name = document.getElementById('npk-rezept-name').value.trim() || 'NPK-Rezept';

                    const res = await fetch('/api/tagebuch', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            titel: name,
                            text: `Datum: ${datum}\nMaterialien: ${materialText}\nGesamt: ${anzahlTeile} Teile | ${totalGewicht} g\n` +
                                mitWert.map(k => `${k.toUpperCase()}: ${((totals[k] / totalGewicht) * 100).toFixed(2)}%`).join('\n')
                        })
                    });

                    if (res.ok) {
                        document.getElementById('npk-speichern').textContent = 'Gespeichert!';
                        document.getElementById('npk-speichern').disabled = true;
                    } else {
                        alert('Fehler beim Speichern');
                    }
                });
            });

            //fügt material zum heft -
            document.querySelectorAll('.abfall').forEach(div => {
                div.addEventListener('click', () => {
                    const key = div.dataset.key;
                    heft[key] = (heft[key] || 0) + 1;
                    renderListe();
                });
            });
        }
    }, 50);
});   