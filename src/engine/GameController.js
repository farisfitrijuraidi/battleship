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

	playerOne.getBoard().placeShipsRandomly();
	playerTwo.getBoard().placeShipsRandomly();

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
			playRound();
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
