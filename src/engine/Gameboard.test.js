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

	it('retrieves the correct ship reference at an occupied coordinate', () => {
		const boardOne = Gameboard();
		const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');

		expect(boardOne.getShipInstance([1, 2])).toBe(shipOne);
	});

	it('returns null when calling on empty water', () => {
		const boardOne = Gameboard();
		const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');

		expect(boardOne.getShipInstance([5, 5])).toBe(null);
	});

	it('rejects a horizontal ship from spilling over the board edge', () => {
		const boardOne = Gameboard();

		expect(boardOne.placeShip(3, [9, 9], 'horizontal')).toBe(false);
	});

	it('rejects a vertical ship from spilling over the board edge', () => {
		const boardOne = Gameboard();

		expect(boardOne.placeShip(5, [9, 9], 'vertical')).toBe(false);
	});
});
