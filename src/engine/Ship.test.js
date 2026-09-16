import { describe, it, expect } from 'vitest';
import { createShip } from './Ship';

describe('Ship object', () => {
	it('shows the correct length', () => {
		const shipOne = createShip(3);

		expect(shipOne.getLength()).toBe(3);
	});

	it('shows the correct initial states', () => {
		const shipOne = createShip(3);

		expect(shipOne.getHitTotal()).toBe(0);
		expect(shipOne.isSunk()).toBe(false);
	});

	it('increases the hit total upon being hit', () => {
		const shipOne = createShip(3);
		shipOne.hit();
		shipOne.hit();

		expect(shipOne.getHitTotal()).toBe(2);
	});

	it('returns true when ship is sunk', () => {
		const shipOne = createShip(3);
		shipOne.hit();
		shipOne.hit();
		shipOne.hit();

		expect(shipOne.isSunk()).toBe(true);
	});

	it('returns false when ship is not sunk', () => {
		const shipOne = createShip(3);
		shipOne.hit();
		shipOne.hit();

		expect(shipOne.isSunk()).toBe(false);
	});
});
