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

	describe('Turn flow and player attacks', () => {
		it('executes an attack on the defending board', () => {
			const gameOne = GameController();
			gameOne.playRound([2, 0]);

			expect(
				gameOne.getPlayers()[1].getBoard().getHitCoordinates()
			).toEqual([[2, 0]]);
		});

		it('switches turns after a valid attack', () => {
			const gameOne = GameController();
			gameOne.playRound([2, 0]);

			expect(gameOne.getActivePlayer()).toBe(gameOne.getPlayers()[1]);
		});

		it('retains turn on an invalid move', () => {
			const gameOne = GameController();
			gameOne.playRound([2, 0]);
			gameOne.playRound();
			gameOne.playRound([2, 0]);

			expect(gameOne.getActivePlayer()).toBe(gameOne.getPlayers()[0]);
		});

		it('allows a second human player to attack with coordinates', () => {
			const gameOne = GameController('human', 'human');

			gameOne.playRound([2, 0]);

			gameOne.playRound([1, 1]);

			expect(
				gameOne.getPlayers()[0].getBoard().getHitCoordinates()
			).toEqual([[1, 1]]);
		});
	});
});
