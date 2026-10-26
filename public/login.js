const loginHTML = `

        <!--Login-->
<div class="page" id="page-login">
    <h2>Login</h2>
    <div class="login-position">
        <div class="login-position-abstand">
            <label>E-Mail:</label>
            <input type="email" id="login-email" placeholder="deine@email.com">
        </div>
        <div class="login-position-abstand">
            <label>Passwort:</label>
            <input type="password" id="login-password" placeholder="••••••••">
        </div>
        <div class="login-position-abstand">
            <button id="login-btn">Anmelden</button>
            <button id="to-register">Registrieren</button>  <!-- ← neu -->
        </div>
    </div>
    <p id="login-msg"></p>
</div>

<!--Registrierung-->
<div class="page" id="page-registrierung" style="display: none;">
    <h2>Registrierung</h2>
    <div class="regist-position">
        <div class="regist-position-abstand">
            <label>Name:</label>
            <input type="text" id="reg-name" placeholder="Dein Name">
        </div>
        <div class="regist-position-abstand">
            <label>E-Mail:</label>
            <input type="email" id="reg-email" placeholder="deine@email.com">
        </div>
        <div class="regist-position-abstand">
            <label>Passwort:</label>
            <input type="password" id="reg-password" placeholder="••••••••"
                minlength="8" 
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$" 
                required>
        </div>
        <div class="regist-position-abstand">
            <button id="register-btn">Registrieren</button>
            <button id="to-login">Zurück</button>
        </div>
    </div>
    <p id="register-msg"></p>  
</div>   
`
document.body.insertAdjacentHTML('afterbegin', loginHTML);