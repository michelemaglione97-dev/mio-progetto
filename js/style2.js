function gestisciNavbar() {
    const navList = document.querySelector('.navbar-nav');

    if (navList) {
        const socialIconsHTML = `
            <div class="ms-auto d-flex flex-row gap-4 align-items-center py-2 py-lg-0 pe-lg-5">
                <a class="nav-link social-icon" href="#" style="color: #25D366 !important; font-size: 1.5rem; list-style: none !important;">
                    <i class="bi bi-whatsapp"></i>
                </a>
                <a class="nav-link social-icon" href="#" style="color: #E4405F !important; font-size: 1.5rem; list-style: none !important;">
                    <i class="bi bi-instagram"></i>
                </a>
                <a class="nav-link social-icon" href="#" style="color: #1DA1F2 !important; font-size: 1.5rem; list-style: none !important;">
                    <i class="bi bi-twitter-x"></i>
                </a>
            </div>
        `;

        if (window.innerWidth < 992) {
            
            navList.parentElement.insertAdjacentHTML('beforeend', socialIconsHTML); //beforeen significa mettili prima della fine
        } else {
            navList.parentElement.insertAdjacentHTML('beforeend', socialIconsHTML); //parentElemente rappresenta la scatola quindi considere l insieme degli ul
        }
    }
};


let backupDelFooter = ""; 
function gestisciFooter() {
    const footer = document.querySelector('footer');
  
  
    if (backupDelFooter === "") {
        backupDelFooter = footer.innerHTML; 
    }

    const width = window.innerWidth; 

    if (width >= 768 && width < 992) {
       
        footer.innerHTML = `
        <div class="container text-center">
            <div class="row align-items-center g-4">

              
                <div class="col-12">
                    <iframe 
                        src="https://www.google.com/maps?q=Napoli&output=embed" 
                        width="100%" height="150" style="border:0; border-radius:10px;" loading="lazy">
                    </iframe>
                </div>

            
                <div class="col-12">
                    <div class="d-flex justify-content-center gap-3 fs-4">
                        <i class="bi bi-facebook social-icon"></i>
                        <i class="bi bi-twitter social-icon"></i>
                        <i class="bi bi-instagram social-icon"></i>
                        <i class="bi bi-youtube social-icon"></i>
                    </div>
                </div>

             
                <div class="col-12">
                    <p class="mb-1">
                        <a href="tel:+390811234567" class="footer-link">
                            <i class="bi bi-telephone-fill"></i> +39 081 1234567
                        </a>
                    </p>
                    <p class="mb-0">
                        <a href="info@harley.it" class=" footer-link">
                            <i class="bi bi-envelope-fill"></i> info@harley.it
                        </a>
                    </p>
                </div>

            </div>
        </div>
        `;
    } else {

        
        footer.innerHTML = backupDelFooter;
    }
}

window.addEventListener('load', gestisciFooter);
window.addEventListener('load', gestisciNavbar);
window.addEventListener('resize', gestisciFooter);

function verificaCampo(campo) { //posso usarla per nome e cognome
   
    let reg = new RegExp("^[a-zA-Z\\s]{3,20}$");
    
    if (!reg.test(campo.value)) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    } else {
        campo.classList.add("is-valid");
        campo.classList.remove("is-invalid");
        return true; 
    }
}

function estraiCaratteri(stringa,isNome) {
    
	// Pulizia: togliamo spazi e rendiamo tutto maiuscolo
    let str = stringa.toUpperCase().replace(/\s/g, ''); 
    let consonanti = str.replace(/[AEIOU]/g, '');
    let vocali = str.replace(/[^AEIOU]/g, '');

    if (isNome) {
        // REGOLA NOME
        if (consonanti.length >= 4) {
            // Se sono 4 o più: 1ª, 3ª, 4ª
            return consonanti[0] + consonanti[2] + consonanti[3];
        } 
        // Se sono meno di 4 (come PAOLO): Consonanti + Vocali
        return (consonanti + vocali + "XXX").substring(0, 3);
    } else {
        // REGOLA COGNOME (come RUSI)
        // Prende tutte le consonanti, poi le vocali, poi le X se serve
        // Per RUSI: RS (cons) + UI (voc) -> RSUI... -> prendi i primi 3 -> RSU
        return (consonanti + vocali + "XXX").substring(0, 3);
    }
}

