import { createShip } from './Ship.js';

export const Gameboard = () => {
	let shipArrays = [];

	const placeShip = (length, coordinate, direction) => {
		const shipInstance = createShip(length);
		if (direction === 'horizontal') {
			shipArrays.push({
				instance: shipInstance,
				coordinate: Array.from({ length: length }, (_, i) => [
					coordinate[0] + i,
					coordinate[1],
				]),
				direction: 'horizontal',
			});
		} else if (direction === 'vertical') {
			shipArrays.push({
				instance: shipInstance,
				coordinate: Array.from({ length: length }, (_, i) => [
					coordinate[0],
					coordinate[1] + i,
				]),
				direction: 'vertical',
			});
		}
		return shipInstance;
	};

	const getShipCoordinate = (shipInstance) => {
		const foundShip = shipArrays.find(
			(obj) => obj.instance === shipInstance
		);
		return foundShip.coordinate;
	};

	const receiveAttack = (x, y) => {};

	return {
		receiveAttack,
		placeShip,
		getShipCoordinate,
	};
};
