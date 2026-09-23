import { Gameboard } from './Gameboard';

export const createPlayer = (role, name = 'Computer') => {
	const board = Gameboard();

	const getRole = () => role;

	const getName = () => name;

	const getBoard = () => board;

	const attack = (board, coordinate = null) => {
		if (!coordinate) {
			const allPossibleCoords = Array.from({ length: 100 }, (_, i) => [
				Math.floor(i / 10),
				i % 10,
			]);
			const humanHitMissedCoords = [
				...board.getMissedCoordinates(),
				...board.getHitCoordinates(),
			];
			const newCoordsArr = allPossibleCoords.filter(
				([x, y]) =>
					!humanHitMissedCoords.some(
						([x2, y2]) => x === x2 && y === y2
					)
			);
			const chosenCoords =
				newCoordsArr[Math.floor(Math.random() * newCoordsArr.length)];
			return board.receiveAttack(chosenCoords);
		}
		return board.receiveAttack(coordinate);
	};

	return {
		getRole,
		getName,
		getBoard,
		attack,
	};
};
