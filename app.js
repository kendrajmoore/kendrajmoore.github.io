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
  let playersHand = [];
  let playerScore = 0;
  let playerMoney = 100;
  //make playing deck-52

  const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
  const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

  class Deck {
    constructor() {
      this.deck = [];
      this.suits = suits;
      this.values = values;

      //let weight = parseInt(value[values]);
      //if (value[values] == "J" || value[values] == "Q" || value[values] == "K")
      //weight = 10;
      //if (value[values] == "A") weight = 11;

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
    total() {
      //"2 of "
    }
  }

  const deck1 = new Deck();
  deck1.shuffle();
  //console.log(deck1.deck);
  deck1.deal();
  //console.log(this.value);
  //console.log(deck1.deal());
  //console.log(value);
  //let cards = new Array();

  //var dealerhand = function(17, 21) {
  //  card = Math.floor(Math.random()*(21 - 17 + 1)+17);
  //return cardD; //should be return card;
  //}

  function valueHand() {
    let value = 0;
    for (element of hand) {
      value += element.value;
    }
    console.log(value);
  }

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

  $("#playGame").on("click", () => {
    console.log(deck1.deal());
  });
});
