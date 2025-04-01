
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
cards[0] = new Cards('./images/boo.jpeg', 'boo', 1);
cards[1] = new Cards('./images/boo.jpeg', 'boo', 1);
cards[2] = new Cards('./images/Luigi.jpeg', 'Luigi', 2);
cards[3] = new Cards('./images/Luigi.jpeg', 'Luigi', 2);
cards[4] = new Cards('./images/Mario.jpeg', 'Mario', 3);
cards[5] = new Cards('./images/Mario.jpeg', 'Mario', 3);
cards[6] = new Cards('./images/Peach.jpeg', 'Peach', 4);
cards[7] = new Cards('./images/Peach.jpeg', 'Peach', 4);
cards[8] = new Cards('./images/Toad.jpeg', 'Toad', 5);
cards[9] = new Cards('./images/Toad.jpeg', 'Toad', 5);
cards[10] = new Cards('./images/Waluigi.jpeg', 'Waluigi', 6);
cards[11] = new Cards('./images/Waluigi.jpeg', 'Waluigi', 6);
cards[12] = new Cards('./images/Yoshi.jpeg', 'Yoshi', 7);
cards[13] = new Cards('./images/Yoshi.jpeg', 'Yoshi', 7);


