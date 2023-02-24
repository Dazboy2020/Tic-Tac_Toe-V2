import * as controller from "./controller.js";
import "animate.css";

export const clearOpeningAnimation = () =>
	controller.boardArr().forEach((cell) => {
		setTimeout(() => {
			cell.classList.remove("animate__animated", "animate__rollIn");
			addPlayerTurnText();
		}, 1250);
	});

export const addPlayerTurnText = function () {
	const player = document.querySelector(".playerTurn");
	player.classList.remove("hidden");
	player.classList.add("animate__animated", "animate__bounceInUp");
};

export const openingAnimation = function () {
	const boardEl = document.querySelector(".board--container");
	boardEl.classList.remove("hidden");

	controller
		.boardArr()
		.forEach((cell) =>
			cell.classList.add("animate__animated", "animate__rollIn")
		);

	setTimeout(() => {
		clearOpeningAnimation();
	});
};

//* Clear animation classes from game board //
export const resetCellAnimation = () => {
	controller
		.boardArr()
		.forEach((cell) =>
			cell.classList.remove("animate__animated", "animate__heartBeat")
		);
	controller.boardArr().forEach((cell) => (cell.textContent = ""));
};
