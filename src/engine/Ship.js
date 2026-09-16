export const createShip = (length) => {
	let hitTotal = 0;

	const getLength = () => length;

	const hit = () => hitTotal++;

	const isSunk = () => hitTotal >= length;

	const getHitTotal = () => hitTotal;

	return {
		getLength,
		hit,
		isSunk,
		getHitTotal,
	};
};
