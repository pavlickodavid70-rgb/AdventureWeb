
const menuButton = document.getElementById("menuButton");

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }
}
const menuLinks = document.querySelectorAll(".nav-links a");

menuLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        document.getElementById("navLinks").classList.remove("active");
    });
});
const aktivita = document.getElementById("aktivita");
const osoby = document.getElementById("osoby");
const cena = document.getElementById("cena");
const cenaZaOsobuElement = document.getElementById("cenaZaOsobu");
const skrytaCena = document.getElementById("skrytaCena");
function vypocitajCenu() {
    let cenaZaOsobu = 0;

    if (aktivita.value === "Turistika") {
        cenaZaOsobu = 25;
    } else if (aktivita.value === "Lezenie") {
        cenaZaOsobu = 40;
    } else if (aktivita.value === "Paragliding") {
        cenaZaOsobu = 90;
    }

    const pocetOsob = Number(osoby.value) || 0;

    // Ak ešte nie je vybraná aktivita alebo počet osôb
    if (!aktivita.value || !osoby.value) {
        cenaZaOsobuElement.textContent = "Cena za osobu: —";
        cena.textContent = "Celková cena: —";
        skrytaCena.value = "0 €";
        return;
    }

    const celkovaCena = cenaZaOsobu * pocetOsob;

    cenaZaOsobuElement.textContent =
        "Cena za osobu: " + cenaZaOsobu + " €";

    cena.textContent =
        "Celková cena: " + celkovaCena + " €";

    skrytaCena.value = celkovaCena + " €";
}
aktivita.addEventListener("change", vypocitajCenu);
osoby.addEventListener("change", vypocitajCenu);
const datum = document.getElementById("datum");

const dnes = new Date();
const rok = dnes.getFullYear();
const mesiac = String(dnes.getMonth() + 1).padStart(2, "0");
const den = String(dnes.getDate()).padStart(2, "0");

datum.min = `${rok}-${mesiac}-${den}`;
const formular = document.getElementById("contactForm");
const spravaUspesne = document.getElementById("spravaUspesne");
formular.addEventListener("submit", async function(event) {
    spravaUspesne.textContent = "";
    event.preventDefault();

    const tlacidlo = formular.querySelector('button[type="submit"]');

    tlacidlo.textContent = "Odosielam...";
    tlacidlo.disabled = true;

    const data = new FormData(formular);

    const response = await fetch(formular.action, {
        method: "POST",
        body: data,
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        spravaUspesne.textContent =
            "✅ Rezervácia bola odoslaná! Ďakujeme, čoskoro ťa budeme kontaktovať.";

        formular.reset();

        cenaZaOsobuElement.textContent = "Cena za osobu: —";
        cena.textContent = "Celková cena: —";
        skrytaCena.value = "0 €";

        tlacidlo.textContent = "Odoslať";
        tlacidlo.disabled = false;

    } else {
        spravaUspesne.textContent =
            "❌ Nastala chyba. Skús to prosím znova.";

        tlacidlo.textContent = "Odoslať";
        tlacidlo.disabled = false;
    }
});const scrollCards = document.querySelectorAll(".scroll-card");

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const card = entry.target;
            const index = Array.from(scrollCards).indexOf(card);

            setTimeout(function() {
                card.classList.add("show");
            }, index * 200);

            observer.unobserve(card);
        }
    });
});

scrollCards.forEach(function(card) {
    observer.observe(card);
});