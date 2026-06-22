let cards = [];
let suits = [];
let sumA1 = 0;
let sumA11 = 0;
let possibleSuits = ["♠️", "♣️", "♦️", "♥️"];

let hasBlackJack = false;
let isAlive = false;
let message = "";

let player = {
    name: "Elon",
    chips: "1.1 Trillion",
};

let playerEl = document.getElementById("player-el");
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardEl = document.getElementById("card-el");

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 52) + 1;
    return randomNumber;
}

function startGame() {
    let consistA = false;
    isAlive = true;
    sumA1 = 0;
    sumA11 = 0;

    let randomCard1 = getRandomCard();
    let randomCard2 = getRandomCard();
    let firstCard = Math.ceil(randomCard1 / 4);
    let secondCard = Math.ceil(randomCard2 / 4);
    let firstSuit = possibleSuits[randomCard1 % 4];
    let secondSuit = possibleSuits[randomCard2 % 4];
    cards = [firstCard, secondCard];
    suits = [firstSuit, secondSuit];

    for (let i = 0; i < cards.length; i++) {
        if (cards[i] > 10) {
            sumA1 += 10;
            sumA11 += 10;
        } else if (cards[i] === 1) {
            sumA1 += 1;
            sumA11 += 11;
            consistA = true;
        } else {
            sumA1 += cards[i];
            sumA11 += cards[i];
        }
    }
    renderGame();
}

function renderGame() {
    if (sumA1 === 21 || sumA11 === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    } else if (Math.min(sumA1, sumA11) < 21) {
        message = "Do you wanna draw a new card?";
    } else {
        message = "You're dead!";
        isAlive = false;
    }

    messageEl.textContent = message;
    if (sumA1 !== sumA11) sumEl.textContent = "Sum: " + sumA1 + " / " + sumA11;
    else sumEl.textContent = "Sum: " + sumA1;
    cardEl.textContent = "Card:";

    for (let i = 0; i < cards.length; i++) {
        let displayCard = "";
        if (cards[i] === 1) displayCard = "A";
        else if (cards[i] === 11) displayCard = "J";
        else if (cards[i] === 12) displayCard = "Q";
        else if (cards[i] === 13) displayCard = "K";
        else displayCard = cards[i];
        cardEl.textContent += " " + displayCard + suits[i];
    }
}

function newCard() {
    if (isAlive) {
        let randomCard = getRandomCard();
        let card = Math.ceil(randomCard / 4);
        let suit = possibleSuits[randomCard % 4];
        cards.push(card);
        suits.push(suit);

        if (card > 10) {
            sumA1 += 10;
            sumA11 += 10;
        } else if (card === 1) {
            sumA1 += 1;
            sumA11 += 11;
            consistA = true;
        } else {
            sumA1 += card;
            sumA11 += card;
        }
        renderGame();
    }
}
