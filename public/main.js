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

// Registrierung
document.getElementById('register-btn').addEventListener('click', async () => {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const msg = document.getElementById('login-msg');

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