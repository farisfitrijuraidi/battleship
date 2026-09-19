import { createShip } from './Ship.js';

export const Gameboard = () => {
	let shipArrays = [];

	const placeShip = (length, coordinate, direction) => {
		const shipInstance = createShip(length);

		if (direction === 'horizontal') {
			const shipCoordinate = Array.from({ length: length }, (_, i) => [
				coordinate[0] + i,
				coordinate[1],
			]);
			const isValidCoordinate = shipCoordinate.every(
				([x, y]) => x >= 0 && x <= 9 && y >= 0 && y <= 9
			);
			if (!isValidCoordinate) return false;
			shipArrays.push({
				instance: shipInstance,
				coordinate: shipCoordinate,
				direction: 'horizontal',
			});
		} else if (direction === 'vertical') {
			const shipCoordinate = Array.from({ length: length }, (_, i) => [
				coordinate[0],
				coordinate[1] + i,
			]);
			const isValidCoordinate = shipCoordinate.every(
				([x, y]) => x >= 0 && x <= 9 && y >= 0 && y <= 9
			);
			if (!isValidCoordinate) return false;
			shipArrays.push({
				instance: shipInstance,
				coordinate: shipCoordinate,
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

	const getShipInstance = (coordinate) => {
		const foundShipInstance = shipArrays.find((obj) =>
			obj.coordinate.some(
				(item) => item[0] === coordinate[0] && item[1] === coordinate[1]
			)
		);
		if (foundShipInstance) {
			return foundShipInstance.instance;
		} else {
			return null;
		}
	};

	const receiveAttack = (x, y) => {};

	return {
		receiveAttack,
		placeShip,
		getShipCoordinate,
		getShipInstance,
	};
};
