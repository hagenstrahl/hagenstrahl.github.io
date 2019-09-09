/*
 * Create a list that holds all of your cards
 */
let cardSet = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];
let deck;
let openedCards = [];
let foundPairs = 0;
let moves;
let timer;
let gameRunning = false;

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
    for (let card of openedCards) {
        card.classList.remove("open", "show");
        card.classList.add("match");
    }
    openedCards = [];
}

function closeCards() {
    for (let card of openedCards) {
        card.classList.remove("open", "show");
    }
    openedCards = [];
}

function updateMoves() {
    document.querySelector(".moves").textContent = moves;
}

function looseStar() {
    const star = document.querySelector(".fa-star");
    star.classList.remove("fa-star");
    star.classList.add("fa-star-o");
}

function restoreStars() {
    const emptyStars = document.querySelectorAll(".fa-star-o");
    for (let star of emptyStars) {
        star.classList.remove("fa-star-o");
        star.classList.add("fa-star");
    }
}

function updateStars() {
    switch (moves) {
        case 9:
            looseStar();
            break;
        case 25:
            looseStar();
            break;
        case 50:
            looseStar();
            break;
    }
}

function showCongratsPopup() {
    const neededMoves = document.querySelector(".needed-moves");
    neededMoves.textContent = moves;

    const neededTime = document.querySelector(".needed-time");
    neededTime.textContent = timer;

    const popupContainer = document.querySelector(".popup-container");
    popupContainer.classList.add("show-popup");
}

function cardClicked(event) {
    //close not matched cards
    if (openedCards.length === 2) {
        closeCards();
    }

    let listItem;
    // get list item if the icon is clicked
    if (event.target.localName === "i") {
        listItem = event.target.parentNode;
    } else if (event.target.localName === "li") {
        listItem = event.target;
    } else {
        // ignore for further logic
        return;
    }

    // start game if not already running
    if (!gameRunning) {
        gameRunning = true;
        updateTimer();
    }

    if ((!listItem.classList.contains("match") && !listItem.classList.contains("open"))) {
        openCard(listItem);
        addToOpenedCards(listItem);

        moves++;
        updateMoves();

        updateStars();

        // cards matched
        if (openedCards.length === 2 && cardsMatched()) {
            lockCards();
            foundPairs++;

            // found all pairs
            if (foundPairs === 8) {
                gameRunning = false;
                showCongratsPopup();
            }
        }
    }
}

function setUpCardEvents() {
    const deck = document.querySelector(".deck");
    deck.addEventListener("click", cardClicked);
}

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

function updateTimer() {
    document.querySelector(".timer").textContent = timer;

    setTimeout(function () {
        if (gameRunning) {
            timer++;
            updateTimer();
        }
    }, 1000);
}

function initRating() {
    //set moves to 0
    moves = 0;
    updateMoves();
    restoreStars();

    //set timer
    timer = 0;
    updateTimer();
}

function resetGame() {
    const deckElement = document.querySelector(".deck");
    while (deckElement.firstChild) {
        deckElement.firstChild.remove();
    }
    initDeck();
    initRating();

    foundPairs = 0;

    //reset timer
    gameRunning = 0;
    timer = 0;
    updateTimer();
}

function setUpResetButton() {
    const restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", resetGame);

    const retryButton = document.querySelector(".retry");
    retryButton.addEventListener("click", function () {
        resetGame();

        const popupContainer = document.querySelector(".popup-container");
        popupContainer.classList.remove("show-popup");
    });
}

initDeck();
initRating();
setUpResetButton();
