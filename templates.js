function getDishTemplate(index) {
    let dish = dishes[index]; // Holt das aktuelle Gericht aus dem Array.

    return `
        <article class="dish-card">
            <img class="dish-image" src="${dish.image}" alt="${dish.name}">
            <div class="dish-info">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
            </div>
            <div class="dish-actions">
                <strong>${formatPrice(dish.price)}</strong>
                <button class="dish-button" onclick="addToBasket(${index})">
                    In den Warenkorb
                </button>
            </div>
        </article>
    `;
}

function getBasketTemplate(index) {
    let basketItem = basket[index]; // Holt den aktuellen Warenkorb-Eintrag.
    let dish = dishes[basketItem.dishIndex]; // Holt das passende Gericht.

    return `
        <div class="basket-item">
            <strong>${dish.name}</strong>
            <span>${formatPrice(dish.price * basketItem.amount)}</span>
            <div class="basket-controls">
                <button onclick="decreaseAmount(${index})">−</button>
                <span>${basketItem.amount}</span>
                <button onclick="increaseAmount(${index})">+</button>
                <button onclick="deleteBasketItem(${index})">🗑️</button>
            </div>
        </div>
    `;
}

function getBasketTotalTemplate() {
    return `
        <div class="basket-cost-row">
            <span>Zwischensumme</span>
            <span>${formatPrice(calculateBasketSubtotal())}</span>
        </div>

        <div class="basket-cost-row">
            <span>Lieferkosten</span>
            <span>${formatPrice(DELIVERY_COST)}</span>
        </div>

        <div class="basket-total">
            <span>Gesamt</span>
            <strong>${formatPrice(calculateBasketTotal())}</strong>
        </div>

        <button class="order-button" onclick="orderBasket()">
            Jetzt bestellen
        </button>
    `;
}
