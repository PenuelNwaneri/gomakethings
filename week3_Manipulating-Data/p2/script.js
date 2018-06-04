// IIFE to prevent exposing variables for cheaters. :)
(function () {

/**
 * Variables
 */

// The monsters and socks
var monsters = [
    'socks.svg',
    'monster1.svg',
    'monster2.svg',
    'monster3.svg',
    'monster4.svg',
    'monster5.svg',
    'monster6.svg',
    'monster7.svg',
    'monster8.svg',
    'monster9.svg',
    'monster10.svg',
    'monster11.svg'
];

var app = document.querySelector('#app');
var results = document.querySelector('#results');
var playBtn = document.querySelector('#play');

// Game status
var inProgress; // Game is in progress or done (win or lost)
var winCount; // Counter for winning clicks

/**
 * Methods
 */

// Iniitialize doors using length of 'monsters' list.
var createDoors = function () {
    shuffle(monsters);
    app.textContent = ''; // Remove loading text
    inProgress = true; // Let the games begin!
    winCount = 0;

    var row = document.createElement('div');
    row.className = 'row';
    app.append(row);

    monsters.forEach(function() {
        row.append(renderSquare('door.svg'));
    });
    renderStatus('' || 0, false);
};

var playAgainScreen = function (text) {
    renderStatus(text, true);
    playBtn.addEventListener('click', function() {
        createDoors();
    })
}

var checkWinOrLose = function (square, index) {
    if (square === 'socks.svg' && inProgress === true) {
        inProgress = false;
        playAgainScreen('You Lose!');
    } else if (inProgress === true){
        winCount++;
        renderStatus(winCount, false);
    }

    if (winCount === monsters.length - 1 && inProgress === true) {
        inProgress = false;
        playAgainScreen('You Win!');
    }
}

// Use this to match the click event.
var showBehindDoor = function (e) {
    var index = Array.from(e.target.parentNode.children).indexOf(e.target);
    var row = document.querySelector('.row');
    var targetSquare = row.children[index]; // Square that was clicked.
    var monsterBehindDoor = monsters[index]; // Matching monster in list.

    // Reveal Monster (or sock)
    targetSquare.setAttribute('style', `background-image: url(./images/${monsterBehindDoor})`);
    checkWinOrLose(monsterBehindDoor, index);
    targetSquare.removeEventListener('click', showBehindDoor); // Remove future clicks.
}

// Place click handler on square get index.
var onClick = function (square) {
    square.addEventListener('click', showBehindDoor);
}

/**
 * Render
 */

function renderSquare(square) {
    var grid = document.createElement('div');
    grid.className = "grid";
    grid.setAttribute('style', `background-image: url(./images/${square})`);
    // grid.textContent = square;
    onClick(grid);
    return grid;
}

function renderStatus(resultsText, showButton) {
    // Reset Results Text & Button
    if (showButton) {
        playBtn.style.visibility = 'visible';
    } else {
        playBtn.style.visibility = 'hidden';
    }

    if (inProgress) {
        results.textContent = `You have ${(monsters.length - 1) - resultsText} monsters left to find!`;
    } else {
        results.textContent = resultsText
    }
}

/**
 * Initialize
 */
createDoors();

})(document);

