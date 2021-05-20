let clickCard = function (event) {
  let newCard = event.srcElement;
  var cards = [];
  let xpath = "//*[@class='cards is-flipped']";
  let query = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    cards.push(query.snapshotItem(i));
  }
  if (cards.length === 2) {
    if (cards[0].children[0].className === cards[1].children[0].className) {
      cards[1].removeEventListener("click", allCardsClick);
      cards[0].removeEventListener("click", allCardsClick);
      cards = [];
      let xpath = "//*[@class='cards is-flipped']";
      let query = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        cards.push(query.snapshotItem(i));
      }
      cards.forEach(function (card) {
        card.classList.add("complete");
      });
      cards = [];
      xpath = "//*[@class='cards is-flipped complete']";
      query = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      for (i = 0, length = query.snapshotLength; i < length; ++i) {
        cards.push(query.snapshotItem(i));
      }
      if (cards.length === 12) {
        startStop();
      }
    } else {
      setTimeout(function () {
        cards = [];
        let xpath = "//*[@class='cards is-flipped']";
        let query = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );
        for (let i = 0, length = query.snapshotLength; i < length; ++i) {
          cards.push(query.snapshotItem(i));
        }
        cards.forEach(function (card) {
          card.classList.toggle("is-flipped");
        });
      }, 1000);
    }
  } else if (cards.length > 2) {
  }
};

let allCardsClick = function (event) {
  event.srcElement.parentElement.classList.toggle("is-flipped");
  if (startstop === 0) {
    startStop();
  }
};

window.onload = function () {
  var cards = document.querySelectorAll(".cards");
  cards.forEach(function (card) {
    card.addEventListener("click", allCardsClick);
    card.addEventListener("click", clickCard);
  });
};

var x;
var startstop = 0;

function startStop() {
  /* Toggle StartStop */

  startstop = startstop + 1;

  if (startstop === 1) {
    start();
    document.getElementById("start").innerHTML = "Stop";
  } else if (startstop === 2) {
    document.getElementById("start").innerHTML = "Start";
    startstop = 0;
    stop();
  }
}

function start() {
  x = setInterval(timer, 10);
} /* Start */

function stop() {
  clearInterval(x);
} /* Stop */

var milisec = 0;
var sec = 0; /* holds incrementing value */
var min = 0;
var hour = 0;

/* Contains and outputs returned value of  function checkTime */

var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;

/* Output variable End */

function timer() {
  /* Main Timer */

  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);
  hourOut = checkTime(hour);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  if (min == 60) {
    min = 0;
    hour = ++hour;
  }

  document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut;
  document.getElementById("min").innerHTML = minOut;
  document.getElementById("hour").innerHTML = hourOut;
}

/* Adds 0 when value is <10 */

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function reset() {
  /*Reset*/

  milisec = 0;
  sec = 0;
  min = 0;
  hour = 0;

  document.getElementById("milisec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hour").innerHTML = "00";

  location.reload();
}
