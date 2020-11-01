// Grabbing HTML Elements 
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// Game constants 
const xSymbol = '×'
const oSymbol = '○'

// Game variables 
let gameIsLive = true;
let xIsNext = true;

// Functions 
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
	gameIsLive = false;
	if (letter === 'x') {
		statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
	} else {
		statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
	}
};

const checkGameStatus = () => {
	// get x or o i each cell 
	const topLeft = cellDivs[0].classList[1];
	const topMid = cellDivs[1].classList[1];
	const topRight = cellDivs[2].classList[1];
	const midLeft = cellDivs[3].classList[1];
	const midMid = cellDivs[4].classList[1];
	const midRight = cellDivs[5].classList[1];
	const bottomLeft = cellDivs[6].classList[1];
	const bottomMid = cellDivs[7].classList[1];
	const bottomRight = cellDivs[8].classList[1];

	// check if winner
	// must check that they're not all blank
	// horizontal 
	if (topLeft && topLeft === topMid && topLeft === topRight) {
		handleWin(topLeft);
		cellDivs[0].classList.add('won');
		cellDivs[1].classList.add('won');
		cellDivs[2].classList.add('won');
	} else if (midLeft && midLeft === midMid && midLeft === midRight) {
		handleWin(midLeft);
		cellDivs[3].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[5].classList.add('won');
	} else if (bottomLeft && bottomLeft === bottomMid && bottomLeft === bottomRight) {
		handleWin(bottomLeft);
		cellDivs[6].classList.add('won');
		cellDivs[7].classList.add('won');
		cellDivs[8].classList.add('won');
	} // vertical
	else if (topLeft && topLeft === midLeft && topLeft === bottomLeft) {
		handleWin(topLeft);
		cellDivs[0].classList.add('won');
		cellDivs[3].classList.add('won');
		cellDivs[6].classList.add('won');
	} else if (topMid && topMid === midMid && topMid === bottomMid) {
		handleWin(topMid);
		cellDivs[1].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[7].classList.add('won');
	} else if (topRight && topRight === midRight && topRight === bottomRight) {
		handleWin(topRight);
		cellDivs[2].classList.add('won');
		cellDivs[5].classList.add('won');
		cellDivs[8].classList.add('won');
	} // diagonal 
	else if (topLeft && topLeft === midMid && topLeft === bottomRight) {
		handleWin(topLeft);
		cellDivs[0].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[8].classList.add('won');
	} else if (topRight && topRight === midMid && topRight === bottomLeft) {
		handleWin(topRight);
		cellDivs[2].classList.add('won');
		cellDivs[4].classList.add('won');
		cellDivs[6].classList.add('won');
	} // tie 
	else if (topLeft && topMid && topRight && midLeft && midMid && midRight && bottomLeft && bottomMid && bottomRight) {
		gameIsLive = false;
		statusDiv.innerHTML = `Game is tied!`;
	} else {
		xIsNext = !xIsNext;
		if (xIsNext) {
			statusDiv.innerHTML = `${xSymbol} is next`;
		} else {
			statusDiv.innerHTML = `<span>${oSymbol} is next</span>`
		}
	}
};

// Event handlers 
const handleReset = () => {
	xIsNext = true;
	statusDiv.innerHTML = `${xSymbol} is next`;
	for (const cellDiv of cellDivs) {
		cellDiv.classList.remove('x');
		cellDiv.classList.remove('o');
		cellDiv.classList.remove('won');
	}
	gameIsLive = true;
};

const handleCellClick = (e) => {
	const classList = e.target.classList;

	/*Want to only add x or o if cell is empty*/
	if(!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
		return;
	}

	/*Add x or o to classList of cell*/
	if(xIsNext) {
		classList.add('x');
		checkGameStatus();
	} else {
		classList.add('o');
		checkGameStatus();
	}
};

// Event listeners 
resetDiv.addEventListener('click', handleReset);
for (const cellDiv of cellDivs) {
	cellDiv.addEventListener('click', handleCellClick);
}
