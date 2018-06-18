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
  let playGame = true;
  let playerScore = 0;
  let playerMoney = 100;

  let suits = ["Spades", "Clubes", "Hearts", "Diamonds"];
  let value = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace"
  ];
  //console.log(value);
  //let cards = new Array();

  const makeCards = () => {
    this.cards = new Array();
    this.makeDeck = stackMakeDeck;
    this.shuffle = stackShuffle;
    this.deal = stackDeal;
    this.draw = stackDraw;
    this.addCard = stackAddCard;
    this.combine = stackCombine;
    this.cardCount = stackCardCount;
  };

  const generateDeck = () => {
    //var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9",
    //"10", "J", "Q", "K");
    //var suits = new Array("C", "D", "H", "S");
    var i, j, k;
    var m;

    m = value.length * suits.length;

    // Set array of cards.

    this.cards = new Array(n * m);

    // Fill the array with 'n' packs of cards.

    for (i = 0; i < n; i++)
      for (j = 0; j < suits.length; j++)
        for (k = 0; k < value.length; k++)
          this.cards[i * m + j * value.length + k] = new Card(
            value[k],
            suits[j]
          );
  };
  console.log(generateDeck());

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
