// lädt NPK-Materialien und injiziert die komplette NPK-seite ins DOM
async function ladeUndInjiziere() {
    const res = await fetch('/api/npk');
    const materials = await res.json();

    const npkHtml = `
    <div class="page" id="page-npk">
        <div class="standard-button">
            <button class="zurück" data-page="start">Zurück🛖</button>
            <button class="t-buch" data-page="tagebuch">Tagebuch 📙</button>
        </div>
        <h2>NPK-Rechner🚯</h2>
        <div class="position-npk">
            <div class="abfälle">
                ${materials.map(d => `
                <div class="abfall" data-key="${d.key}">
                    <img src="/assets/images/${d.bild}" alt="${d.name}">
                    <span>${d.name}</span>
                </div>`).join('')}
            </div>
        </div>
        <div class="npk-rechnen">
            <div id="npk-liste"></div>
            <button id="npk-rechnen-btn">Rechnen</button>
            <div id="npk-ergebnis"></div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", npkHtml);  

    //seite umschalten navigation: alle seiten werden ausgeblendet und die zielseite eingeblendet
    document.querySelectorAll('#page-npk [data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
            document.querySelector('header').style.display = 'none';
            if (page === 'start') {
                document.querySelector('header').style.display = 'block';
            } else {
                document.getElementById('page-' + page).style.display = 'block';
            }
        });
    });
}

ladeUndInjiziere();   