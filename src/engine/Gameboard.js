import { createShip } from './Ship.js';

export const Gameboard = () => {
	let shipArrays = [];
	let missedCoordinates = [];
	let hitCoordinates = [];

	const placeShip = (length, coordinate, direction) => {
		let shipCoordinate;

		if (direction === 'horizontal') {
			shipCoordinate = Array.from({ length: length }, (_, i) => [
				coordinate[0] + i,
				coordinate[1],
			]);
		} else if (direction === 'vertical') {
			shipCoordinate = Array.from({ length: length }, (_, i) => [
				coordinate[0],
				coordinate[1] + i,
			]);
		} else {
			return false;
		}
		const isValidCoordinate = shipCoordinate.every(
			([x, y]) => x >= 0 && x <= 9 && y >= 0 && y <= 9
		);
		if (!isValidCoordinate) return false;
		const isExist = shipArrays.some((obj) => {
			return shipCoordinate.some((item) => {
				return obj.coordinate.some(
					(pair) => pair[0] === item[0] && pair[1] === item[1]
				);
			});
		});
		if (isExist) return false;
		const shipInstance = createShip(length);
		shipArrays.push({
			instance: shipInstance,
			coordinate: shipCoordinate,
		});
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

	const receiveAttack = (coordinate) => {
		const hitCoordinateExist = hitCoordinates.some(
			([x, y]) => x === coordinate[0] && y === coordinate[1]
		);
		const missedCoordinateExist = missedCoordinates.some(
			([x, y]) => x === coordinate[0] && y === coordinate[1]
		);
		const isValidCoordinate =
			coordinate[0] >= 0 &&
			coordinate[0] <= 9 &&
			coordinate[1] >= 0 &&
			coordinate[1] <= 9;

		if (hitCoordinateExist || missedCoordinateExist || !isValidCoordinate)
			return null;
		const shipInstance = getShipInstance(coordinate);
		if (shipInstance) {
			shipInstance.hit();
			hitCoordinates.push(coordinate);
			return true;
		} else {
			missedCoordinates.push(coordinate);
			return false;
		}
	};

	const getMissedCoordinates = () => [...missedCoordinates];
	const getHitCoordinates = () => [...hitCoordinates];

	const allSunk = () => {
		if (shipArrays.length === 0) return false;
		return shipArrays.every((obj) => obj.instance.isSunk());
	};

	return {
		receiveAttack,
		placeShip,
		getShipCoordinate,
		getShipInstance,
		getMissedCoordinates,
		getHitCoordinates,
		allSunk,
	};
};
