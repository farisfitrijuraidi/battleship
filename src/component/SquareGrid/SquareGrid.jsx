import styles from './SquareGrid.module.css';

export const SquareGrid = ({className, onClick, disabled, hit = [], miss = [], ship = []}) => {
    const squareGrid = Array.from({length : 100}, (_, i) => [i % 10,
				Math.floor(i / 10)]);

    return (
        <div className={`${styles['grid-container']} ${className}`}>
            {squareGrid.map(pair => {
                let cellStatus = null;
                let disabledStatus = false;
                let shipLength = null;
                const foundShipInstance = ship.some((obj) =>
                    obj.coordinate.some(
                        (item) => item[0] === pair[0] && item[1] === pair[1]
                    )
                );
                const shipInstance = ship.find(obj => obj.coordinate.some(item => item[0] === pair[0] && item[1] === pair[1]));
                if (shipInstance) {
                    shipLength = shipInstance.instance.getLength();
                }
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
                const statusClass = styles[cellStatus] || '';
                return <button key={pair.toString()} className={`${styles['grid-cell']} ${statusClass}`} data-length={shipLength || undefined} aria-label={pair} onClick={onClick ? () => onClick(pair) : null} disabled={disabled ? true : disabledStatus}></button>
            })}
        </div>
    )
}