import { describe, it, expect } from 'vitest';
import { GameController } from './GameController';

describe('GameController object', () => {
	describe('Initial match setup', () => {
		it('initialises two players', () => {
			const gameOne = GameController();

			expect(gameOne.getPlayers().length).toBe(2);
			expect(gameOne.getPlayers()[0].getName()).toBe('Player 1');
		});

		it('sets the starting player', () => {
			const gameOne = GameController();

			expect(gameOne.getActivePlayer()).toBe(gameOne.getPlayers()[0]);
		});

		it('populates starting fleets', () => {
			const gameOne = GameController();

			expect(
				gameOne.getPlayers()[0].getBoard().getShipArray().length
			).toBe(5);
			expect(
				gameOne.getPlayers()[1].getBoard().getShipArray().length
			).toBe(5);
		});
	});
});
