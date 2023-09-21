import * as view from './view.js';
let bounceInUp = false;

export const boardArr = () =>
	Array.from(document.getElementsByClassName('cell'));

view.openingAnimation();

export const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export const PLAYER1_MARKER = 'X';
export const PLAYER2_MARKER = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const cellNumID = (cellEl) => cellEl.id;
const emptyCells = () => boardArr().filter((cellEl) => cellEl.innerText === '');

//! Player O color & animation class //
const markerO = (computerSelection) => {
	document.getElementById(computerSelection).style.color = '#fafaf9';

	document
		.getElementById(computerSelection)
		.classList.add('animate__animated', 'animate__heartBeat');
};

//! Player X color and animation class //
const markerColourX = (playerSelection) => {
	document
		.getElementById(playerSelection)
		.classList.add('animate__animated', 'animate__heartBeat');

	document.getElementById(playerSelection).style.color = '#b91c1c';
};

//! Check for three X or O's //
const checkMarkerX = (arr) =>
	arr.every(
		(cellEl) =>
			cellEl.innerText === arr[0].innerText && cellEl.innerText === 'X'
	);
const checkMarkerO = (arr) =>
	arr.every(
		(cellEl) =>
			cellEl.innerText === arr[0].innerText && cellEl.innerText === 'O'
	);

//! Check winner and display winning message //
const checkWinner = () => {
	let win = false;
	winningCombinations.forEach((combo) => {
		const _boardArr = boardArr();
		const sequence = [
			_boardArr[combo[0]],
			_boardArr[combo[1]],
			_boardArr[combo[2]],
		];
		if (checkMarkerX(sequence) || checkMarkerO(sequence)) {
			win = true;
			endGame(sequence);
		}

		displayWinner(sequence);
	});
	return win;
};

//! X or O winning message //
const displayWinner = (sequence) => {
	if (checkMarkerX(sequence))
		document.querySelector('.playerTurn').textContent = 'Player X wins!';

	if (checkMarkerO(sequence))
		document.querySelector('.playerTurn').textContent = 'Player O wins!';
};

// //! Check Draw//
const draw = () => gameBoard.every((item) => item.innerText === '');

//! End game //
const endGame = (winningSequence) => {
	disableListeners();
	winningSequence.forEach((cellEl) =>
		cellEl.classList.remove('animate__animated', 'animate__heartBeat')
	);
	winningSequence.forEach((cellEl) =>
		cellEl.classList.add('animate__animated', 'animate__flash')
	);
	setTimeout(() => {
		renderGameOverAnimation();
	}, 1500);
};

//! Take turn //
const takeTurn = (index, marker) => (boardArr()[index].innerText = marker);

//! Opponent Choice //
const opponentChoice = () =>
	cellNumID(emptyCells()[Math.floor(Math.random() * emptyCells().length)]);

//! Opponnent Turn //
const playerO_Turn = () => {
	if (checkWinner() || draw()) return;
	// document.querySelector(".playerTurn").textContent = "Player O to choose.";

	disableListeners();
	const computerSelection = opponentChoice();
	setTimeout(() => {
		takeTurn(computerSelection, PLAYER2_MARKER);
		markerO(computerSelection);
		gameBoard.pop();

		if (!checkWinner() || !draw()) enableListeners();
	}, 350);
};

//! ClickFn //
const clickFn = (e) => {
	const playerSelection = e.target.id;

	const check = document.getElementById(e.target.id).textContent;
	if (check !== '') return;

	takeTurn(playerSelection, PLAYER1_MARKER);
	markerColourX(playerSelection);
	gameBoard.pop();
	if (gameBoard.length === 0 && !checkWinner()) return renderDrawAnimation();
	if (!checkWinner() || !draw()) return playerO_Turn();
};

//! Event Listeners //
const enableListeners = () =>
	boardArr().forEach((cellEl) => cellEl.addEventListener('click', clickFn));

const disableListeners = () =>
	boardArr().forEach((cell) => cell.removeEventListener('click', clickFn));

enableListeners();

//! Game over animation //
const renderGameOverAnimation = () => {
	document
		.querySelector('.board--container')
		.classList.add('animate__animated', 'animate__hinge');

	setTimeout(() => {
		renderResetButton();
	}, 2000);
};

//! Draw animation //
const renderDrawAnimation = () => {
	setTimeout(() => {
		document
			.querySelector('.board--container')
			.classList.add('animate__animated', 'animate__bounceOutDown');
	}, 1000);
	setTimeout(() => {
		renderResetButton();
	}, 2000);
	document.querySelector('.playerTurn').textContent = 'Draw!';
};

//! Reset button //
export const renderResetButton = () => {
	const button = document.querySelector('.btn');
	button.classList.remove('hidden');
	if (bounceInUp)
		button.classList.remove('animate__animated', 'animate__bounceOutDown');
	setTimeout(() => {
		button.classList.add('animate__animated', 'animate__bounceInUp');
	});

	bounceInUp = !bounceInUp;
};

const resetButton = document.querySelector('.btn');
resetButton.addEventListener('click', (e) => {
	bounceInUp = true;
	removeResetButton();
	resetAnimation();
	document.querySelector('.playerTurn').textContent = 'Player X to choose.';
});

const removeResetButton = () => {
	const button = document.querySelector('.btn');
	button.classList.remove('animate__animated', 'animate__bounceInUp');
	setTimeout(() => {
		button.classList.add('animate__animated', 'animate__bounceOutDown');
	}, 2000);
	enableListeners();
	clearBoardArr();
};

//! Remove animation classes from all cells //
export const resetAnimation = () => {
	for (let i = 0; i < 9; i++) {
		document.getElementById(i).textContent = '';
		document
			.getElementById(i)
			.classList.remove('animate__animated', 'animate__heartBeat');

		document
			.getElementById(i)
			.classList.remove('animate__animated', 'animate__flash');
	}
	document
		.querySelector('.board--container')
		.classList.remove('animate__animated', 'animate__hinge');
	document
		.querySelector('.board--container')
		.classList.add('animate__animated', 'animate__zoomIn');

	setTimeout(() => {
		document
			.querySelector('.board--container')
			.classList.remove('animate__animated', 'animate__zoomIn');
	}, 3000);
	setTimeout(() => {
		document
			.querySelector('.board--container')
			.classList.remove('animate__animated', 'animate__bounceOutDown');
	}, 1000);
};

//! Reset Gameboard array to empty //
const clearBoardArr = () => {
	gameBoard = ['', '', '', '', '', '', '', '', ''];
};
