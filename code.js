var game = (() => {
  //Cache DOM
  const squares = document.querySelectorAll(".square");
  const roundTab = document.querySelector(".rounds");
  const players = document.querySelectorAll(".player");

  let active;
  let totalRounds = 1;
  let rounds = 0;

  //Bind events
  squares.forEach((square) =>
    square.addEventListener("click", function () {
      active = square;
      doMove(active);
      mapBoard();
    })
  );

  function getSign() {
    let sign;
    players.forEach((player) => {
      if (player.classList.contains("active")) {
        sign = player.getAttribute("value");
      }
      player.classList.toggle("active");
    });
    return sign;
  }

  function doMove(element) {
    let sign = getSign();
    active.innerHTML = sign;
    gameOver();
  }

  function gameOver() {
    return rounds === 8 ? clearBoard() : rounds++;
  }

  function clearBoard() {
    squares.forEach((square) => (square.innerHTML = " "));
    rounds = 0;
    totalRounds++;
    console.log(totalRounds);
    roundTab.innerHTML = `Round ${totalRounds}`;
  }

  return {
    doMove: doMove,
  };
})();
