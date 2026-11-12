const headerHTML = `
<h1>Gardenlog</h1>
<header>
        
        <button id="install-btn" style="display: none; margin: 10px auto; padding: 10px 18px; background: #3b82f6; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
        App installieren
        </button>
        <nav >
        
                <div>
                    <button class="knopf-2" id="logout-btn">Logout😴</button>
                </div>
                <div class="position-start">
                    <button class="knopf" data-page="npk">NPK-Rechner🚯</button>
                    <button class="knopf" data-page="volumen">Volumen-Rechner🧮</button>
                </div>
                
                <div class="position-start">
                    <button class="knopf" data-page="rasen">Rasenerde-Rechner🚜</button>
                    <button class="knopf" data-page="quiz">Quiz🤓</button>
                </div>
                            
            <div><button class="knopf-2" data-page="tagebuch">Tagebuch 📙</button></div>
        </nav>
    

    </header>
`
document.body.insertAdjacentHTML('afterbegin', headerHTML);

