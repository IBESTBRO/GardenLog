

const npkHtml = `
    <!-- NPK -->
<div class="page" id="page-npk">
    <div class="standard-button">
        <button class="zurück" data-page="start">Zurück</button>
        <button class="t-buch" data-page="tagebuch">Tagebuch</button>
    </div>
    <h2>NPK-Rechner</h2>
    <div class="position-npk">
    <div class="abfälle">
        <div class="abfall" data-key="gräten">
            <img src="assets/images/pexels-amar-14030771.jpg" alt="ss">
            <span>Gräten</span>
        </div>
        <div class="abfall" data-key="karottengrün">
            <img src="assets/images/pexels-annija-u-492300719-16349991.jpg" alt="ss">
            <span>Karottengrün</span>
        </div>
        <div class="abfall" data-key="bananenschale">
            <img src="assets/images/pexels-any-lane-5945855.jpg" alt="ss">
            <span>Bananenschale</span>
        </div>
        <div class="abfall" data-key="steinmehl">
            <img src="assets/images/pexels-anya-juarez-tenorio-227888521-33702548.jpg" alt="ss">
            <span>Steinmehl</span>
        </div>
        <div class="abfall" data-key="hühnermist">
            <img src="assets/images/pexels-artempodrez-7232905.jpg" alt="ss">
            <span>Hühnermist</span>
        </div>
        <div class="abfall" data-key="kokosschale">
            <img src="assets/images/pexels-bogdankrupin-3986709.jpg" alt="ss">
            <span>Kokosschale</span>
        </div>
        <div class="abfall" data-key="milch">
            <img src="assets/images/pexels-charlotte-may-5946720.jpg" alt="ss">
            <span>Milch</span>
        </div>
        <div class="abfall" data-key="traubenzesten">
            <img src="assets/images/pexels-christian-bolanos-2158732257-35629934.jpg" alt="ss">
            <span>Traubenzesten</span>
        </div>
        <div class="abfall" data-key="molke">
            <img src="assets/images/pexels-cristian-rojas-8064393.jpg" alt="ss">
            <span>Molke</span>
        </div>
        <div class="abfall" data-key="zitronenschale">
            <img src="assets/images/pexels-darkside-photography-1243587808-36990314.jpg" alt="ss">
            <span>Zitronenschale</span>
        </div>
        <div class="abfall" data-key="brennesseljauche">
            <img src="assets/images/pexels-davidmcelwee-15990941.jpg" alt="ss">
            <span>Brennesseljauche</span>
        </div>
        <div class="abfall" data-key="laub">
            <img src="assets/images/pexels-didsss-13214232.jpg" alt="ss">
            <span>Laub</span>
        </div>
        <div class="abfall" data-key="knochenmehl">
            <img src="assets/images/pexels-eva-bronzini-5988167.jpg" alt="ss">
            <span>Kochenmehl</span>
        </div> 
        <div class="abfall" data-key="hornspäne">
            <img src="assets/images/pexels-eva-bronzini-5988422.jpg" alt="ss">
            <span>Hornspähne</span>
        </div>
        <div class="abfall" data-key="kaffeesatz">
            <img src="assets/images/pexels-fotoblend-20756428.jpg" alt="ss">
            <span>Kaffeesatz</span>
        </div>
        <div class="abfall" data-key="erdnussschale">
            <img src="assets/images/pexels-iulian-sandu-294198313-33416879.jpg" alt="ss">
            <span>Erdnussschale</span>
        </div>
        <div class="abfall" data-key="bier">
            <img src="assets/images/pexels-jaralol-26652239.jpg" alt="ss">
            <span>Bier</span>
        </div>
        <div class="abfall" data-key="zwiebelschalen">
            <img src="assets/images/pexels-karola-g-4197496.jpg" alt="ss">
            <span>Zwiebelschalen</span>
        </div> 
        <div class="abfall" data-key="holzasche">
            <img src="assets/images/pexels-karola-g-4750320.jpg" alt="ss">
            <span>Holzasche</span>
        </div>
        <div class="abfall" data-key="stroh">
            <img src="assets/images/pexels-magda-ehlers-pexels-9349145.jpg" alt="ss">
            <span>Stroh</span>
        </div>
        <div class="abfall" data-key="rindenmulch">
            <img src="assets/images/pexels-magda-ehlers-pexels-9890699.jpg" alt="ss">
            <span>Rindenmulch</span>
        </div>
        <div class="abfall" data-key="brotjauche">
            <img src="assets/images/pexels-mateusz-feliksik-1896604-13428170.jpg" alt="ss">
            <span>Brotjauche</span>
        </div> 
        <div class="abfall" data-key="muscheln">
            <img src="assets/images/pexels-mrgajowy3-35389872.jpg" alt="ss">
            <span>Muschelschale</span>
        </div>
        <div class="abfall" data-key="kartoffelwasser">
            <img src="assets/images/pexels-nadin-sh-78971847-31399175.jpg" alt="ss">
            <span>Kartoffelwasser</span>
        </div>
        <div class="abfall" data-key="aquariumwasser">
            <img src="assets/images/pexels-nguy-n-khanh-432256268-21847410.jpg" alt="ss">
            <span>Aquariumwasser</span>
        </div>
        <div class="abfall" data-key="moos">
            <img src="assets/images/pexels-olivers-36065716.jpg" alt="ss">
            <span>Moos</span>
        </div>
        <div class="abfall" data-key="haselnussschale">
            <img src="assets/images/pexels-ozgarts-39567559.jpg" alt="ss">
            <span>Haselnussschale</span>
        </div> 
        <div class="abfall" data-key="schafwolle">
            <img src="assets/images/pexels-rachel-claire-5490699.jpg" alt="ss">
            <span>Schafwolle</span>
        </div>
        <div class="abfall" data-key="walnussschale">
            <img src="assets/images/pexels-ray-suarez-624980841-34947090.jpg" alt="ss">
            <span>Walnussschale</span>
        </div>
        <div class="abfall" data-key="holzspäne">
            <img src="assets/images/pexels-ron-lach-8817844.jpg" alt="ss">
            <span>Holzspäne</span>
        </div>
        <div class="abfall" data-key="minerallwasser">
            <img src="assets/images/pexels-sam-mai-322739881-13723906.jpg" alt="ss">
            <span>Minerallwasser</span>
        </div>
        <div class="abfall" data-key="pistazienschale">
            <img src="assets/images/pexels-santaclarastudio-10060931.jpg" alt="ss">
            <span>Pistazienschale</span>
        </div> 
        <div class="abfall" data-key="wurmhumus">
            <img src="assets/images/pexels-sippakorn-yamkasikorn-1745809-3696170.jpg" alt="ss">
            <span>Wurmhumus</span>
        </div>
        <div class="abfall" data-key="eierschale">
            <img src="assets/images/pexels-sithumrulzs-9146158.jpg" alt="ss">
            <span>Eierschale</span>
        </div>
        <div class="abfall" data-key="pferdemist">
            <img src="assets/images/pexels-vladimirsrajber-15671396.jpg" alt="ss">
            <span>Pferdemist</span>
        </div>
        <div class="abfall" data-key="rasenschnitt">
            <img src="assets/images/Screenshot 2026-10-10 120857.png" alt="ss">
            <span>Rasenschnitt</span>
        </div>
        <div class="abfall" data-key="hefe">
            <img src="assets/images/Screenshot 2026-10-10 133821.png" alt="ss">
            <span>Hefe</span>
        </div> 
        <div class="abfall" data-key="melonenschale">
            <img src="assets/images/Screenshot 2026-10-10 134532.png" alt="ss">
            <span>Melonenschale</span>
        </div>
        <div class="abfall" data-key="kuhmist">
            <img src="assets/images/Screenshot 2026-10-10 135558.png " alt="ss">
            <span>Kuhmist</span>
        </div>
        <div class="abfall" data-key="maiskolben">
            <img src="assets/images/Screenshot 2026-10-10 135841.png" alt="ss">
            <span>Maiskolben</span>
        </div>
    </div>
    </div>

    <div class="npk-rechnen">
        <div id="npk-liste"></div>
        <button id="npk-rechnen-btn">Rechnen</button>
    <div id="npk-ergebnis"></div>
</div>   
</div>

`

document.body.insertAdjacentHTML("afterbegin", npkHtml)
