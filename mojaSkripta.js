// Pronalazi sve elemente sa klasama "slikaOverlay" i "dugme"
var slike = document.querySelectorAll(".slikaOverlay");
var dugmad = document.querySelectorAll(".dugme");

// Dodaje događaje za miša (hover) na slike
slike.forEach(function(slika) {
    // Kada miš uđe iznad slike, dodaje klasu "overlay" i prikazuje dugme
    slika.addEventListener("mouseenter", function(){
        slika.classList.add("overlay");
        prikaziDugme(slika);
    });

    // Kada miš napusti sliku, uklanja klasu "overlay" i sakriva dugme
    slika.addEventListener("mouseleave", function(){
        slika.classList.remove("overlay");
        sakrijDugme(slika);
    });
});

// Dodaje događaje za miša na dugmad
dugmad.forEach(function(dugme) {
    // Kada miš uđe iznad dugmeta, pronalazi odgovarajuću sliku, dodaje klasu "overlay" i prikazuje dugme
    dugme.addEventListener("mouseenter", function(){
        var slika = pronadjiSliku(dugme);
        if (slika) {
            slika.classList.add("overlay");
            prikaziDugme(slika);
        }
    });
});

// Funkcija koja prikazuje dugme za određenu sliku
function prikaziDugme(slika) {
    var dugme = pronadjiDugme(slika);
    if (dugme) {
        dugme.style.display = 'block';
        dugme.style.setProperty('display', 'block', 'important');
    }
}

// Funkcija koja sakriva dugme za određenu sliku
function sakrijDugme(slika) {
    var dugme = pronadjiDugme(slika);
    if (dugme) {
        dugme.style.display = 'none';
        dugme.style.setProperty('display', 'none', 'important');
    }
}

// Funkcija koja pronalazi dugme povezano sa određenom slikom
function pronadjiDugme(slika) {
    var indeks = Array.from(slike).indexOf(slika);
    return dugmad[indeks];
}

// Funkcija koja pronalazi sliku povezanu sa određenim dugmetom
function pronadjiSliku(dugme) {
    var indeks = Array.from(dugmad).indexOf(dugme);
    return slike[indeks];
}


/* Kod za prikazivanje i uklanjanje upozorenja (alert) */
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
let currentAlert = null;

// Funkcija koja dodaje novo upozorenje (alert) na stranicu
const appendAlert = (message, type) => {
    removeAlert(); // Uklanja prethodno upozorenje, ako postoji

    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.appendChild(wrapper);
    currentAlert = wrapper;
};

// Funkcija koja uklanja trenutno prikazano upozorenje (alert)
const removeAlert = () => {
    if (currentAlert) {
        alertPlaceholder.removeChild(currentAlert);
        currentAlert = null;
    }
};

/* Kod za validaciju i slanje forme */
function posaljiFormu() {
    // Prikupljanje vrednosti unetih u formu
    var ime = document.getElementById('name');
    var prezime = document.getElementById('surname');
    var phone = document.getElementById('phone');
    var email = document.getElementById('e-mail');
    var poruka = document.getElementById('poruka');

    // Proverava da li su sva polja popunjena
    if (ime.value === '' || prezime.value === '' || email.value === '' || poruka.value === '' || phone.value === '') {
        appendAlert('Molimo Vas da popunite sva polja!', 'danger'); // Prikazuje upozorenje ako nisu popunjena
        return false;
    }

    appendAlert('Uspešno poslato!', 'success'); // Prikazuje poruku o uspešnom slanju
    
    // Resetuje vrednosti polja
    ime.value = '';
    prezime.value = '';
    phone.value = '';
    email.value = '';
    poruka.value = '';
    return true;
}


/* Kod za anketu korišćenjem jQuery-a */
$(document).ready(function() {
    
    // Funkcija koja izračunava prosečnu ocenu za određeno pitanje
    function izracunajProsek(pitanje) {
        var ocene = localStorage.getItem(pitanje);
        if (ocene) {
            var oceneNiz = JSON.parse(ocene);
            var suma = oceneNiz.reduce(function(a, b) { return a + b; }, 0);
            return suma / oceneNiz.length;
        }
        return 0;
    }

    // Funkcija koja postavlja boju div-a na osnovu prosečne ocene
    function postaviBoju(pitanje, div) {
        var prosek = izracunajProsek(pitanje);
        div.removeClass("niskiDiv srednjiDiv visokiDiv");
        if (prosek >= 1 && prosek < 2.5) {
            div.addClass("niskiDiv"); // Niska prosečna ocena
        } else if (prosek >= 2.5 && prosek < 3.5) {
            div.addClass("srednjiDiv"); // Srednja prosečna ocena
        } else {
            div.addClass("visokiDiv"); // Visoka prosečna ocena
        }
    }

    // Obrada događaja slanja forme za anketu
    $("#anketaForma").submit(function(e) {
        e.preventDefault(); // Sprečava standardno slanje forme
        
        var pitanja = ["pitanje1", "pitanje2", "pitanje3", "pitanje4", "pitanje5"];
        pitanja.forEach(function(pitanje) {
            var ocena = parseInt($("#" + pitanje).val());
            var ocene = localStorage.getItem(pitanje);
            if (ocene) {
                var oceneNiz = JSON.parse(ocene);
                oceneNiz.push(ocena);
                localStorage.setItem(pitanje, JSON.stringify(oceneNiz));
            } else {
                localStorage.setItem(pitanje, JSON.stringify([ocena]));
            }
        });

        // Ažurira boju za svaki div na osnovu proseka
        postaviBoju("pitanje1", $("#prviDiv"));
        postaviBoju("pitanje2", $("#drugiDiv"));
        postaviBoju("pitanje3", $("#treciDiv"));
        postaviBoju("pitanje4", $("#cetvrtiDiv"));
        postaviBoju("pitanje5", $("#petiDiv"));
    });
});
