window.onload = function () {
  var cards = document.querySelectorAll(".cards");
  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      card.classList.toggle("is-flipped");
    });
  });
};