function calcolaCarattereControllo(cf) {
    // 1. Tabelle dei valori per i caratteri in posizione DISPARI (1°, 3°, 5°...)
    const setDispari = {
        '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
        'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
        'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
        'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
    };

    // 2. Tabelle dei valori per i caratteri in posizione PARI (2°, 4°, 6°...)
    const setPari = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
        'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
        'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
    };

    let somma = 0;

    // 3. Ciclo per analizzare i 15 caratteri
    for (let i = 0; i < 15; i++) {
        let char = cf[i].toUpperCase();
        
        // Attenzione: i parte da 0, quindi le posizioni dispari del CF (1,3,5) sono 0,2,4 in JS
        if ((i + 1) % 2 !== 0) { 
            somma += setDispari[char]; // Somma il valore dalla tabella dei dispari
        } else { 
            somma += setPari[char];    // Somma il valore dalla tabella dei pari
        }
    }

    // 4. Calcolo del resto della divisione per 26 e conversione in lettera
    // Il resto (0-25) corrisponde a una lettera dell'alfabeto (0=A, 1=B...)
    return String.fromCharCode(65 + (somma % 26));
}

let cfGeneratoUfficiale = "";
let isAutomatico = false;
function generaCF() {
    // 1. RECUPERO DEI DATI DAI CAMPI DEL FORM
    const nome = document.reg.nome.value.trim();
    const cognome = document.reg.cognome.value.trim();
    const dataNascita = document.reg.dataNascita.value;
    const sessoM = document.getElementById("m").checked;
    const sessoF = document.getElementById("f").checked;
    
    // Recupero il codice Belfiore (es. H501) salvato nell'attributo data del Comune
   const inputComune = document.getElementById('comuneInput');
    const codiceBelfiore = inputComune.getAttribute('data-codice-belfiore');

    // 2. IL MURO DI CONTROLLO (Validazione)
    if (!nome || !cognome || !dataNascita || (!sessoM && !sessoF) || !codiceBelfiore) {
        alert(" Impossibile generare: inserire tutti i campi necessari!");
        return; 
    }

    // 3. COSTRUZIONE DEL CODICE
    let cf = "";

    // Calcolo Cognome (isNome = false -> regola standard)
    cf += estraiCaratteri(cognome, false);

    // Calcolo Nome (isNome = true -> regola 1-3-4 se possibile)
    cf += estraiCaratteri(nome, true);

    // Gestione Data: Anno (ultime 2 cifre)
    const data = new Date(dataNascita);
    cf += data.getFullYear().toString().substring(2);//Trasforma la stringa della data in un oggetto "Data" leggibile da JS. Prende l'anno (es. 1990), 
	                                                 //lo trasforma in stringa e con substring(2) tiene solo le ultime due cifre ("90").

    // Gestione Data: Mese (Tabella Ministeriale)
    const mesi = {0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"H", 6:"L", 7:"M", 8:"P", 9:"R", 10:"S", 11:"T"};
    cf += mesi[data.getMonth()];//getMonth() restituisce un numero da 0 (Gennaio) a 11 (Dicembre)

    // Gestione Data: Giorno e Sesso (+40 se femmina)
    let giorno = data.getDate();
    if (sessoF) {
        giorno += 40;
    }
    cf += giorno.toString().padStart(2, '0'); // padStart(2, '0'):

    // Aggiunta Codice Comune (Belfiore)
    cf += codiceBelfiore;

    // Aggiunta Carattere di Controllo (Algoritmo finale)
    cf += calcolaCarattereControllo(cf);

    // 4. OUTPUT FINALE
	cfGeneratoUfficiale = cf.toUpperCase();
	
	isAutomatico = true;//cosi mi cancella solo nel reset quando è creato su genera
    
	const campoRisultato = document.getElementById('validationServerCF');// Prende il campo di testo del Codice Fiscale, ci scrive dentro il risultato finale tutto in maiuscolo  
	campoRisultato.value = cfGeneratoUfficiale;
    
    // Richiamo la tua funzione per colorare il campo di verde
    verificaCF(); 
}



