
// Card Constructor
function Card(suit, value) {
  this.suit = suit;
  this.value = value;
  this.id = value + suit;
  this.display = function() {
    return this.value + " of " + this.suit;
  };
}

// Create a deck of 52 cards
function createDeck() {
  var suit = ["Diamonds", "Spades", "Clubs", "Hearts"];
  var value = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

  for(var i = 0; i < suit.length; i++) {
    for(var j = 0; j < value.length; j++) {
      var newCard = new Card(suit[i], value[j]);
      deck.push(newCard);
    }
  }
}

// Pick a random card from the deck and remove it from the array
function pickACard() {
  var card = Math.floor(Math.random() * deck.length);
  return deck.splice(card, 1)[0];
}

// Create a hand of 8 random cards using the PickACard function
function createHand() {
  var hand = [];
  while (hand.length < 8) {
    var card = pickACard();
    hand.push(card);
  }
  return hand;
}

// Shuffle the fullHand array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Generate the cards on screen for the user
function generateDisplay(hand) {
  for (var i = 0; i < hand.length; i++){
    var card = hand[i];
    var div = document.createElement("div");
    div.setAttribute("id", card.id);
    div.classList.add("card");
    div.style.backgroundImage = "url('cardimages/RedBack.png')";
    document.getElementById("cardHolder").appendChild(div);
  }
}

// Get's the users click
function onClick() {
  // Check that the user interaction is not currently disabled
  if (isDisabled === false) {
    // Make sure we are clicking on a card!
    if (event.target.classList.contains("card")) {
      if (!pick1) {
        pick1 = event.target;
        // set the background image of the div to the card based on the Id of the div
        pick1.style.backgroundImage = "url(cardimages/" + pick1.getAttribute('id') + ".png)";
      } else {
        pick2 = event.target;
        pick2.style.backgroundImage = "url(cardimages/" + pick2.getAttribute('id') + ".png)";
      }
      cardCheck();
    }
  }
}

// Check the users pick's to make sure the Id's of the elements match and then reset the picks to null
function cardCheck() {
  if (pick1 && pick2) {
    if(pick1 === event.target) { return; }
    if (pick1.getAttribute("id") === pick2.getAttribute("id")) {
      pick1.classList.remove("card");
      pick2.classList.remove("card");
      guesses++;

    } else {
      // Show the cards for 1 second before flipping them back
      setTimeout(resetCard.bind(null, pick1, pick2), 1000);
      guesses++;
      isDisabled = true;
    }
    pick1 = null;
    pick2 = null;
    guessCounter.innerHTML = guesses;

  }
}

// Flip the cards back if user has picked incorrectly.
function resetCard (pick1, pick2) {
  pick1.style.backgroundImage = "url('cardimages/RedBack.png')";
  pick2.style.backgroundImage = "url('cardimages/RedBack.png')";
  isDisabled = false;
}

// Build the game!
function newGame() {
  cardHolder.innerHTML = "";
  guessCounter.innerHTML = 0;
  deck = [];
  createDeck();
  pick1 = null;
  pick2 = null;
  guesses = 0;
  isDisabled = false;

  hand = createHand();
  hand2 = hand.concat([]);
  fullHand = shuffle(hand.concat(hand2));

  generateDisplay(fullHand);
}


var deck;
var pick1;
var pick2;
var guesses;
var isDisabled;

var hand;
var hand2;
var fullHand;

// Add an event handler to the cardHolder div
var cardHolder = document.getElementById("cardHolder");
cardHolder.addEventListener("click", onClick, false);

// Add an event handler to the new game button
var newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", newGame, false);

// Set the guess counter to the number of guesses made by the player
var guessCounter = document.getElementById("guessCounter");
guessCounter.innerHTML = guesses;

// Start the first game
window.onload = newGame;

// Created by Lewis Ramel