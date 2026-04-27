//Skapar variabeler
let username = null;
let Loggedin = false;
let timeoutId = null;

//Krypterar lösenordet så man kan inte bara läsa av lätt vad det är
function hashPassword(password) {
    return btoa(password);
}

//Filtrerar det man matar in för att skydda från XSS-atacker
function filterInput(input) {
    return input.replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

//Funktion för att rensa fälten
function rensaFält(){
    document.getElementById('logusername').value = "";
    document.getElementById('logpassword').value = "";
    document.getElementById('regusername').value = "";
    document.getElementById('regpassword').value = "";
    document.getElementById('regconpassword').value = "";
}

// Skapar variabel och kopplar den till en objekt med id
const Inform = document.getElementById('LoginForm');
const Upform = document.getElementById('SignupForm');
const SignInbtn = document.getElementById('SignInBtn');
const SignUpbtn = document.getElementById('SignUpBtn');
const savedLogin = localStorage.getItem("Loggedin");

SignInbtn.addEventListener('click', function (event) {
    if (Loggedin == false) { //Kollar om man är redan inloggad, ifall man inte är ger den möjligheten att logga in
        //Gör de synligt
        Inform.style.display = "block";
        overlay.style.display = "block";
        Upform.style.display = "none";

        // Startar timer så att den försvinner efter en 30 sekunder
        timeoutId = setTimeout(() => {
            Inform.style.display = "none";
            overlay.style.display = "none";
            alert("Tiden är ute, försök igen!");
            rensaFält();
        }, 30000);
    }
    else {
        //Om man är inloggad loggar den ut användaren
        Loggedin = false;
        username = null;

        //Tar bort när man loggar ut
        localStorage.removeItem("Loggedin");
        localStorage.removeItem("currentUser");

        //Ändrar text
        SignInbtn.textContent = "Logga in";
        SignUpbtn.style.display = "block";

        //Tar bort classen och meddelar om att man har loggat ut
        document.body.classList.remove("Loggedin");
        alert("Du har blivit utloggad!");
    }
});

Inform.addEventListener('submit', function (event) {
    event.preventDefault(); //Kontroll så att man inte lämnar något tomt

    //Det man skriver får något värde
    const logusername = filterInput(document.getElementById('logusername').value);
    const logpassword = document.getElementById('logpassword').value;

    //Hämtar sparade lösenord och användarnamn
    const saveusername = localStorage.getItem('username');
    const savepassword = localStorage.getItem('password');

    //Kollar om lösenorden och användarnamnen matchar
    if (logusername == saveusername && hashPassword(logpassword) == savepassword) {
        username = logusername;
        Loggedin = true;

        //Sparar information om att man är inloggad och användarnamnet
        localStorage.setItem("Loggedin", true);
        localStorage.setItem("currentUser", username);
        document.body.classList.add("Loggedin");

        //Ändrar text och gör vissa komponenter osynliga
        SignInbtn.textContent = "Logga ut";
        Inform.style.display = "none";
        SignUpbtn.style.display = "none";
        overlay.style.display = "none";

        clearTimeout(timeoutId); //stänger av timern

        alert("Inloggad som " + username);//Visar en alert med användarnamnet

    } else if (logusername == saveusername) {
        alert("Fel lösenord!");
    } else {
        alert("Kontot existerar inte!");
    }
    //Rensar inloggningsfälten
    rensaFält();
});

SignUpbtn.addEventListener('click', function (event) {
    //Gör de synligt
    Upform.style.display = "block";
    overlay.style.display = "block";
    Inform.style.display = "none";

    // Startar timer så att den försvinner efter en 30 sekunder
    timeoutId = setTimeout(() => {
        Upform.style.display = "none";
        overlay.style.display = "none";
        alert("Tiden är ute, försök igen!");
        rensaFält();
    }, 30000);
});

Upform.addEventListener('submit', function (event) {
    event.preventDefault(); //Kontroll så att man inte lämnar något tomt

    //Sparar informationen i var sin variabel
    const regusername = filterInput(document.getElementById('regusername').value);
    const regpassword = document.getElementById('regpassword').value;
    const regconpassword = document.getElementById('regconpassword').value;

    if (regusername && regpassword && regconpassword) {
        //Kollar om båda lösenorden passar
        if (regpassword == regconpassword) {
            //Ifall de passar sparas informationen lokalt
            localStorage.setItem('username', regusername);
            localStorage.setItem('password', hashPassword(regpassword));

            //Ger meddelande och döljer formen
            alert("Konto skapat! Du kan nu logga in!");
            Upform.style.display = "none";
            overlay.style.display = "none";

            clearTimeout(timeoutId); //stänger av timern

        } else {
            alert("Lösenorden passar inte!");
        }
    } else {
        alert("Lämna inget tomt!");
    }
    //Rensar fälten
    rensaFält();
});

//Kollar ifall man är inloggad när man öppnar sidan
if (savedLogin == "true") {
    Loggedin = true;
    username = localStorage.getItem("currentUser");

    document.body.classList.add("Loggedin");
    SignInbtn.textContent = "Logga ut";
    SignUpbtn.style.display = "none";
}
