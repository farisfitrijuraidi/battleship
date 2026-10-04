import './App.css'
import React, { useState } from "react";
import { SquareGrid } from './component/SquareGrid.jsx';
import { GameController } from './engine/GameController.js';
import { Coordinate } from './component/Coordinate.jsx';

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
        <div className='main-container'>
            <div className='player-Board'>
                <div className='board-type'>Your Board</div>
                <Coordinate className='coord-vert' direction='vertical' />
                <SquareGrid className='player-board-comp' disabled={true} ship={game.getPlayers()[0].getBoard().getShipArray()} hit={game.getPlayers()[0].getBoard().getHitCoordinates()} miss={game.getPlayers()[0].getBoard().getMissedCoordinates()}/>
                <Coordinate className='coord-horz' direction='horizontal' />
            </div>
            <div className='enemy-Board'>
                <div className='board-type'>Enemy Board</div>
                <Coordinate className='coord-vert' direction='vertical' />
                <SquareGrid className='enemy-board-comp' disabled={game.getGameOverStatus() ? (true) : (null)} onClick={handleClick} ship={[]} hit={game.getPlayers()[1].getBoard().getHitCoordinates()} miss={game.getPlayers()[1].getBoard().getMissedCoordinates()}/>
                <Coordinate className='coord-horz' direction='horizontal' />
            </div>
            <div>{game.getWinner() === null ? (null) : (`${game.getWinner().getName()} wins!`)}</div>
            <div>{game.getGameOverStatus() ? (<button onClick={handleRestart}>Play Again ?</button>) : (null)}</div>
        </div>
    )
}


