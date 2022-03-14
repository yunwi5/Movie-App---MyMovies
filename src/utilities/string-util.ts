import { genre as MovieGenre } from "../models/Movie";

export const toShortcutString = (str: string | MovieGenre) => {
	const ampersandIndex = str.indexOf("&");
	if (ampersandIndex < 0) return str;
	return str.substring(0, ampersandIndex);
};

export function getFormattedDateString () {
	const dateString = new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});

	return dateString;
}

export function getUserInitial (userName: string) {
	const slices = userName.split(" ");
	if (slices.length < 1) return "";

	const initials = slices.length < 2 ? slices[0][0] : slices[0][0] + slices[1][0];
	return initials.toUpperCase();
}

// Remove Invalid String such as '+' characters that disturbs URL parameter.
// Or, how about use '_' char to join all words, and then decompose them in the search page?
export function removeInvalidSearchCharacters (searchWord: string) {
	searchWord = searchWord.substring(0, 50); // No more than 50 chars can be used for searching.
	const invalidChars = [ "+", "/", "=" ];

	for (let i = 0; i < searchWord.length; i++) {
		if (invalidChars.includes(searchWord[i])) {
			return searchWord.substring(0, i);
		}
	}

	return searchWord;
}
