var choices = ['rock', 'paper', 'scissors'];
var pictures = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

var playerScore = 0;
var computerScore = 0;
var playing = false;

var playerHand = document.getElementById('playerHand');
var computerHand = document.getElementById('computerHand');
var playerScoreText = document.getElementById('playerScore');
var computerScoreText = document.getElementById('computerScore');
var result = document.getElementById('result');
var message = document.getElementById('message');
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
var buttons = document.querySelectorAll('.choice');

startButton.onclick = startGame;
resetButton.onclick = resetGame;

for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        play(this.getAttribute('data-choice'));
    };
}

function startGame() {
    playing = true;
    startButton.style.display = 'none';
    setButtons(true);
    result.textContent = 'Choose your move';
    message.textContent = 'The computer will choose at the same time.';
}

function play(playerChoice) {
    if (!playing) {
        return;
    }

    var computerChoice = choices[Math.floor(Math.random() * 3)];

    playerHand.textContent = pictures[playerChoice];
    computerHand.textContent = pictures[computerChoice];

    if (playerChoice === computerChoice) {
        result.textContent = 'Draw!';
        message.textContent = 'You both chose ' + computerChoice + '.';
    } else if (
        playerChoice === 'rock' && computerChoice === 'scissors' ||
        playerChoice === 'paper' && computerChoice === 'rock' ||
        playerChoice === 'scissors' && computerChoice === 'paper'
    ) {
        playerScore++;
        playerScoreText.textContent = playerScore;
        result.textContent = 'You win!';
        message.textContent = 'Your move was better.';
    } else {
        computerScore++;
        computerScoreText.textContent = computerScore;
        result.textContent = 'Computer wins!';
        message.textContent = 'The computer chose the better move.';
    }
}

function setButtons(enabled) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = !enabled;
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playing = false;

    playerScoreText.textContent = '0';
    computerScoreText.textContent = '0';
    playerHand.textContent = '?';
    computerHand.textContent = '?';
    result.textContent = 'Press Start Game to begin';
    message.textContent = 'Choose a move to play.';
    startButton.style.display = 'inline-block';
    setButtons(false);
}

resetGame();
