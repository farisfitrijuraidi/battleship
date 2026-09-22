import { Gameboard } from './Gameboard';

export const createPlayer = (role, name = 'Computer') => {
	const board = Gameboard();

	const getRole = () => role;

	const getName = () => name;

	const getBoard = () => board;

	const attack = (board, coordinate) => {
		return board.receiveAttack(coordinate);
	};

	return {
		getRole,
		getName,
		getBoard,
		attack,
	};
};
