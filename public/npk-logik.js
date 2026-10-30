
let heft = {};
const EINHEIT = 100;

// liste anzeigen
function renderListe() {
    const liste = document.getElementById('npk-liste');
    let html = '';

    // geht alle einträge=keys durch
    Object.entries(heft).forEach(([key, anzahl]) => {
        const d = npkDaten[key];
        const gewicht = anzahl * EINHEIT;
        //html-block für einträge
        html += `<div class="npk-eintrag">
            <span>${anzahl}x ${d.name} (${gewicht} g)</span>
            <button class="npk-entfernen" data-key="${key}">-</button>
        </div>`;
    });

    liste.innerHTML = html;

    // button per click löschen
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

// der Rechnen button
document.getElementById('npk-rechnen-btn').addEventListener('click', () => {
    if (Object.keys(heft).length === 0) {
        document.getElementById('npk-ergebnis').textContent = 'Bitte Material auswählen.';
        return;
    }

    const nährstoffe = ['n', 'p', 'k', 'ca', 'mg', 's', 'fe', 'si', 'na'];
    //summiert alle gewichte
    const totalGewicht = Object.values(heft).reduce((summe, anzahl) => summe + anzahl * EINHEIT, 0);

    //umwndelt es in einer 0 statt undefined
    let totals = {};
    nährstoffe.forEach(key => totals[key] = 0);

    //key + anzahl = ergebniss in heft
    Object.entries(heft).forEach(([key, anzahl]) => {
        const d = npkDaten[key];
        const gewicht = anzahl * EINHEIT;
        nährstoffe.forEach(n => {
            totals[n] += (d[n] || 0) / 100 * gewicht;
        });
    });
    //zählt die clicks
    const anzahlTeile = Object.values(heft).reduce((summe, anzahl) => summe + anzahl, 0);

    //werte werden nur gezeigt die wirklich eine 0 haben
    const mitWert = nährstoffe.filter(key => totals[key] > 0);
    
    //rechnet den gesamt zusammen mit anderen werte
    const werteText = mitWert.map(key => {
        const prozent = ((totals[key] / totalGewicht) * 100).toFixed(2);
        return `${key.toUpperCase()}: ${prozent}%`;
    }).join(' &nbsp; ');

    // ergebnis in block
    document.getElementById('npk-ergebnis').innerHTML =
        `<strong>${anzahlTeile} Teile | ${totalGewicht} g</strong><br>${werteText}`;
});

// jedes bild wird um 1 erhöht
document.querySelectorAll('.abfall').forEach(div => {
    div.addEventListener('click', () => {
        const key = div.dataset.key;
        heft[key] = (heft[key] || 0) + 1;
        renderListe();
    });
});   