function verificaCF() {
    let cf = document.reg.cf;
    cf.value = cf.value.toUpperCase().trim(); //trasforma tutto in maiuscolo
    
    let regCF = new RegExp("^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$");
    let formatoValido = regCF.test(cf.value);

    let esito = false;

    if (formatoValido) {             //se il formato è valido e non è generato va bene!
        if (cfGeneratoUfficiale === "") {
            
            esito = true; 
        } else {
         
            esito = (cf.value === cfGeneratoUfficiale);//altrimenti è uguale al cf generato
        }
    }

    if (esito) {
        cf.classList.add("is-valid");
        cf.classList.remove("is-invalid");
        return true;
    } else {
        cf.classList.add("is-invalid");
        cf.classList.remove("is-valid");
        return false;
    }
}

function resetCF() { 
    if (isAutomatico) {
        // Se era automatico, i dati non corrispondono più: cancella tutto
        document.reg.cf.value = "";
        cfGeneratoUfficiale = "";
        isAutomatico = false; 
        
        let cf = document.reg.cf;
        cf.classList.remove("is-valid");
        cf.classList.add("is-invalid");
    } else {
       
        let cf = document.reg.cf;
        cf.classList.remove("is-valid");
        cfGeneratoUfficiale = ""; // Svuotiamo comunque la memoria ufficiale
    }
}

function verificaComuneObbligatorio() {
    let campo = document.getElementById('comuneInput');
    
    if (campo.value === "") {
        campo.classList.add("is-invalid"); // Diventa rosso
        campo.classList.remove("is-valid");
        return false;
    } else {
       
        return true;
    }
}

function verificaSelect(campo) {
    let inputComune = document.getElementById('comuneInput');
    let nazioneObbligatoria = inputComune.getAttribute('data-nazione-vincolata');

    // 1. Se il campo è vuoto (l'opzione "Scegli...") -> ERRORE
    if (campo.value === "") {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    }

    // 2. Se c'è un comune scelto ma l'utente cambia nazione a caso
    if (nazioneObbligatoria && campo.value !== nazioneObbligatoria) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    }

    // 3. Se tutto coincide
    campo.classList.add("is-valid");
    campo.classList.remove("is-invalid");
    return true;
}

let databaseComuni = []; // creo il contenitore per i comuni
async function caricaComuni() {
    try{
	//PROMISE:stato di una funzione asincrona	
    const risposta = await fetch('https://api.npoint.io/70bebb9d6157ec903d30'); // 1. Chiamiamo il tuo link npoint(con un'attesa, una promise)
    databaseComuni = await risposta.json(); // 2. Trasformiamo la risposta in una lista leggibile dal computer(
    console.log(databaseComuni);
	
	 const datalist = document.getElementById('listaComuni');

    // 3. Ciclo FOR classico: creiamo le opzioni una per una
    for (let i = 0; i < databaseComuni.length; i++) {
        let record = databaseComuni[i];
        let opt = document.createElement('option');
        
        opt.value = record.comune; // Quello che l'utente scrive o sceglie
        
        datalist.appendChild(opt); //appendChild dice al browser: "Prendi questo elemento opt che ho appena creato e inseriscilo come 'figlio' (child) dentro l'elemento datalist".
	}
	} catch(error)
	{
	console.log("Richiesta Fallita");	
	}
}
	
    window.addEventListener('load', caricaComuni);

function validaEAssocia(input) {
    let nomeScritto = input.value;
    let trovato = false;
    let nazioneTrovata = "";
    let codiceTrovato = ""; // Aggiungiamo questa per il codice belfiore

    for (let i = 0; i < databaseComuni.length; i++) {
        if (databaseComuni[i].comune.toLowerCase() === nomeScritto.toLowerCase()) {
            trovato = true;
            nazioneTrovata = databaseComuni[i].nazione;
            codiceTrovato = databaseComuni[i].codice; // Prendiamo il codice (es. H501)
            break; 
        }
    }

    let campoNazione = document.getElementById('nazioneSelect');

    if (trovato) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        
        campoNazione.value = nazioneTrovata; // Seleziona la nazione corretta
        campoNazione.classList.add("is-valid");
		// serve a "ricordare" la nazione legata al comune
          input.setAttribute('data-nazione-vincolata', nazioneTrovata);//aggiunge un vincolo nascosto

        // SALVATAGGIO SEGRETO: salviamo il codice nell'input per usarlo dopo
        input.setAttribute('data-codice-belfiore', codiceTrovato);
        
    } else {
        // Se non trova nulla o il campo viene svuotato
        input.classList.remove("is-valid");
        input.removeAttribute('data-codice-belfiore');// rimuove codice nascosto
        input.removeAttribute('data-nazione-vincolata');//rimuove il vincolo nascosto
        
        // La nazione torna su "Scegli..." e perde il colore
        campoNazione.value = ""; 
        campoNazione.classList.remove("is-valid");
        
        if (nomeScritto !== "") {
            input.classList.add("is-invalid");
        }
    }
}


