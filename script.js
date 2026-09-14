let basket = [];

function renderDishes() {
    let dishContent = document.getElementById('dishContent');
    dishContent.innerHTML = '';

    for (let i = 0; i < dishes.length; i++) {
        dishContent.innerHTML += getDishTemplate(i);
    }
}

function getDishTemplate(index) {
    let dish = dishes[index];

    return `
        <article class="dish-card">
            <img class="dish-image" src="${dish.image}" alt="${dish.name}">
            <div class="dish-info"><h3>${dish.name}</h3><p>${dish.description}</p></div>
            <div class="dish-actions"><strong>${formatPrice(dish.price)}</strong>
            <button class="dish-button" onclick="addToBasket(${index})">In den Warenkorb</button></div>
        </article>
    `;
}

function addToBasket(dishIndex) {
    let basketIndex = findBasketIndex(dishIndex);

    if (basketIndex === -1) {
        basket.push({ dishIndex: dishIndex, amount: 1 });
    } else {
        basket[basketIndex].amount++;
    }

    renderBasket();
}

function findBasketIndex(dishIndex) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].dishIndex === dishIndex) {
            return i;
        }
    }

    return -1;
}

function renderBasket() {
    let basketContent = document.getElementById('basketContent');

    if (basket.length === 0) {
        basketContent.innerHTML = 'Dein Warenkorb ist leer.';
        return;
    }

    basketContent.innerHTML = '';

    for (let i = 0; i < basket.length; i++) {
        basketContent.innerHTML += getBasketTemplate(i);
    }

    basketContent.innerHTML += getBasketTotalTemplate();
}

function calculateBasketTotal() {
    let total = 0;

    for (let i = 0; i < basket.length; i++) {
        let dish = dishes[basket[i].dishIndex];
        total += dish.price * basket[i].amount;
    }

    return total;
}

function getBasketTotalTemplate() {
    return `
        <div class="basket-total">
            <span>Gesamt</span>
            <strong>${formatPrice(calculateBasketTotal())}</strong>
        </div>

        <button class="order-button" onclick="orderBasket()">
            Jetzt bestellen
        </button>
    `;
}

function orderBasket() {
    basket = [];
    let basketContent = document.getElementById('basketContent');
    basketContent.innerHTML = getOrderConfirmationTemplate();
}

function getOrderConfirmationTemplate() {
    return `
        <div class="order-confirmation">
            ✅ Testbestellung erfolgreich!
            <p>Vielen Dank für deine Bestellung.</p>
        </div>
    `;
}

function getBasketTemplate(index) {
    let basketItem = basket[index];
    let dish = dishes[basketItem.dishIndex];

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

function increaseAmount(index) {
    basket[index].amount++;
    renderBasket();
}

function decreaseAmount(index) {
    if (basket[index].amount > 1) {
        basket[index].amount--;
    } else {
        basket.splice(index, 1);
    }

    renderBasket();
}

function deleteBasketItem(index) {
    basket.splice(index, 1);
    renderBasket();
}

function formatPrice(price) {
    return price.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
}

renderDishes();
