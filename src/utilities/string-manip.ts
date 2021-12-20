import { genre as MovieGenre } from '../models/Movie';

export const toShortcutString = (str: string | MovieGenre) => {
	const ampersandIndex = str.indexOf('&');
	if (ampersandIndex < 0) return str;
	return str.substring(0, ampersandIndex);
};
