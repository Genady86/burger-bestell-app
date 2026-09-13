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
            <div class="dish-info">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
            </div>
            <div class="dish-actions">
                <strong>${formatPrice(dish.price)}</strong>
                <button class="dish-button" type="button">In den Warenkorb</button>
            </div>
        </article>
    `;
}

function formatPrice(price) {
    return price.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
}

renderDishes();
