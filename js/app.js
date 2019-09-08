/*
 * Create a list that holds all of your cards
 */
let cardSet = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openedCards = [];
let foundPairs = 0;

function openCard(listItem) {
    listItem.classList.add("open", "show");
}

function addToOpenedCards(listItem) {
    openedCards.push(listItem);
}

function cardsMatched() {
    return openedCards[0].getAttribute("card") === openedCards[1].getAttribute("card");
}

function lockCards() {
    for(let card of openedCards) {
        card.classList.remove("open", "show");
        card.classList.add("match");
    }
    openedCards = [];
}

function closeCards() {
    for(let card of openedCards) {
        card.classList.remove("open", "show");
    }
    openedCards = [];
}

function cardClicked(event) {
    //close not matched cards
    if(openedCards.length === 2) {
        closeCards();
    }

    let listItem;
    // get list item if the icon is clicked
    if (event.target.localName === "i") {
        listItem = event.target.parentNode;
    } else if (event.target.localName === "ul") {
        // do nothing
    } else {
        listItem = event.target;
    }

    if ((!listItem.classList.contains("match") && !listItem.classList.contains("open"))) {
        openCard(listItem);
        addToOpenedCards(listItem);
        // TODO count moves, edit stars
        if (openedCards.length === 2) {
            if (cardsMatched()) {
                lockCards();
                // TODO how to end the game --> counter === 8
            }
        }
    }

}

function setUpCardEvents() {
    const deck = document.querySelector(".deck");
    deck.addEventListener("click", cardClicked);
}

let deck;

function initDeck() {
    deck = shuffle(cardSet);
    const docFrag = document.createDocumentFragment();

    for (let i = 0; i < deck.length; i++) {
        // create card list item
        const listItem = document.createElement("li");
        listItem.classList.add("card");
        listItem.setAttribute("card", deck[i]);

        //create icon for the card
        const icon = document.createElement("i");
        icon.classList.add("fa", "fa-" + deck[i]);

        // build elements together
        listItem.appendChild(icon);
        docFrag.appendChild(listItem);
    }

    //render card deck
    const deckElement = document.querySelector(".deck");
    deckElement.appendChild(docFrag);

    setUpCardEvents();
}

initDeck();

function setUpRestartButton() {
    const resetButtom = document.querySelector(".restart");
    resetButtom.addEventListener("click", function () {
        const deckElement = document.querySelector(".deck");
        while(deckElement.firstChild) {
            deckElement.firstChild.remove();
        }
        initDeck();
    });
}

setUpRestartButton();