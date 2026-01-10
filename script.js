document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll za anchor linkove
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Fade-in efekat na skrol
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // Scroll to top dugme
  const scrollBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Otvaranje / zatvaranje korpe
  const openCartBtn = document.getElementById("idiUKorpu");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartSidebar = document.getElementById("cartSidebar");

  openCartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("open");
  });
  closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });
});

// Dodavanje proizvoda u korpu
function dodajUKorpu(naziv, cena) {
  const lista = document.getElementById("cartItems");

  const postojeci = Array.from(lista.children).find(li =>
    li.querySelector(".naziv")?.textContent === naziv
  );

  if (postojeci) {
    const kolicinaEl = postojeci.querySelector(".kolicina");
    let kolicina = parseInt(kolicinaEl.textContent);
    kolicinaEl.textContent = ++kolicina;
  } else {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="naziv">${naziv}</span> -
      <span class="cena">${cena}</span> RSD -
      <span class="kolicina">1</span>
      <button class="smanji">−</button>
    `;
    lista.appendChild(li);

    // Dugme za smanjenje
    li.querySelector(".smanji").addEventListener("click", function () {
      const kolicinaEl = li.querySelector(".kolicina");
      let kolicina = parseInt(kolicinaEl.textContent);
      if (kolicina > 1) {
        kolicinaEl.textContent = --kolicina;
      } else {
        li.remove();
      }
      azurirajUkupnuCenu();
    });
  }

  azurirajUkupnuCenu();
  document.getElementById("cartSidebar").classList.add("open"); // automatski otvori
}

// Ažuriranje ukupne cene
function azurirajUkupnuCenu() {
  const stavke = document.querySelectorAll("#cartItems li");
  let ukupno = 0;
  stavke.forEach(stavka => {
    const cena = parseInt(stavka.querySelector(".cena").textContent);
    const kolicina = parseInt(stavka.querySelector(".kolicina").textContent);
    ukupno += cena * kolicina;
  });
  document.getElementById("ukupnaCena").textContent = `Ukupno: ${ukupno} RSD`;
}

function dodajUKorpu(naziv, cena) {
  const lista = document.getElementById("cartItems");

  const postojeci = Array.from(lista.children).find(li =>
    li.querySelector(".naziv")?.textContent === naziv
  );

  if (postojeci) {
    const kolicinaEl = postojeci.querySelector(".kolicina");
    let kolicina = parseInt(kolicinaEl.textContent);
    kolicina++;
    kolicinaEl.textContent = kolicina;

    // Izračunaj ukupnu cenu za tu stavku
    const ukupnaCenaEl = postojeci.querySelector(".ukupnaCena");
    ukupnaCenaEl.textContent = `${cena * kolicina} RSD`;
  } else {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="naziv">${naziv}</span> -
      <span class="ukupnaCena">${cena} RSD</span> - 
      <span class="kolicina">1</span>
      <button class="smanji">−</button>
    `;
    lista.appendChild(li);

    li.querySelector(".smanji").addEventListener("click", function () {
      const kolicinaEl = li.querySelector(".kolicina");
      let kolicina = parseInt(kolicinaEl.textContent);
      if (kolicina > 1) {
        kolicina--;
        kolicinaEl.textContent = kolicina;

        // Update ukupne cene
        const ukupnaCenaEl = li.querySelector(".ukupnaCena");
        ukupnaCenaEl.textContent = `${cena * kolicina} RSD`;
      } else {
        li.remove();
      }
      azurirajUkupnuCenu();
    });
  }

  azurirajUkupnuCenu();
}

function azurirajUkupnuCenu() {
  const stavke = document.querySelectorAll("#cartItems li");
  let ukupno = 0;

  stavke.forEach(stavka => {
    const cenaTekst = stavka.querySelector(".ukupnaCena").textContent;
    // cenaTekst je npr "700 RSD", pa izvuci broj pre razmaka
    const cena = parseInt(cenaTekst.split(" ")[0]);
    ukupno += cena;
  });

  document.getElementById("ukupnaCena").textContent = `Ukupno: ${ukupno} RSD`;
}
