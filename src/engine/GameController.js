import { createPlayer } from './Player';
import { Gameboard } from './Gameboard';

export const GameController = () => {
	const playerOne = createPlayer('human', 'Player 1');
	const playerTwo = createPlayer('computer', 'Player 2');

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

	return {
		getPlayers,
		getActivePlayer,
	};
};
