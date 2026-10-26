// Token prüfen
if (localStorage.getItem('token') === null) {
    document.querySelector('header').style.display = 'none';
    document.getElementById('page-login').style.display = 'block';
}

// Login
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const msg = document.getElementById('login-msg');

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            document.getElementById('page-login').style.display = 'none';
            document.querySelector('header').style.display = 'block';
            msg.textContent = '';
        } else {
            msg.textContent = data.message;
        }
    } catch (err) {
        msg.textContent = 'Netzwerkfehler';
    }
});

// zu registrierung
document.getElementById('to-register').addEventListener('click', () => {
    document.getElementById('page-login').style.display = 'none';
    document.getElementById('page-registrierung').style.display = 'block';
});

// zu login
document.getElementById('to-login').addEventListener('click', () => {
    document.getElementById('page-registrierung').style.display = 'none';
    document.getElementById('page-login').style.display = 'block';
});   

// Registrierung
document.getElementById('register-btn').addEventListener('click', async () => {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const msg = document.getElementById('register-msg');
    msg.textContent = '';

    if (name.length < 3) {
        msg.textContent = 'Name muss mindestens 2 Zeichen lang sein.';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'Bitte eine gültige E-Mail-Adresse eingeben.';
        return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password)) {
        msg.textContent = 'Passwort: mind. 8 Zeichen, 1 Groß-, 1 Kleinbuchstabe, 1 Zahl, 1 Sonderzeichen.';
        return;
    }

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (res.ok) {
            msg.textContent = 'Registrierung erfolgreich - jetzt anmelden.';
        } else {
            msg.textContent = data.message;
        }
    } catch (err) {
        msg.textContent = 'Netzwerkfehler';
    }
});   

// Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    document.querySelector('header').style.display = 'none';
    document.getElementById('page-login').style.display = 'block';
});   

document.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.dataset.page;

    // alles ausblenden
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.querySelector('header').style.display = 'none';

    
    if (page === 'start') {
        document.querySelector('header').style.display = 'block';
    } else {
        document.getElementById('page-' + page).style.display = 'block';
    }
  });
});   