let deck = shuffle(newDeck());

let dealerHand = [];
let playerHand = [];

const dealCard = (deck, hand, element, holecard) => {
  //takes card from deck
  card = deck.pop();
  //adds card to hand
  hand.push(card);
  let cardHTML;
  if (holecard) {
    cardHTML =
      '<img class="card  hole" src="images/back_of_card.png" alt="' +
      imageUrl(card) +
      '"/>';
  } else {
    cardHTML = '<img class="card " src="' + imageUrl(card) + '"/>';
  }
  $(element).append(cardHTML);
};

const calculatePoints = hand => {
  hand.slice(0);
  const compare = (card1, card2) => {
    return card2.point - card1.point;
  };
  hand.sort(compare);
  let points = 0;
  for (let i = 0; i < hand.length; i++) {
    let card = hand[i];
    if (card.point > 10) {
      points = points + 10;
    } else if (card.point === 1) {
      if (points + 11 <= 21) {
        points = points + 11;
      } else {
        points = points + 1;
      }
    } else {
      points = points + card.point;
    }
  }
  return points;
};

const displayPlayerPoints = () => {
  let playerPoints = calculatePoints(playerHand);
  $("#player-points").text(playerPoints);
};
const displayDealerPoints = () => {
  const dealerPoints = calculatePoints(dealerHand);
  $("#dealer-points").text(dealerPoints);
};

const checkScore = () => {
  let playerPoints = calculatePoints(playerHand);
  if (playerPoints > 21) {
    $("#messages").text("You busted. Better luck next time!");
    $(".card.hole").attr("src", getCardImageUrl(dealerHand[0]));
    let currentPlayerMoney = Number($("#player-money").text());
    let totalBet = 200 - currentPlayerMoney;
    $("#player-money").text(currentPlayerMoney - totalBet);
    return true;
  }
  let dealerPoints = calculatePoints(dealerHand);
  if (dealerPoints > 21) {
    $("#messages").text("Dealer busted. You won!");
    $(".card.hole").attr("src", getCardImageUrl(dealerHand[0]));
    let currentPlayerMoney = Number($("#player-money").text());
    let totalBet = 200 - currentPlayerMoney;
    $("#player-money").text(currentPlayerMoney + totalBet + totalBet);
    return true;
  }
  return false;
};

const resetGame = () => {
  deck = shuffle(newDeck());
  dealerHand = [];
  playerHand = [];
  $("#player-points").text("");
  $("#dealer-points").text("");
  $("#messages").text("");
  $("#player-hand").html("");
  $("#dealer-hand").html("");
  $("#hit-button").prop("disabled", false);
  $("#stand-button").prop("disabled", false);
};
//function that diplays dynamtically the card img for the card
const imageUrl = card => {
  let cardName;
  if (card.point === 1) {
    cardName = "ace";
  } else if (card.point === 11) {
    cardName = "jack";
  } else if (card.point === 12) {
    cardName = "queen";
  } else if (card.point === 13) {
    cardName = "king";
  } else {
    cardName = card.point;
  }
  var result = "images/" + cardName + "_of_" + card.suit + ".png";
  return result;
};

//make a deck
function newDeck() {
  let deck = [];
  let suits = ["spades", "hearts", "clubs", "diamonds"];
  for (let point = 1; point <= 13; point++) {
    for (let i = 0; i < suits.length; i++) {
      let suit = suits[i];
      deck.push({ point: point, suit: suit });
    }
  }
  return deck;
}

//shuffling
function shuffle(cards) {
  var newCards = [];
  while (cards.length > 0) {
    var idx = Math.floor(Math.random() * cards.length);
    newCards.push(cards[idx]);
    cards.splice(idx, 1);
  }
  return newCards;
}
//window
$(() => {
  $("#deal-button").click(() => {
    let card;
    resetGame();
    dealCard(deck, playerHand, "#player-hand");
    dealCard(deck, dealerHand, "#dealer-hand", true);
    dealCard(deck, playerHand, "#player-hand");
    dealCard(deck, dealerHand, "#dealer-hand");
    displayPlayerPoints();
    checkScore();
  });

  $("#hit-button").click(() => {
    dealCard(deck, playerHand, "#player-hand");
    displayPlayerPoints();
    checkScore();
  });

  $("#stand-button").click(() => {
    var dealerPoints = calculatePoints(dealerHand);
    while (dealerPoints < 17) {
      dealCard(deck, dealerHand, "#dealer-hand");
      dealerPoints = calculatePoints(dealerHand);
    }
    displayPlayerPoints();
    $(".card.hole").attr("src", imageUrl(dealerHand[0]));
    displayDealerPoints();
    if (!checkScore()) {
      displayDealerPoints();
      //determine winner
      let playerPoints = calculatePoints(playerHand);
      let dealerPoints = calculatePoints(dealerHand);
      if (playerPoints > dealerPoints) {
        $("#messages").text("YOU WON!");
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);

        let currentPlayerMoney = Number($("#player-money").text());
        let totalBet = 200 - currentPlayerMoney;
        $("#player-money").text(currentPlayerMoney + totalBet + totalBet);
      } else if (playerPoints === dealerPoints) {
        $("#messages").text("Push");
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);
      } else {
        $("#messages").text("You lose but it is ok!");
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);
      }
    }
  });

  $("#bet-button").click(() => {
    let currentPlayerMoney = Number($("#player-money").text());
    let total = currentPlayerMoney - 100;
    $("#player-money").text(total);
    let totalBet = 200 - Number($("#player-money").text());
    if ((currentPlayerMoney = 0)) {
      alert("You lost but here is more money");
      $("#player-money").text("200");
    }
  });

  //Add Modal

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
});
