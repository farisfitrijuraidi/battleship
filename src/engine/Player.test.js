import { describe, it, expect } from 'vitest';
import { createPlayer } from './Player';

describe('Player Object', () => {
	describe('Player creation and board ownership', () => {
		it('has a distinct identity or type', () => {
			const humanPlayer = createPlayer('human', 'Player 1');
			const computerPlayer = createPlayer('computer', 'Player 2');

			expect(humanPlayer.getName()).toBe('Player 1');
			expect(computerPlayer.getName()).toBe('Player 2');
			expect(humanPlayer.getRole()).toBe('human');
			expect(computerPlayer.getRole()).toBe('computer');
		});

		it('owns its own separate Gameboard', () => {
			const humanPlayer = createPlayer('human', 'Player 1');
			const computerPlayer = createPlayer('computer', 'Player 2');

			expect(humanPlayer.getBoard()).not.toBe(computerPlayer.getBoard());
		});
	});

	describe('Human player actions', () => {
		it('can attack an enemy board', () => {
			const humanPlayer = createPlayer('human', 'Player 1');
			const computerPlayer = createPlayer('computer', 'Player 2');
			computerPlayer.getBoard().placeShip(3, [0, 2], 'horizontal');

			expect(humanPlayer.attack(computerPlayer.getBoard(), [1, 2])).toBe(
				true
			);
			expect(computerPlayer.getBoard().getHitCoordinates()).toEqual([
				[1, 2],
			]);
		});
	});

	describe('Computer player attacks', () => {
		it('fires automatically without manual coordinates', () => {
			const humanPlayer = createPlayer('human', 'Player 1');
			const computerPlayer = createPlayer('computer', 'Player 2');

			humanPlayer.getBoard().placeShip(3, [0, 2], 'horizontal');
			const humanBoardTotalCoordsLength =
				humanPlayer.getBoard().getMissedCoordinates().length +
				humanPlayer.getBoard().getHitCoordinates().length;
			computerPlayer.attack(humanPlayer.getBoard());

			expect(
				humanPlayer.getBoard().getMissedCoordinates().length +
					humanPlayer.getBoard().getHitCoordinates().length
			).toEqual(humanBoardTotalCoordsLength + 1);
		});
	});
});
