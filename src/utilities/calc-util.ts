export function getRoundedFormat (num: number, decimalPlace: number = 2) {
	const mult = Math.pow(10, decimalPlace);
	const rounded = Math.round(num * mult) / mult;
	return rounded;
}
