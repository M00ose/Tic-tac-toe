var game = (() => {
  //Cache DOM
  const squares = document.querySelectorAll(".square");
  const roundTab = document.querySelector(".rounds");
  const players = document.querySelectorAll(".player");

  let active;
  let totalRounds = 1;
  let rounds = 0;
  let oneScore = 0;
  let twoScore = 0;

  //Bind events
  squares.forEach((square) =>
    square.addEventListener("click", function () {
      active = square;
      doMove(active);
      calculateBoard();
    })
  );

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
  ];

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

  function calculateBoard() {
    let board = [];
    squares.forEach((square) => board.push(square.innerHTML));

    winningConditions.forEach((condition) => {
      let first = condition[0];
      let second = condition[1];
      let third = condition[2];
      let sign = board[first];

      return board[first] != "" &&
        board[second] != "" &&
        board[third] != "" &&
        board[first] === board[second] &&
        board[first] === board[third]
        ? declareWinner(sign)
        : false;
    });
  }

  function declareWinner(playerSign) {
    let winner;
    players.forEach((player) => {
      player.getAttribute("value") === playerSign ? (winner = player) : false;
    });
    renderScores(winner);
    clearBoard();
  }

  function renderScores(player) {
    console.log(typeof player.childNodes[3].innerHTML);
    const score = player.childNodes[3].innerHTML;
    player.childNodes[3].innerHTML = parseInt(score) + 1;
  }

  function gameOver() {
    return rounds === 8 ? clearBoard() : rounds++;
  }

  function clearBoard() {
    squares.forEach((square) => (square.innerHTML = ""));
    rounds = 0;
    totalRounds++;
    roundTab.innerHTML = `Round ${totalRounds}`;
  }
})();
