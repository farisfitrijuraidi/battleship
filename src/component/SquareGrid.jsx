import './SquareGrid.css'

export const SquareGrid = () => {
    const squareGrid = Array.from({length : 100}, (_, i) => [Math.floor(i / 10),
				i % 10,]);

    return (
        <div className='grid-container'>
            {squareGrid.map(pair => (
                <button key={pair.toString()} className='grid-cell' aria-label={pair}></button>
            ))}
        </div>
    )
}