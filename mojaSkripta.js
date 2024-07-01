var slike = document.querySelectorAll(".slikaOverlay");
var dugmad = document.querySelectorAll(".dugme");

  slike.forEach(function(slika) {
      slika.addEventListener("mouseenter", function(){
          slika.classList.add("overlay");
          prikaziDugme(slika);
      });

      slika.addEventListener("mouseleave", function(){
          slika.classList.remove("overlay");
          sakrijDugme(slika);
      });
  });

  dugmad.forEach(function(dugme) {
      dugme.addEventListener("mouseenter", function(){
          var slika = pronadjiSliku(dugme);
          if (slika) {
              slika.classList.add("overlay");
              prikaziDugme(slika);
          }
      });
  });

  function prikaziDugme(slika) {
      var dugme = pronadjiDugme(slika);
      if (dugme) {
          dugme.style.display = 'block';
          dugme.style.setProperty('display', 'block', 'important');
      }
  }

  function sakrijDugme(slika) {
      var dugme = pronadjiDugme(slika);
      if (dugme) {
          dugme.style.display = 'none';
          dugme.style.setProperty('display', 'none', 'important');
      }
  }

  function pronadjiDugme(slika) {
      var indeks = Array.from(slike).indexOf(slika);
      return dugmad[indeks];
  }

  function pronadjiSliku(dugme) {
      var indeks = Array.from(dugmad).indexOf(dugme);
      return slike[indeks];
  }

  

 /*alert*/
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
let currentAlert = null;

const appendAlert = (message, type) => {
    removeAlert();

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
const removeAlert = () => {
    if (currentAlert) {
        alertPlaceholder.removeChild(currentAlert);
        currentAlert = null;
    }
};

/*forma*/
function posaljiFormu() {
    var ime = document.getElementById('name');
    var prezime = document.getElementById('surname');
    var phone = document.getElementById('phone');
    var email = document.getElementById('e-mail');
    var poruka = document.getElementById('poruka');

    if (ime.value === '' || prezime.value === '' || email.value === '' || poruka.value === '' || phone.value === '') {
        appendAlert('Molimo Vas da popunite sva polja!', 'danger');
        return false;
    }

    appendAlert('Uspešno poslato!', 'success');
    
    ime.value = '';
    prezime.value = '';
    phone.value = '';
    email.value = '';
    poruka.value = '';
    return true;
}


/*anketa jQuery*/

$(document).ready(function() {
    
    function izracunajProsek(pitanje) {
        var ocene = localStorage.getItem(pitanje);
        if (ocene) {
            var oceneNiz = JSON.parse(ocene);
            var suma = oceneNiz.reduce(function(a, b) { return a + b; }, 0);
            return suma / oceneNiz.length;
        }
        return 0;
    }

    function postaviBoju(pitanje, div) {
        var prosek = izracunajProsek(pitanje);
        div.removeClass("niskiDiv srednjiDiv visokiDiv");
        if (prosek >= 1 && prosek < 2.5) {
            div.addClass("niskiDiv");
        } else if (prosek >= 2.5 && prosek < 3.5) {
            div.addClass("srednjiDiv");
        } else {
            div.addClass("visokiDiv");
        }
    }

    $("#anketaForma").submit(function(e) {
        e.preventDefault();
        
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

        
        postaviBoju("pitanje1", $("#prviDiv"));
        postaviBoju("pitanje2", $("#drugiDiv"));
        postaviBoju("pitanje3", $("#treciDiv"));
        postaviBoju("pitanje4", $("#cetvrtiDiv"));
        postaviBoju("pitanje5", $("#petiDiv"));
    });
});