function verificaSesso() {
    let m = document.getElementById("m");
    let f = document.getElementById("f");
    let container = document.getElementById("sessoContainer");

   
    if (!m.checked && !f.checked) {
        container.classList.add("is-invalid");
        container.classList.remove("is-valid");
        return false;
    } else {
        container.classList.add("is-valid");
        container.classList.remove("is-invalid");
        return true;
    }
}


function verificaEmail(campo) {
    
    let regEmail = new RegExp("^[^\\s@]+@[^\\s@]+\\.[a-z]{2,}$");

    if (!regEmail.test(campo.value)) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    } else {
        campo.classList.add("is-valid");
        campo.classList.remove("is-invalid");
        return true;
    }
}

function verificaUsername(campo) {
    
    let regUser = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=(.*[0-9]){2})(?=(.*[?@_-]){2})[A-Za-z0-9?@_-]{8,10}$");

    if (!regUser.test(campo.value)) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    } else {
        campo.classList.add("is-valid");
        campo.classList.remove("is-invalid");
        return true;
    }
}

function verificaPassw(campo) {
    
    let regPassw = new RegExp("^(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=[^?@_-]*[?@_-][^?@_-]*$)[A-Za-z0-9?@_-]{8,10}$");

    if (!regPassw.test(campo.value)) {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");
        return false;
    } else {
        campo.classList.add("is-valid");
        campo.classList.remove("is-invalid");
        return true;
    }
}

function confermapassw() {
    let passw = document.reg.pass;
    let confpassw = document.reg.confermaPass; // Deve corrispondere al 'name' nell'HTML

    if (passw.value !== confpassw.value || confpassw.value === "") {
        confpassw.classList.add("is-invalid");
        confpassw.classList.remove("is-valid");
        return false;
    } else {
        confpassw.classList.add("is-valid");
        confpassw.classList.remove("is-invalid");
        return true;
    }
}

function togglePassword(idInput, btn) { //occhio per passwuord
    let input = document.getElementById(idInput);
    let icon = btn.querySelector('i');
    
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");
    }
}


function puliscitutto() {
    
    let elementi = document.querySelectorAll('.form-control, .form-select, #sessoContainer');
    
    elementi.forEach(function(elemento) {
        elemento.classList.remove('is-valid');
        elemento.classList.remove('is-invalid');
    });

    
}

function verificaData() {
    let campoData = document.reg.dataNascita;
    let valore = campoData.value;

    
    if (valore.length === 0) {
        campoData.classList.add("is-invalid");
        campoData.classList.remove("is-valid");
        return false;
    }

    let oggi = new Date();
    let nascita = new Date(valore);
    
    let anni = oggi.getFullYear() - nascita.getFullYear();
    let m = oggi.getMonth() - nascita.getMonth();
    let d = oggi.getDate() - nascita.getDate();

    if (m < 0 || (m === 0 && d < 0)) {
        anni--;
    }

   
    if (anni < 18) {
        campoData.classList.add("is-invalid");
        campoData.classList.remove("is-valid");
        return false;
    } else {
        campoData.classList.add("is-valid");
        campoData.classList.remove("is-invalid");
        return true;
    }
}

function verificaTutto() {
    let nomeOk = verificaCampo(document.reg.nome);
    let cognomeOk = verificaCampo(document.reg.cognome);
	let emailOk= verificaEmail(document.reg.email);
    let cfOk = verificaCF();
    let comOK= verificaComuneObbligatorio();
	let nazOk=verificaSelect(document.reg.nazione);
	let sexOK=verificaSesso();
	let userOK=verificaUsername(document.reg.username);
	let passOK=verificaPassw(document.reg.pass);
	let confpass=confermapassw();
	let dtaOk= verificaData();
  
    return false;
}
