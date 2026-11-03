//seiten-navigation
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn) return;

    const page = btn.dataset.page;

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
    }
});   