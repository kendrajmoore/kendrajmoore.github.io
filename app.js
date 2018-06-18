//display rules
//intro ask if player wants to player
//ask player to choose bet
//money displays
//dealer flips card
//player can stop-if stop lost
//get another card
//player can stop-check total
//another card
//player can stop
//check total
//if player over total -lost

$(() => {
  //set initial values
  let playGame = true;
  let playerScore = 0;
  let playerMoney = 100;
  //make playing deck-52
  class Deck {
    constructor() {
      this.deck = [];

      const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
      const values = [
        "Ace",
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        "Jack",
        "Queen",
        "King"
      ];

      for (let suit in suits) {
        for (let value in values) {
          this.deck.push(`${values[value]} of ${suits[suit]}`);
        }
      }
    }

    shuffle() {
      const { deck } = this;
      let m = deck.length,
        i;

      while (m) {
        i = Math.floor(Math.random() * m--);

        [deck[m], deck[i]] = [deck[i], deck[m]];
      }

      return this;
    }

    deal() {
      return this.deck.pop();
    }
  }

  const deck1 = new Deck();
  deck1.shuffle();
  console.log(deck1.deck);
  deck1.deal();
  console.log(deck1.deal());
  //console.log(value);
  //let cards = new Array();

  if (playerMoney === 0) {
    console.log("you lose");
  } else {
    //displayModule();
  }
  //Grabbing Elements

  const $openBtn = $("#openModal");
  const $modal = $("#modal");
  const $closeBtn = $("#close");

  //Event Handlers
  const openModal = () => {
    $modal.css("display", "block");
  };

  const closeModal = () => {
    $modal.css("display", "none");
  };

  //Event Listeners
  $openBtn.on("click", openModal);

  $closeBtn.on("click", closeModal);

  //  const $firstCard = $("#first-card");
  //$firstCard.on("click", flipCard);

  //const flipCard = () => {
  //$firstCard.css("display", "none");
  //};
});
