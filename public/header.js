const headerHTML = `
<h1>Gardenlog</h1>
<header>
        
        <nav >
        
                <div>
                    <button class="knopf-2" id="logout-btn">Logout</button>
                </div>
                <div class="position-start">
                    <button class="knopf" data-page="npk">NPK-Rechner</button>
                    <button class="knopf" data-page="volumen">Volumen-Rechner</button>
                </div>
                
                <div class="position-start">
                    <button class="knopf" data-page="rasen">Rasenerde-Rechner</button>
                    <button class="knopf" data-page="quiz">Quiz</button>
                </div>
                            
            <div><button class="knopf-2" data-page="tagebuch">Tagebuch</button></div>
        </nav>
    

    </header>
`
document.body.insertAdjacentHTML('afterbegin', headerHTML);