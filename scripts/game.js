
const cardFront = document.querySelectorAll(".card-front");
console.log(cardFront);
const cardBacks = document.querySelectorAll('.card-back');

const start = document.getElementById('begin-button');
console.log('start button');
console.log(start);
const gameBoard = document.querySelector('.game-board');

const cardsContainer = document.querySelectorAll(".card");

let flippedCards = [];
let lock = false;



class Cards {
    constructor(img, alt, number) {
        this.src = img;
        this.alt = alt;
        this.number = number;
    }
}


const cards = [];
cards[0] = new Cards('./images/boo.png', 'boo', 1);
cards[1] = new Cards('./images/boo.png', 'boo', 1);
cards[2] = new Cards('./images/Luigi.png', 'Luigi', 2);
cards[3] = new Cards('./images/Luigi.png', 'Luigi', 2);
cards[4] = new Cards('./images/Mario.png', 'Mario', 3);
cards[5] = new Cards('./images/Mario.png', 'Mario', 3);
cards[6] = new Cards('./images/Peach.png', 'Peach', 4);
cards[7] = new Cards('./images/Peach.png', 'Peach', 4);
cards[8] = new Cards('./images/Toad.png', 'Toad', 5);
cards[9] = new Cards('./images/Toad.png', 'Toad', 5);
cards[10] = new Cards('./images/Waluigi.png', 'Waluigi', 6);
cards[11] = new Cards('./images/Waluigi.png', 'Waluigi', 6);
cards[12] = new Cards('./images/Yoshi.png', 'Yoshi', 7);
cards[13] = new Cards('./images/Yoshi.png', 'Yoshi', 7);




function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

const shuffledCards = shuffleCards(cards);

cardsContainer.forEach((cardItem, i) => {
    const cardData = cards[i];
    const cardFront = cardItem.querySelector('.card-front');
    cardFront.src = cardData.src;
    cardFront.alt = cardData.alt;
    console.log(cardItem);
    cardItem.addEventListener('click', clickCard);
})



function disableClicks() {
    cardsContainer.forEach(cardItem => {
        cardItem.style.pointerEvents = 'none';
    });
}

function clickCard(event) {
    //if statemnent if locked cards is true or if match is true then you return 
    // if lock is true
    if (lock) {
        return;
    }
    const target = event.currentTarget;
    const cardFront = target.querySelector('.card-front');
    const cardBack = target.querySelector('.card-back');
    target.classList.add('flipped');
    cardBack.style.display = 'none';
    cardFront.style.display = 'block';
    if (!target) {
        console.log("target undefinded")
        return;
    }
    console.log(event.currentTarget);
    flippedCards.push(target);

    if (flippedCards.length === 2) {
        lock = true;
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];

        const card1Data = cards.find(cards => cards.alt === card1.querySelector('.card-front').alt);
        const card2Data = cards.find(cards => cards.alt === card2.querySelector('.card-front').alt);
        console.log(card1Data);

        if (card1Data.alt === card2Data.alt && card1 !== card2) {

            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
            // this console log resturns the console with the matched class list applied
            console.log(flippedCards[0]);
            flippedCards = [];
            lock = false;

            if (isGameWon()) {
                winGame();
                return;
            }
        } else {

            setTimeout(() => {
                flippedCards[0].classList.remove('flipped');
                flippedCards[1].classList.remove('flipped');
                flippedCards.forEach(card => {
                    card.querySelector('.card-front').style.display = "none";
                    card.querySelector('.card-back').style.display = "block";
                })
                flippedCards = [];
                lock = false;
                enableClicks();
                decreaseTurn();
                if (isGameOver()) {
                    endGame();
                    return;
                }
                console.log(flippedCards[0]);
                console.log(cardFront);
                console.log(cardBack);

            }, 1000);
        }
    }
}

// Enable clicks when two cards are flipped:
function enableClicks() {
    cardsContainer.forEach(cardItem => {
        cardItem.style.pointerEvents = 'auto';
    });
}
//turns
const maxTurns = 6;
const turnsDisplay = document.getElementById('turn-out');
let remainingTurns = maxTurns;
updateTurnsDisplay();

function updateTurnsDisplay() {
    console.log('update turn display');
    turnsDisplay.innerText = remainingTurns;
    console.log(turnsDisplay);
}

function decreaseTurn() {
    remainingTurns--;
    updateTurnsDisplay();
}

function isGameOver() {
    return remainingTurns === 0;
}

function endGame() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";

    // Event listener for "Play Again" button
    document.getElementById("play-again-btn").addEventListener("click", function () {
        resetGame();
        modal.style.display = "none";
    });


    // Event listener for "Exit" button
    document.getElementById("exit-btn").addEventListener("click", () => {
        modal.style.display = "none"; // Hide the modal
        thanksforplaying();
    });
}
function isGameWon() {
    const matchedCards = document.querySelectorAll('.matched');
    return matchedCards.length === cards.length;
}

function winGame() {
    const win = document.getElementById("win");
    win.style.display = "block";

    // Event listener for "Play Again" button
    document.getElementById("play-again-btns").addEventListener("click", function () {
        resetGame();
        win.style.display = "none";
    });

    // Event listener for "Exit" button
    document.getElementById("exit-btns").addEventListener("click", () => {
        modal.style.display = "none"; // Hide the modal
        thanksforplaying();
    });
}
function thanksforplaying() {
    const tfp = document.getElementById("thank");
    tfp.style.display = "block";
}
function resetGame() {
    // Reset flipped cards
    flippedCards = [];
    cardsContainer.forEach(cardItem => {
        cardItem.classList.remove('flipped', 'matched');
        cardItem.querySelector('.card-front').style.display = 'none';
        cardItem.querySelector('.card-back').style.display = 'block';
    });


    remainingTurns = maxTurns;
    updateTurnsDisplay();


    shuffleCards();
    cardsContainer.forEach((cardItem, i) => {
        const cardData = shuffledCards[i];
        const cardFront = cardItem.querySelector('.card-front');
        cardFront.src = cardData.src;
        cardFront.alt = cardData.alt;
        cardItem.addEventListener('click', clickCard);
    });
}
console.log(clickCard);