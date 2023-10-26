const cards = document.querySelectorAll(".card");
// console.log(cards);

let matchedCards = 0;
let flips = 0;
let cardOne, cardTwo;
let disabled = false;
function flipCard(e) {
  if (e.target != cardOne && !disabled) {
    e.target.classList.add("flip");

    if (!cardOne) {
      return (cardOne = e.target);
    }
    cardTwo = e.target;
    disabled = true;
    let cardTwoImg = cardTwo.querySelector("img").src;
    let cardOneImg = cardOne.querySelector("img").src;
    flips++;
    document.querySelector(".flips").innerHTML = `Flips: ${flips}`;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 == img2) {
    matchedCards++;

    if (matchedCards == 8) {
      setTimeout(() => {
        document.querySelector(".cards").style.display = "none";
        document.querySelector(".treasure").style.display = "flex";
      }, 1500);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";

    return (disabled = false);
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 800);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disabled = false;
  }, 1200);

  console.log(flips);
}

function shuffleCard() {
  matchedCards = 0;
  disabled = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 9, 7, 8, 1, 2, 3, 4, 5, 9, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip");

    setTimeout(() => {
      let imgTag = card.querySelector("img");
      imgTag.src = `images/img${arr[index]}.png`;
      card.addEventListener("click", flipCard);
    }, 1500);
  });
}

shuffleCard();

cards.forEach((card) => {
  //   console.log(card);
  card.addEventListener("click", flipCard);
});

document.querySelector(".refresh").addEventListener("click", () => {
  shuffleCard();
  flips = 0;
  document.querySelector(".flips").innerHTML = `Flips: ${flips}`;
  document.querySelector(".cards").style.display = "flex";
  document.querySelector(".treasure").style.display = "none";
});
