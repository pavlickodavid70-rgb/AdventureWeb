
function toggleMenu() {

    const navLinks = document.getElementById("navLinks");

    navLinks.classList.toggle("active");

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
const skrytaCena = document.getElementById("skrytaCena");
function vypocitajCenu() {
    let cenaZaOsobu = 0;

    if (aktivita.value === "Turistika") {
        cenaZaOsobu = 25;
    } else if (aktivita.value === "Lezenie") {
        cenaZaOsobu = 40;
    } else if (aktivita.value === "Paragliding") {
        cenaZaOsobu = 80;
    }

    const pocetOsob = Number(osoby.value) || 0;
    const celkovaCena = cenaZaOsobu * pocetOsob;

    cena.textContent = "Cena: " + celkovaCena + " €";
    skrytaCena.value = celkovaCena + " €";
}

aktivita.addEventListener("change", vypocitajCenu);
osoby.addEventListener("change", vypocitajCenu);
const formular = document.getElementById("contactForm");
const spravaUspesne = document.getElementById("spravaUspesne");

formular.addEventListener("submit", async function(event) {
    event.preventDefault();

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
    } else {
        spravaUspesne.textContent =
            "❌ Nastala chyba. Skús to prosím znova.";
    }
});