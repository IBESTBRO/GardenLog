const token = localStorage.getItem('token');
let editId = null;

// einträge von API laden
async function ladeEintraege() {
    const res = await fetch('/api/tagebuch', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) return;
    const eintraege = await res.json();
    renderEintraege(eintraege);
}

// einträge rendern
function renderEintraege(eintraege) {
    const liste = document.getElementById('tagebuch-liste');
    if (eintraege.length === 0) {
        liste.innerHTML = '<p style="text-align:center;color:#666;">Noch keine Einträge.</p>';
        return;
    }
    liste.innerHTML = eintraege.map(e => `
        <div class="tagebuch-eintrag">
            <div class="tagebuch-kopf">
                <h3>${e.titel}</h3>
                <small>${new Date(e.datum).toLocaleDateString('de-AT')}</small>
            </div>
            <p style="white-space:pre-wrap;">${e.text || '—'}</p>
            <div style="margin-top:8px;display:flex;gap:8px;">
                <button class="tagebuch-bearbeiten" data-id="${e._id}" data-titel="${e.titel}" data-text="${(e.text || '').replace(/"/g, '&quot;')}" style="background:#2980b9;color:#fff;border:none;border-radius:4px;padding:4px 10px;cursor:pointer;">✏️ Bearbeiten</button>
                <button class="tagebuch-loeschen" data-id="${e._id}" style="background:#c0392b;color:#fff;border:none;border-radius:4px;padding:4px 10px;cursor:pointer;">🗑</button>
            </div>
        </div>
    `).join('');

    //löschen
    liste.querySelectorAll('.tagebuch-loeschen').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!confirm('Eintrag wirklich löschen?')) return;
            await fetch(`/api/tagebuch/${btn.dataset.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            ladeEintraege();
        });
    });

    //formular bearbeiten
    liste.querySelectorAll('.tagebuch-bearbeiten').forEach(btn => {
        btn.addEventListener('click', () => {
            editId = btn.dataset.id;
            document.getElementById('tb-titel').value = btn.dataset.titel;
            document.getElementById('tb-text').value = btn.dataset.text;
            document.getElementById('tb-speichern').textContent = 'Aktualisieren';
            document.getElementById('tb-speichern').style.background = '#e67e22';
        });
    });
}

//speichern
async function speichereEintrag() {
    const titel = document.getElementById('tb-titel').value.trim();
    const text  = document.getElementById('tb-text').value.trim();
    if (!titel) return;

    if (editId) {
        const res = await fetch(`/api/tagebuch/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titel, text })
        });
        if (res.ok) {
            resetFormular();
            ladeEintraege();
        }
    } else {
        const res = await fetch('/api/tagebuch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titel, text })
        });
        if (res.ok) {
            resetFormular();
            ladeEintraege();
        }
    }
}

//formular zurücksetzen
function resetFormular() {
    editId = null;
    document.getElementById('tb-titel').value = '';
    document.getElementById('tb-text').value = '';
    document.getElementById('tb-speichern').textContent = 'Speichern';
    document.getElementById('tb-speichern').style.background = '#3a5a3a';
}

// listener + initial-lade
if (document.getElementById('tb-speichern')) {
    document.getElementById('tb-speichern').addEventListener('click', speichereEintrag);
    ladeEintraege();
}

// bei JEDEM Klick auf "Tagebuch" neu laden
document.querySelectorAll('[data-page="tagebuch"]').forEach(btn => {
    btn.addEventListener('click', () => {
        ladeEintraege();
    });
});   