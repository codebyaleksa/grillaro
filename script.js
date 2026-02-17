let cart = [];

// Elementi
const cartOverlay = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const itemsTotalText = document.getElementById("items-total");
const deliveryText = document.getElementById("delivery-price");
const totalText = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const themeBtns = document.querySelectorAll("#theme-toggle");
const menuGrid = document.getElementById("menu-grid");

function toggleCart() { cartOverlay.classList.toggle("active"); }

// FUNKCIJA ZA DODAVANJE SA SLIKOM
function addToCart(name, price, img) {
    const item = cart.find(p => p.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, img, qty: 1 });
    renderCart();
}

function changeQty(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    if (!cartItems) return;
    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartItems.innerHTML = `<div style="text-align:center; opacity:.5; margin-top:40px">🛒 Korpa je prazna</div>`;
        itemsTotalText.textContent = "0 RSD";
        deliveryText.textContent = "0 RSD";
        totalText.textContent = "0 RSD";
        cartCount.textContent = "0";
        return;
    }

    let itemsTotal = 0, count = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        itemsTotal += itemTotal;
        count += item.qty;
        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.img}" class="cart-img">
            <div style="flex:1">
                <strong>${item.name}</strong><br>
                <small>${item.price} RSD</small>
                <div class="cart-controls">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                    <strong style="margin-left:auto">${itemTotal} RSD</strong>
                </div>
            </div>
        </div>`;
    });

    itemsTotalText.textContent = `${itemsTotal} RSD`;
    const delivery = itemsTotal >= 2000 ? 0 : 200;
    deliveryText.textContent = delivery === 0 ? "Besplatna" : `${delivery} RSD`;
    totalText.textContent = `${itemsTotal + delivery} RSD`;
    cartCount.textContent = count;
}

// FILTERI
if (menuGrid) {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.dataset.category;
            menuGrid.querySelectorAll(".card").forEach(card => {
                if (category === "all" || card.dataset.category === category) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // SORTIRANJE
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", function() {
            const cards = Array.from(menuGrid.querySelectorAll(".card"));
            cards.sort((a, b) => {
                const pA = parseInt(a.dataset.price);
                const pB = parseInt(b.dataset.price);
                if (this.value === "price-asc") return pA - pB;
                if (this.value === "price-desc") return pB - pA;
                if (this.value === "name-asc") return a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent);
                if (this.value === "name-desc") return b.querySelector("h3").textContent.localeCompare(a.querySelector("h3").textContent);
                return 0;
            });
            cards.forEach(c => menuGrid.appendChild(c));
        });
    }
}

// TEMA
themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        const isLight = document.body.classList.contains("light");
        btn.textContent = isLight ? "🌙" : "☀️";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
});
if(localStorage.getItem("theme") === "light") document.body.classList.add("light");

// Postojeća funkcija za otvaranje
function toggleCart() {
    const cartOverlay = document.getElementById("cart");
    cartOverlay.classList.toggle("active");
}

