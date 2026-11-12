// Setzt alle Rechner, Formulare, das Quiz und Ergebnisse auf Anfang zurück
function allesZuruecksetzen() {
    // 1. NPK-Rechner leeren
    if (typeof heft !== 'undefined') {
        heft = {};
        if (typeof renderListe === 'function') renderListe();
    }
    const npkErgebnis = document.getElementById('npk-ergebnis');
    if (npkErgebnis) npkErgebnis.innerHTML = '';

    // (Volumen, Rasenerde, Admin, Tagebuch etc.) leeren
    document.querySelectorAll('.page input, .page textarea').forEach(feld => {
        if (feld.type === 'checkbox' || feld.type === 'radio') {
            feld.checked = false;
        } else {
            feld.value = '';
        }
    });

    // ergebnisse leeren
    document.querySelectorAll('[id$="-ergebnis"], [id$="-result"], .ergebnis').forEach(el => {
        el.innerHTML = '';
    });

    // Quiz zurücksetzten
    const quizBox = document.getElementById('quiz-box');
    if (quizBox) quizBox.remove();

    // Admin-Formular zurücksetzen, falls man im Bearbeiten-Modus war
    const admSpeichern = document.getElementById('adm-speichern');
    if (admSpeichern) {
        delete admSpeichern.dataset.editId;
        admSpeichern.textContent = 'Speichern';
    }


//  rasenerde-rechner auf(33% / 33% / 34%) zurücksetzen
    if (typeof h1 !== 'undefined' && typeof h2 !== 'undefined') {
        h1 = 33;
        h2 = 66;
        if (typeof updateBar === 'function') updateBar();
    }
    const rasenSpeichern = document.getElementById('rasen-speichern');
    if (rasenSpeichern) {
        rasenSpeichern.textContent = 'Speichern';
        rasenSpeichern.disabled = false;
        rasenSpeichern.style.background = '';
    }
}

//seiten-navigation
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn) return;

    const page = btn.dataset.page;

    allesZuruecksetzen();

    //tagebuch einträge laden ,dann anzeigen
    if (page === 'tagebuch') {
        ladeEintraege();
        document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
        document.querySelector('header').style.display = 'none';
        document.getElementById('page-tagebuch').style.display = 'block';
        return;
    }

    // seiten umschalten
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.querySelector('header').style.display = 'none';

    if (page === 'start') {
        document.querySelector('header').style.display = 'block';
    } else {
        document.getElementById('page-' + page).style.display = 'block';

        if (page === 'quiz' && typeof startQuiz === 'function') {
            startQuiz();
        }
    }
});  

// PWA Installations-Button Logik
let installPrompt = null;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    if (installBtn) {
        installBtn.style.display = 'block';
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        const result = await installPrompt.userChoice;
        if (result.outcome === 'accepted') {
            installBtn.style.display = 'none';
        }
        installPrompt = null;
    });
}
