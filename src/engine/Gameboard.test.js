import { describe, it, expect } from 'vitest';
import { Gameboard } from './Gameboard';

describe('Gameboard object', () => {
	describe('Ship placement', () => {
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

		it('blocks a ship from being placed on top of coordinates already taken by another ship', () => {
			const boardOne = Gameboard();
			const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');

			expect(boardOne.placeShip(5, [0, 2], 'horizontal')).toBe(false);
		});
	});

	describe('Receiving attacks and recording misses', () => {
		it('damages the correct ship when an attack hits an occupied coordinate', () => {
			const boardOne = Gameboard();
			const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');
			const shipTwo = boardOne.placeShip(5, [3, 3], 'horizontal');
			boardOne.receiveAttack([1, 2]);

			expect(shipOne.getHitTotal()).toBe(1);
			expect(shipTwo.getHitTotal()).toBe(0);
		});

		it('records a coordinate as a miss when an attack lands in empty water', () => {
			const boardOne = Gameboard();

			expect(boardOne.receiveAttack([9, 9])).toBe(false);
		});

		it('keeps an accessible record of all missed attack coordinates so the interface can display them.', () => {
			const boardOne = Gameboard();

			boardOne.receiveAttack([9, 9]);
			boardOne.receiveAttack([7, 8]);

			expect(boardOne.getMissedCoordinates()).toEqual([
				[9, 9],
				[7, 8],
			]);
		});

		it('rejects an attack on a coordinate that was already targeted earlier', () => {
			const boardOne = Gameboard();
			const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');
			boardOne.receiveAttack([1, 2]);
			boardOne.receiveAttack([9, 9]);

			expect(boardOne.receiveAttack([9, 9])).toBe(null);
			expect(boardOne.receiveAttack([1, 2])).toBe(null);
		});

		it('rejects an attack on a coordinate that was out-of-bound', () => {
			const boardOne = Gameboard();

			expect(boardOne.receiveAttack([10, 15])).toBe(null);
			expect(boardOne.receiveAttack([-1, -2])).toBe(null);
		});
	});

	describe('Fleet status and game over', () => {
		it('reports false when no ships have taken damage yet', () => {
			const boardOne = Gameboard();
			const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');

			expect(boardOne.allSunk()).toBe(false);
		});

		it('reports false when some ships are sunk but at least one ship is still floating', () => {
			const boardOne = Gameboard();
			const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');
			const shipTwo = boardOne.placeShip(5, [3, 3], 'horizontal');
			boardOne.receiveAttack([0, 2]);
			boardOne.receiveAttack([1, 2]);
			boardOne.receiveAttack([2, 2]);

			expect(boardOne.allSunk()).toBe(false);
		});

		it('reports true only after every placed ship on the board is completely sunk', () => {
			const boardOne = Gameboard();
			const shipOne = boardOne.placeShip(3, [0, 2], 'horizontal');
			const shipTwo = boardOne.placeShip(2, [6, 6], 'horizontal');
			boardOne.receiveAttack([0, 2]);
			boardOne.receiveAttack([1, 2]);
			boardOne.receiveAttack([2, 2]);
			boardOne.receiveAttack([6, 6]);
			boardOne.receiveAttack([7, 6]);

			expect(boardOne.allSunk()).toBe(true);
		});
	});
});
