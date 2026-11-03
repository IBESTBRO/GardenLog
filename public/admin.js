
// lädt alle NPK-materialien von der Admin-API und rendert sie in die liste
async function ladeAdminNpk() {

    // GET-anfrage an die Admin-Route, mit Bearer-Token aus localStorage für autorisierung
    const res = await fetch('/api/admin/npk', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    // wenn die anfrage fehlschlägt (z. B. 401, 403, 500) = abbrechen, nichts rendern
    if (!res.ok) return;
    const materials = await res.json();
    renderAdminListe(materials);
}

// baut die HTML-liste aller materialien auf und bindet die buttons
function renderAdminListe(materials) {
    const liste = document.getElementById('admin-npk-liste');
    if (!liste) return;

    liste.innerHTML = materials.map(m => `
        <div style="background:#e8e8e0;border-radius:6px;padding:10px;margin:8px 0;display:flex;justify-content:space-between;align-items:center;">
            <div>
                <strong>${m.name}</strong> (${m.key})<br>
                <small>N:${m.n} P:${m.p} K:${m.k} Ca:${m.ca} Mg:${m.mg} S:${m.s}</small>
            </div>
            <div style="display:flex;gap:6px;">
                <button class="adm-bearbeiten" data-id="${m._id}" data-key="${m.key}" data-name="${m.name}" data-n="${m.n}" data-p="${m.p}" data-k="${m.k}" data-ca="${m.ca}" data-mg="${m.mg}" data-s="${m.s}" style="background:#2980b9;color:#fff;border:none;border-radius:4px;padding:4px 10px;cursor:pointer;">✏️</button>
                <button class="adm-loeschen" data-id="${m._id}" style="background:#c0392b;color:#fff;border:none;border-radius:4px;padding:4px 10px;cursor:pointer;">🗑</button>
            </div>
        </div>
    `).join('');
    
    // für jeden löschen-button: klick-handler binden
    liste.querySelectorAll('.adm-loeschen').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!confirm('Material löschen?')) return;

            // DELETE-anfrage an die API mit der objectId des materials
            await fetch(`/api/admin/npk/${btn.dataset.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            ladeAdminNpk();
        });
    });

// für jeden bearbeiten-button: klick-handler binden
liste.querySelectorAll('.adm-bearbeiten').forEach(btn => {
        btn.addEventListener('click', () => {

            // alle formularfelder mit den data-Attributen des buttons befüllen
            document.getElementById('adm-key').value = btn.dataset.key;
            document.getElementById('adm-name').value = btn.dataset.name;
            document.getElementById('adm-n').value = btn.dataset.n;
            document.getElementById('adm-p').value = btn.dataset.p;
            document.getElementById('adm-k').value = btn.dataset.k;
            document.getElementById('adm-ca').value = btn.dataset.ca;
            document.getElementById('adm-mg').value = btn.dataset.mg;
            document.getElementById('adm-s').value = btn.dataset.s;

            // button-text auf „Aktualisieren" ändern und die _id merken
            document.getElementById('adm-speichern').textContent = 'Aktualisieren';
            document.getElementById('adm-speichern').dataset.editId = btn.dataset.id;
        });
    });
}

// klick-handler auf den „Speichern"/„Aktualisieren"-button
document.getElementById('adm-speichern')?.addEventListener('click', async () => {
    
    // alle formularwerte sammeln; parseFloat + || 0 stellt sicher, dass leere felder 0 werden
    const data = {
        key: document.getElementById('adm-key').value.trim(),
        name: document.getElementById('adm-name').value.trim(),
        bild: document.getElementById('adm-bild').value.trim(),
        n: parseFloat(document.getElementById('adm-n').value) || 0,
        p: parseFloat(document.getElementById('adm-p').value) || 0,
        k: parseFloat(document.getElementById('adm-k').value) || 0,
        ca: parseFloat(document.getElementById('adm-ca').value) || 0,
        mg: parseFloat(document.getElementById('adm-mg').value) || 0,
        s: parseFloat(document.getElementById('adm-s').value) || 0
    };

    // Client-seitige Validierung: key und name dürfen nicht leer sein
    if (!data.key || !data.name) { alert('Key und Name sind Pflicht.'); return; }

    // falls eine editId gesetzt ist - PUT (Bearbeiten), sonst - POST (neu anlegen)
    const editId = document.getElementById('adm-speichern').dataset.editId;
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/admin/npk/${editId}` : '/api/admin/npk';

    // anfrage an die API senden
    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {

    // erfolg: Edit-Modus zurücksetzen, formular leeren, liste neu laden
    delete document.getElementById('adm-speichern').dataset.editId;
    document.getElementById('adm-speichern').textContent = 'Speichern';
    alert('Gespeichert!');
    document.querySelectorAll('[id^="adm-"]').forEach(i => i.value = '');
    ladeAdminNpk();
} else {

    // fehler: fehlermeldung aus der API anzeigen
    const d = await res.json();
    alert(d.message || 'Fehler');
}   
});

// nur wenn der eingeloggte User die Rolle „admin" hat - Admin-Bereich initialisieren
if (localStorage.getItem('role') === 'admin') {
    ladeAdminNpk();
}   