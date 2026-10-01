import { describe, it, expect } from 'vitest';
import { GameController } from './GameController';

describe('GameController object', () => {
	describe('Initial match setup', () => {
		it('initialises two players', () => {
			const game = GameController();

			expect(game.getPlayers().length).toBe(2);
			expect(game.getPlayers()[0].getName()).toBe('Player 1');
		});

		it('sets the starting player', () => {
			const game = GameController();

			expect(game.getActivePlayer()).toBe(game.getPlayers()[0]);
		});

		it('populates starting fleets', () => {
			const game = GameController();

			expect(game.getPlayers()[0].getBoard().getShipArray().length).toBe(
				5
			);
			expect(game.getPlayers()[1].getBoard().getShipArray().length).toBe(
				5
			);
		});
	});

	describe('Turn flow and player attacks', () => {
		it('executes an attack on the defending board', () => {
			const game = GameController();
			game.playRound([2, 0]);

			expect(game.getPlayers()[1].getBoard().getHitCoordinates()).toEqual(
				[[2, 0]]
			);
		});

		it('switches turns after a valid attack', () => {
			const game = GameController();
			game.playRound([2, 0]);

			expect(game.getActivePlayer()).toBe(game.getPlayers()[1]);
		});

		it('retains turn on an invalid move', () => {
			const game = GameController();
			game.playRound([2, 0]);
			game.playRound();
			game.playRound([2, 0]);

			expect(game.getActivePlayer()).toBe(game.getPlayers()[0]);
		});

		it('allows a second human player to attack with coordinates', () => {
			const game = GameController('human', 'human');

			game.playRound([2, 0]);

			game.playRound([1, 1]);

			expect(game.getPlayers()[0].getBoard().getHitCoordinates()).toEqual(
				[[1, 1]]
			);
		});
	});

	describe('Computer opponent handling', () => {
		it('triggers the computer response', () => {
			const game = GameController();
			game.playRound([2, 0]);
			game.playRound();

			expect(
				game.getPlayers()[0].getBoard().getHitCoordinates().length +
					game.getPlayers()[0].getBoard().getMissedCoordinates()
						.length
			).toBe(1);
		});
	});

	describe('Game-over conditions', () => {
		it('detects when the game is over', () => {
			const game = GameController();
			const playerTwoShipCoords = [];
			game.getPlayers()[1]
				.getBoard()
				.getShipArray()
				.forEach((item) => playerTwoShipCoords.push(item.coordinate));

			for (let i = 0; i < playerTwoShipCoords.flat().length; i++) {
				game.playRound(playerTwoShipCoords.flat()[i]);
				game.playRound();
			}

			expect(game.getGameOverStatus()).toBe(true);
		});

		it('declares the correct winner', () => {
			const game = GameController();
			const playerTwoShipCoords = [];
			game.getPlayers()[1]
				.getBoard()
				.getShipArray()
				.forEach((item) => playerTwoShipCoords.push(item.coordinate));

			for (let i = 0; i < playerTwoShipCoords.flat().length; i++) {
				game.playRound(playerTwoShipCoords.flat()[i]);
				game.playRound();
			}

			expect(game.getWinner()).toBe(game.getPlayers()[0]);
		});

		it('rejects attacks after game over', () => {
			const game = GameController();
			const playerTwoShipCoords = [];
			game.getPlayers()[1]
				.getBoard()
				.getShipArray()
				.forEach((item) => playerTwoShipCoords.push(item.coordinate));

			for (let i = 0; i < playerTwoShipCoords.flat().length; i++) {
				game.playRound(playerTwoShipCoords.flat()[i]);
				game.playRound();
			}

			const totalNumOfHit = game
				.getPlayers()[1]
				.getBoard()
				.getHitCoordinates().length;
			game.playRound([0, 0]);
			expect(
				game.getPlayers()[1].getBoard().getHitCoordinates().length
			).toEqual(totalNumOfHit);
		});
	});
});
