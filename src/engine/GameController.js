import { createPlayer } from './Player';

export const GameController = (
	rolePlayerOne = 'human',
	rolePlayerTwo = 'computer'
) => {
	let isGameOver = false;
	let winner = null;
	const playerOne = createPlayer(rolePlayerOne, 'Player 1');
	const playerTwo = createPlayer(rolePlayerTwo, 'Player 2');

	const players = [playerOne, playerTwo];
	const getPlayers = () => players;

	let activePlayer = players[0];
	const getActivePlayer = () => activePlayer;

	playerOne.getBoard().placeShip(5, [3, 3], 'vertical');
	playerOne.getBoard().placeShip(4, [2, 6], 'vertical');
	playerOne.getBoard().placeShip(3, [4, 3], 'vertical');
	playerOne.getBoard().placeShip(3, [1, 1], 'horizontal');
	playerOne.getBoard().placeShip(2, [5, 4], 'horizontal');

	playerTwo.getBoard().placeShip(5, [5, 2], 'horizontal');
	playerTwo.getBoard().placeShip(4, [2, 4], 'vertical');
	playerTwo.getBoard().placeShip(3, [2, 0], 'horizontal');
	playerTwo.getBoard().placeShip(3, [7, 8], 'horizontal');
	playerTwo.getBoard().placeShip(2, [1, 7], 'vertical');

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const playRound = (coordinate = null) => {
		if (isGameOver) return;
		let boardStatus = false;
		let opponent = null;

		if (activePlayer === players[0]) {
			opponent = players[1];
		} else {
			opponent = players[0];
		}

		if (activePlayer.getRole() === 'human' && coordinate) {
			boardStatus = activePlayer.attack(opponent.getBoard(), coordinate);
		} else if (activePlayer.getRole() === 'computer') {
			boardStatus = activePlayer.attack(opponent.getBoard());
		} else return;

		if (opponent.getBoard().allSunk()) {
			isGameOver = true;
			winner = activePlayer;
			return;
		}
		if (boardStatus === null) {
			return;
		} else {
			switchPlayerTurn();
		}
	};

	const getGameOverStatus = () => isGameOver;
	const getWinner = () => winner;

	return {
		getPlayers,
		getActivePlayer,
		playRound,
		getGameOverStatus,
		getWinner,
	};
};
