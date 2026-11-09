// public/quiz.js

const fragen = [
    {
        f: 'Knochenmehl ist besonders reich an welchem Nährstoff?',
        a: ['Stickstoff (N)', 'Phosphor (P)', 'Kalium (K)'],
        richtig: 1,
        erlaeuterung: 'Knochenmehl enthält ca. 3% P₂O₅ - ideal für Wurzelwachstum und Blüte.'
    },
    {
        f: 'Welches Material liefert viel Kalium (K)?',
        a: ['Kaffeesatz', 'Holzasche', 'Hornspäne'],
        richtig: 1,
        erlaeuterung: 'Holzasche enthält ca. 10% K₂O - stärkt Stängel und Frostresistenz.'
    },
    {
        f: 'Hornspäne sind vor allem eine Quelle für…',
        a: ['Stickstoff (N)', 'Phosphor (P)', 'Kalium (K)'],
        richtig: 0,
        erlaeuterung: 'Hornspäne enthalten ca. 12% N - langsam freisetzender Stickstoff für Blattwachstum.'
    },
    {
        f: 'Kokosfasern sind als Substrat gut, weil sie…',
        a: ['viel Stickstoff liefern', 'gut Wasser und Luft speichern', 'viel Phosphor enthalten'],
        richtig: 1,
        erlaeuterung: 'Kokos ist nährstoffarm, aber ideal für Wasser-/Luft-Balance im Substrat.'
    },
    {
        f: 'Kaffeesatz enthält vor allem welchen Nährstoff?',
        a: ['Stickstoff (N)', 'Phosphor (P)', 'Kalium (K)'],
        richtig: 0,
        erlaeuterung: 'Kaffeesatz enthält ca. 1-2% N - leichter Stickstoff-Boost, aber kein Hauptdünger.'
    },
    {
        f: 'Welches Material ist am nährstoffreichsten an Stickstoff (N)?',
        a: ['Blattkompost', 'Frischkompost (Gras)', 'Torf'],
        richtig: 1,
        erlaeuterung: 'Frischer Grasschnitt/Grünkompost enthält ca. 2-3% N - der stickstoffreichste Gartenabfall.'
    },
    {
        f: 'Eierreste (Schalen) liefern vor allem…',
        a: ['Kalium (K)', 'Stickstoff (N)', 'Calcium (Ca)'],
        richtig: 2,
        erlaeuterung: 'Eierschalen bestehen zu ~95% aus Calciumcarbonat - gut gegen Versauerung, aber kein NPK-Dünger.'
    },
    {
        f: 'Welcher Nährstoff ist für grünes Blatt- und Sprosswachstum verantwortlich?',
        a: ['Phosphor (P)', 'Kalium (K)', 'Stickstoff (N)'],
        richtig: 2,
        erlaeuterung: 'Stickstoff (N) treibt das vegetative Wachstum - ohne N werden Blätter gelb (Chlorose).'
    },
        {
        f: 'Welches Material ist am besten gegen Bodenversauerung geeignet?',
        a: ['Knochenmehl', 'Holzasche', 'Hornspäne'],
        richtig: 1,
        erlaeuterung: 'Holzasche ist alkalisch (pH ~11) und neutralisiert sauren Boden - enthält zusätzlich viel K.'
    },
    {
        f: 'Welcher Nährstoff wird bei Blüte und Fruchtbildung am meisten benötigt?',
        a: ['Stickstoff (N)', 'Phosphor (P)', 'Kalium (K)'],
        richtig: 1,
        erlaeuterung: 'Phosphor (P) ist entscheidend für Blüte, Fruchtansatz und Wurzelbildung - Knochenmehl ist die beste organische P-Quelle.'
    }   
];

let index = 0;
let punkte = 0;

function startQuiz() {
    const existing = document.getElementById('quiz-box');
    if (existing) existing.remove();
    index = 0;
    punkte = 0;
    renderFrage();
}

