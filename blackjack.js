var deck = shuffle(newDeck());
/* Test code [
  { point: 9, suit: 'diamonds' },
  { point: 1, suit: 'spades' },
  { point: 5, suit: 'clubs' },
  { point: 10, suit: 'hearts' },
  { point: 2, suit: 'diamonds' },
  { point: 6, suit: 'clubs' },
  { point: 3, suit: 'hearts' },
  { point: 9, suit: 'spades' }
];*/

var dealerHand = [];
var playerHand = [];

//takes playerHand or dealerHand and element for appending HTML
function dealCard(deck, hand, element, holecard) {
  //var card;
  //takes card from deck
  card = deck.pop();
  //adds card to hand
  hand.push(card);
  //adds card to HTML
  var cardHTML;
  if (holecard) {
    cardHTML =
      '<img class="card animated slideInLeft hole" src="images/back_of_card.jpeg" alt="' +
      getCardImageUrl(card) +
      '"/>';
  } else {
    cardHTML =
      '<img class="card animated slideInLeft" src="' +
      getCardImageUrl(card) +
      '"/>';
  }
  $(element).append(cardHTML);
}

//calculate points - takes hand (array of cards) and returns point value
//of that hand
function calculatePoints(hand) {
  //creates a new array
  hand.slice(0);
  //compare cards to sort them
  //if a > b ... num greater than 0
  //if a < b ... num is less than 0
  //if a = b ... num is equal to 0
  function compare(card1, card2) {
    return card2.point - card1.point;
  }
  hand.sort(compare);
  var points = 0;
  for (var i = 0; i < hand.length; i++) {
    var card = hand[i];
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
}
//calculate the Points using calculatePoints for both the dealer
//and player and will update the display with the Points
function displayPlayerPoints() {
  var playerPoints = calculatePoints(playerHand);
  $("#player-points").text(playerPoints);
}
function displayDealerPoints() {
  var dealerPoints = calculatePoints(dealerHand);
  $("#dealer-points").text(dealerPoints);
}
//calculatePoints to get points for both dealer and player and display
//message when someone busts. Returns true if there was a bust
function checkForBusts() {
  var playerPoints = calculatePoints(playerHand);
  if (playerPoints > 21) {
    $("#messages").text("You busted. Better luck next time!");
    $(".card.hole").attr("src", getCardImageUrl(dealerHand[0]));
    var currentPlayerMoney = Number($("#player-money").text());
    var totalBet = 500 - currentPlayerMoney;
    $("#player-money").text(currentPlayerMoney - totalBet);
    return true;
  }
  var dealerPoints = calculatePoints(dealerHand);
  if (dealerPoints > 21) {
    $("#messages").text("Dealer busted. You won!");
    $(".card.hole").attr("src", getCardImageUrl(dealerHand[0]));
    var currentPlayerMoney = Number($("#player-money").text());
    var totalBet = 500 - currentPlayerMoney;
    $("#player-money").text(currentPlayerMoney + totalBet + totalBet);
    return true;
  }
  return false;
}

function resetGame() {
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
}
//function that diplays dynamtically the card img for the card
function getCardImageUrl(card) {
  var cardName;
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
}

//new deck which creates a deck of the 52 standard poker cards
//as an array of card objects
function newDeck() {
  var deck = [];
  var suits = ["spades", "hearts", "clubs", "diamonds"];
  for (var point = 1; point <= 13; point++) {
    for (var i = 0; i < suits.length; i++) {
      var suit = suits[i];
      deck.push({ point: point, suit: suit });
    }
  }
  return deck;
}

//shuffling a newdeck- take a random card from the newDeck function and
//put it on top of new deck until deck is empty
function shuffle(cards) {
  var newCards = [];
  while (cards.length > 0) {
    var idx = Math.floor(Math.random() * cards.length);
    newCards.push(cards[idx]);
    cards.splice(idx, 1);
  }
  return newCards;
}

$(function() {
  $("#deal-button").click(function() {
    var card;
    resetGame();
    dealCard(deck, playerHand, "#player-hand");
    dealCard(deck, dealerHand, "#dealer-hand", true);
    dealCard(deck, playerHand, "#player-hand");
    dealCard(deck, dealerHand, "#dealer-hand");
    displayPlayerPoints();
    checkForBusts();
  });

  //hit deals one card
  $("#hit-button").click(function() {
    dealCard(deck, playerHand, "#player-hand");
    displayPlayerPoints();
    checkForBusts();
  });
  //will continue to deal to the dealer until hits 17
  $("#stand-button").click(function() {
    var dealerPoints = calculatePoints(dealerHand);
    while (dealerPoints < 17) {
      dealCard(deck, dealerHand, "#dealer-hand");
      dealerPoints = calculatePoints(dealerHand);
    }
    displayPlayerPoints();
    $(".card.hole").attr("src", getCardImageUrl(dealerHand[0]));
    displayDealerPoints();
    if (!checkForBusts()) {
      displayDealerPoints();
      //determine winner
      var playerPoints = calculatePoints(playerHand);
      var dealerPoints = calculatePoints(dealerHand);
      if (playerPoints > dealerPoints) {
        $("#messages").text("YOU WON!");
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);
        //to give player table money
        var currentPlayerMoney = Number($("#player-money").text());
        var totalBet = 500 - currentPlayerMoney;
        $("#player-money").text(currentPlayerMoney + totalBet + totalBet);
      } else if (playerPoints === dealerPoints) {
        $("#messages").text("Push");
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);
      } else {
        $("#messages").text("Sorry, You lose!");
        $("#hit-button").prop("disabled", true);
        $("#stand-button").prop("disabled", true);
      }
    }
  });

  $("#bet-button").click(function() {
    var currentPlayerMoney = Number($("#player-money").text());
    var total = currentPlayerMoney - 100;
    $("#player-money").text(total);
    var totalBet = 500 - Number($("#player-money").text());
    if (currentPlayerMoney <= 0) {
      alert("You are out of Money!! No, worries here is more");
      $("#player-money").text("500");
    }
  });

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
});
