import './SquareGrid.css'

export const SquareGrid = ({className, onClick, disabled, hit = [], miss = [], ship = []}) => {
    const squareGrid = Array.from({length : 100}, (_, i) => [i % 10,
				Math.floor(i / 10)]);

    return (
        <div className={`grid-container ${className}`}>
            {squareGrid.map(pair => {
                let cellStatus = null;
                let disabledStatus = false;
                const foundShipInstance = ship.some((obj) =>
                    obj.coordinate.some(
                        (item) => item[0] === pair[0] && item[1] === pair[1]
                    )
                );
                const foundHitCoord = hit.some(item => item[0] === pair[0] && item[1] === pair[1]);
                const foundMissedCoord = miss.some(item => item[0] === pair[0] && item[1] === pair[1]);
                if (foundHitCoord) {
                    cellStatus = 'hit';
                    disabledStatus = true;
                } else if (foundMissedCoord) {
                    cellStatus = 'miss';
                    disabledStatus = true;
                } else if (foundShipInstance) {
                    cellStatus = 'ship';
                } else {
                    cellStatus = 'water';
                }
                return <button key={pair.toString()} className={`grid-cell ${cellStatus}`} aria-label={pair} onClick={onClick ? () => onClick(pair) : null} disabled={disabled ? true : disabledStatus}></button>
            })}
        </div>
    )
}