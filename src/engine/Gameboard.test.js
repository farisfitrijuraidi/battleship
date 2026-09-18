import { describe, it, expect } from 'vitest';
import { Gameboard } from './Gameboard';

describe('Gameboard object', () => {
	it('places a ship horizontally across valid coordinates', () => {
		const boardOne = Gameboard();
		const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');

		expect(boardOne.getShipCoordinate(shipOne)).toEqual([
			[0, 2],
			[1, 2],
			[2, 2],
		]);
	});

	it('places a ship vertically across valid coordinates', () => {
		const boardOne = Gameboard();
		const shipOne = boardOne.placeShip(3, [0, 2], 'vertical');

		expect(boardOne.getShipCoordinate(shipOne)).toEqual([
			[0, 2],
			[0, 3],
			[0, 4],
		]);
	});
});
