let basket = []; // Speichert alle Gerichte im Warenkorb.
const DELIVERY_COST = 4.99; // Feste Lieferkosten.

function renderDishes() {
    let dishContent = document.getElementById('dishContent'); // Holt den Bereich für die Gerichte.
    dishContent.innerHTML = ''; // Leert den Bereich vor dem Rendern.

    for (let i = 0; i < dishes.length; i++) {
        dishContent.innerHTML += getDishTemplate(i); // Fügt jedes Gericht hinzu.
    }
}

function addToBasket(dishIndex) {
    let basketIndex = findBasketIndex(dishIndex); // Sucht das Gericht im Warenkorb.

    if (basketIndex === -1) {
        basket.push({ dishIndex: dishIndex, amount: 1 }); // Fügt ein neues Gericht hinzu.
    } else {
        basket[basketIndex].amount++; // Erhöht die vorhandene Menge.
    }

    renderBasket(); // Aktualisiert den Warenkorb.
}

function findBasketIndex(dishIndex) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].dishIndex === dishIndex) {
            return i; // Gibt die Position des Gerichts zurück.
        }
    }

    return -1; // Gericht wurde nicht gefunden.
}

function renderBasket() {
    let basketHtml = getBasketContent(); // Erstellt den Warenkorb-Inhalt.

    document.getElementById('basketContent').innerHTML = basketHtml; // Aktualisiert Desktop.
    document.getElementById('mobileBasketContent').innerHTML = basketHtml; // Aktualisiert Mobile.
    updateMobileBasketButton(); // Aktualisiert den Warenkorb in der Bottom-Bar.
}

function getBasketContent() {
    if (basket.length === 0) {
        return 'Dein Warenkorb ist leer.'; // Gibt die Leer-Meldung zurück.
    }

    return getBasketItemsHtml() + getBasketTotalTemplate(); // Gibt Warenkorb und Gesamtpreis zurück.
}

function getBasketItemsHtml() {
    let basketHtml = ''; // Sammelt alle Warenkorb-Artikel.

    for (let i = 0; i < basket.length; i++) {
        basketHtml += getBasketTemplate(i); // Fügt jeden Warenkorb-Artikel hinzu.
    }

    return basketHtml; // Gibt das fertige HTML zurück.
}

function calculateBasketSubtotal() {
    let subtotal = 0; // Startwert der Zwischensumme.

    for (let i = 0; i < basket.length; i++) {
        let dish = dishes[basket[i].dishIndex]; // Holt das passende Gericht.
        subtotal += dish.price * basket[i].amount; // Addiert Preis mal Menge.
    }

    return subtotal; // Gibt die Zwischensumme zurück.
}

function calculateBasketTotal() {
    if (basket.length === 0) {
        return 0; // Bei leerem Warenkorb entstehen keine Lieferkosten.
    }

    return calculateBasketSubtotal() + DELIVERY_COST; // Addiert 4,99 € Lieferkosten.
}

function openMobileBasket() {
    let dialog = document.getElementById('mobileBasketDialog'); // Holt den mobilen Warenkorb.
    dialog.showModal(); // Öffnet den Dialog.
}

function closeMobileBasket() {
    let dialog = document.getElementById('mobileBasketDialog'); // Holt den mobilen Warenkorb.
    dialog.close(); // Schließt den Dialog.
}

function increaseAmount(index) {
    basket[index].amount++; // Erhöht die Menge um 1.
    renderBasket(); // Aktualisiert den Warenkorb.
}

function decreaseAmount(index) {
    if (basket[index].amount > 1) {
        basket[index].amount--; // Verringert die Menge um 1.
    } else {
        basket.splice(index, 1); // Entfernt den Artikel bei Menge 1.
    }

    renderBasket(); // Aktualisiert den Warenkorb.
}

function deleteBasketItem(index) {
    basket.splice(index, 1); // Entfernt das Gericht vollständig.
    renderBasket(); // Aktualisiert den Warenkorb.
}

function orderBasket() {
    basket = []; // Leert den Warenkorb.
    renderBasket(); // Aktualisiert Desktop und Mobile.
    closeMobileBasket(); // Schließt den mobilen Warenkorb.
    openOrderConfirmation(); // Öffnet die Bestellbestätigung.
}

function openOrderConfirmation() {
    let dialog = document.getElementById('orderConfirmationDialog'); // Holt die Bestellbestätigung.
    dialog.showModal(); // Öffnet den Dialog.
}

function closeOrderConfirmation() {
    let dialog = document.getElementById('orderConfirmationDialog'); // Holt die Bestellbestätigung.
    dialog.close(); // Schließt den Dialog.
}

function updateMobileBasketButton() {
    let button = document.getElementById('mobileBasketNavButton'); // Holt den Warenkorb-Button.
    let count = document.getElementById('mobileBasketCount'); // Holt die Mengenanzeige.
    let amount = getBasketAmount(); // Berechnet die gesamte Artikelmenge.

    button.disabled = basket.length === 0; // Aktiviert den Button nur mit Inhalt.
    count.innerHTML = amount; // Zeigt die aktuelle Artikelmenge an.
}

function getBasketAmount() {
    let amount = 0; // Startwert der Artikelmenge.

    for (let i = 0; i < basket.length; i++) {
        amount += basket[i].amount; // Addiert die Menge jedes Warenkorb-Artikels.
    }

    return amount; // Gibt die gesamte Artikelmenge zurück.
}

function formatPrice(price) {
    return price.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
}

renderDishes(); // Rendert beim Seitenstart alle Gerichte.
renderBasket(); // Rendert beim Seitenstart den leeren Warenkorb.
