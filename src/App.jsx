import styles from './App.module.css';
import React, { useState } from "react";
import { SquareGrid } from './component/SquareGrid/SquareGrid.jsx';
import { GameController } from './engine/GameController.js';

export const App = () => {
    const [game, setGame] = useState(() => GameController());
    const [turnCounter, setTurnCounter] = useState(0);

    const handleClick = (coord) => {
        setTurnCounter(c => c + 1);
        return game.playRound(coord);
    }

    const handleRestart = () => {
        setGame(GameController());
        setTurnCounter(0);
    }

    return (
        <div className={styles['main-container']}>
            <div className={styles['battleship-logo']}>

            </div>
            <div className={styles['player-Board']}>
                <div className={styles['board-type']}>Your Ships</div>
                <SquareGrid className='player-board-comp' disabled={true} ship={game.getPlayers()[0].getBoard().getShipArray()} hit={game.getPlayers()[0].getBoard().getHitCoordinates()} miss={game.getPlayers()[0].getBoard().getMissedCoordinates()}/>
            </div>
            <div className={styles['enemy-Board']}>
                <div className={styles['board-type']}>Enemy Ships</div>
                <SquareGrid className='enemy-board-comp' disabled={game.getGameOverStatus() ? (true) : (null)} onClick={handleClick} ship={[]} hit={game.getPlayers()[1].getBoard().getHitCoordinates()} miss={game.getPlayers()[1].getBoard().getMissedCoordinates()}/>
            </div>
            {game.getGameOverStatus() ? (
                <div className={styles['game-over-UI']}>
                    <div className={styles['game-over']}>
                        <div className={styles['winner-name']}>{game.getWinner() === null ? (null) : (`${game.getWinner().getName()}`)}</div>
                        <button className={styles['play-again']} onClick={handleRestart} aria-label="Play again?">Play Again?</button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}


