import * as controller from "./controller.js";
import "animate.css";

// export con
//! DOM rendering functions //
export const removeAnimationClass = function () {
	for (let i = 0; i < 9; i++) {
		setTimeout(() => {
			document
				.getElementById(i)
				.classList.remove("animate__animated", "animate__rollIn");
			addPlayerTurnText();
		}, 1500);
	}
};

export const addPlayerTurnText = function () {
	const player = document.querySelector(".playerTurn");
	player.classList.remove("hidden");
	player.classList.add("animate__animated", "animate__bounceInUp");
};

export const openingAnimation = function (board) {
	const boardEl = document.querySelector(".board--container");

	for (let i = 0; i < 9; i++) {
		setTimeout(() => {
			boardEl.classList.remove("hidden");
			document
				.getElementById(i)
				.classList.add("animate__animated", "animate__rollIn");
		});
	}
	removeAnimationClass(board);
};

export const displayWinningMessage = function (
	humanPlayer,
	gameActive,
	winArr
) {
	// if (gameActive) return;
	console.log(`human player ->${humanPlayer} : game finished -> ${gameActive}`);
	humanPlayer
		? (document.querySelector(".playerTurn").textContent = "X Wins the game!")
		: (document.querySelector(".playerTurn").textContent = "O Wins the game!");

	for (let i = 0; i < winArr.length; i++) {
		document
			.getElementById(winArr[i])
			.classList.remove("animate__animated", "animate__heartBeat");
		document
			.getElementById(winArr[i])
			.classList.add("animate__animated", "animate__flash");
	}

	// if (!gameActive)
	setTimeout(() => {
		renderGameOverAnimation();
	}, 1500);

	return;
};

//* Clear animation classes from game board //
export const resetCellAnimation = () => {
	for (let i = 0; i < 9; i++) {
		document
			.getElementById(i)
			.classList.remove("animate__animated", "animate__heartBeat");
		document.getElementById(i).textContent = "";
	}
};
