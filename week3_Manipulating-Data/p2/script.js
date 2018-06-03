// TASKS:
// [DONE] How are you going to render the game markup?
// [DONE] How will you figure out when someone has found all of the monsters?
// What will you show when they win? What about when they lose?
// Will you offer people a chance to play again? If so, how?


// Variables (Controller)

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
var intro = document.querySelector('#intro');
var app = document.querySelector('#app');
var playBtn = document.querySelector('#play');
var winCount = 0; // Counter for winning clicks

// Methods (Model)

// Iniitialize doors using length of 'monsters' list.
var createDoors = function () {
    shuffle(monsters); // Shuffle the monster list
    app.textContent = '';
    monsters.forEach(function() {
        app.append(renderSquare('door.svg'));
    });
};

var playAgainScreen = function (text) {
    var results = document.createElement('div');
    results.textContent = text;
    results.className = 'results';
    intro.after(results);
    playBtn.style.visibility = 'visible';
}

var checkWinOrLose = function (square, index) {
    if (square.textContent === 'socks.svg') {
        playAgainScreen('You Lose!');
        winCount = -1; // Make it impossible to win
    } else {
        winCount++;
    }

    if (winCount === monsters.length - 1) {
        playAgainScreen('You Win!');
    }
}

// Use this to match the click event.
var showBehindDoor = function (e) {
    console.log("clicked");
    var index = Array.from(e.target.parentNode.children).indexOf(e.target);
    var targetSquare = app.children[index]; // Square that was clicked.
    var monsterBehindDoor = monsters[index]; // Matching monster in list.

    // Reveal Monster (or sock)
    targetSquare.setAttribute('style', `background-image: url(./images/${monsterBehindDoor})`);
    targetSquare.textContent = monsterBehindDoor;
    checkWinOrLose(targetSquare, index);

    targetSquare.removeEventListener('click', showBehindDoor); // Remove future clicks.
}

// Place click handler on square get index.
var onClick = function (square) {
    square.addEventListener('click', showBehindDoor);
}

// Render (View)
function renderSquare(square) {
    var grid = document.createElement('div');
    grid.className = "grid";
    grid.setAttribute('style', `background-image: url(./images/${square})`);
    grid.textContent = square;
    onClick(grid);
    return grid;
}

var row = document.createElement('div');
row.className = 'row';

// Initialize
createDoors();