function renderFrage() {
    const q = fragen[index];

    let box = document.getElementById('quiz-box');
    if (!box) {
        box = document.createElement('div');
        box.id = 'quiz-box';
        document.getElementById('page-quiz').appendChild(box);
    }

    box.innerHTML = `
        <div style="max-width:450px;margin:20px auto;padding:20px;background:#e8e8e0;border-radius:8px;">
            <p style="color:#666;font-size:0.9em;">Frage ${index + 1} / ${fragen.length}</p>
            <p style="font-size:1.1em;margin:12px 0;"><strong>${q.f}</strong></p>
            ${q.a.map((opt, i) => `
                <button class="quiz-option" data-i="${i}"
                    style="display:block;width:100%;margin:8px 0;padding:12px;text-align:left;
                    border:2px solid #999;border-radius:6px;cursor:pointer;background:#fff;
                    font-size:1em;transition:all 0.2s;">
                    ${opt}
                </button>
            `).join('')}
            <div id="quiz-feedback" style="margin-top:12px;padding:10px;border-radius:6px;display:none;"></div>
        </div>
    `;

    box.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = parseInt(btn.dataset.i);
            const fb = document.getElementById('quiz-feedback');

            box.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

            if (i === q.richtig) {
                btn.style.borderColor = '#27ae60';
                btn.style.background = '#d4edda';
                fb.style.background = '#d4edda';
                fb.style.color = '#155724';
                punkte++;
            } else {
                btn.style.borderColor = '#c0392b';
                btn.style.background = '#f8d7da';
                box.querySelectorAll('.quiz-option')[q.richtig].style.borderColor = '#27ae60';
                box.querySelectorAll('.quiz-option')[q.richtig].style.background = '#d4edda';
                fb.style.background = '#f8d7da';
                fb.style.color = '#721c24';
            }

            fb.innerHTML = `<strong>${i === q.richtig ? '✓ Richtig!' : '✗ Falsch.'}</strong><br>${q.erlaeuterung}`;
            fb.style.display = 'block';

            const weiterBtn = document.createElement('button');
            weiterBtn.textContent = index < fragen.length - 1 ? 'Weiter →' : 'Ergebnis anzeigen';
            weiterBtn.style.cssText = 'margin-top:12px;padding:10px 20px;background:#3a5a3a;color:#fff;border:none;border-radius:4px;cursor:pointer;';
            weiterBtn.addEventListener('click', () => {
                index++;
                if (index < fragen.length) renderFrage();
                else zeigeErgebnis();
            });
            fb.appendChild(weiterBtn);
        });
    });
}

function zeigeErgebnis() {
    const box = document.getElementById('quiz-box');
    const datum = new Date().toLocaleDateString('de-AT');

    box.innerHTML = `
        <div style="max-width:450px;margin:20px auto;padding:20px;background:#e8e8e0;border-radius:8px;text-align:center;">
            <h3>Quiz abgeschlossen!</h3>
            <p style="font-size:1.5em;margin:12px 0;"><strong>${punkte} / ${fragen.length}</strong></p>
            <p>${punkte === fragen.length ? '🎉 Perfekt!' : punkte >= 7 ? '👍 Sehr gut!' : punkte >= 5 ? '👍 Gut gemacht!' : '📚 Noch üben!'}</p>
            <div style="margin-top:16px;display:flex;gap:8px;justify-content:center;align-items:center;">
                <input type="text" id="quiz-rezept-name" placeholder="Quiz-Name"
                    style="padding:6px 10px;border-radius:4px;border:1px solid #999;width:160px;">
                <button id="quiz-speichern"
                    style="padding:8px 16px;background:#3a5a3a;color:#fff;border:none;border-radius:4px;cursor:pointer;"> :tada:
                    Speichern
                </button>
            </div>
            <button id="quiz-nochmal"
                style="margin-top:12px;padding:10px 20px;background:#666;color:#fff;border:none;border-radius:4px;cursor:pointer;">
                Nochmal spielen
            </button>
        </div>
    `;

    document.getElementById('quiz-speichern').addEventListener('click', async () => {
        const token = localStorage.getItem('token');
        if (!token) { alert('Bitte zuerst einloggen.'); return; }

        const name = document.getElementById('quiz-rezept-name').value.trim() || 'Quiz-Ergebnis';

        const res = await fetch('/api/tagebuch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                titel: name,
                text: `Datum: ${datum}\nQuiz-Ergebnis: ${punkte}/${fragen.length} richtig`
            })
        });

        if (res.ok) {
            document.getElementById('quiz-speichern').textContent = ' Gespeichert!';
            document.getElementById('quiz-speichern').disabled = true;
            document.getElementById('quiz-speichern').style.background = '#27ae60';
        } else {
            alert('Fehler beim Speichern');
        }
    });

    document.getElementById('quiz-nochmal').addEventListener('click', startQuiz);
}

document.querySelectorAll('[data-page="quiz"]').forEach(btn => {
    btn.addEventListener('click', startQuiz);
});   