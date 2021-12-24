import Movie from "../models/Movie";

// Used in MoviesList
export const getCurrentPageMovies = (movies: Movie[], currentPage: number, perPage: number) => {
	const start_index = (currentPage - 1) * perPage;
	const end_index = start_index + perPage;
	const currentPageMovies = movies.slice(start_index, end_index);
	return currentPageMovies;
};

// Used in MoviesList
export const filterMovies = (movies: Movie[], searchWord: string | undefined) => {
	if (!searchWord) return movies;
	const newMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchWord.toLowerCase()));
	return newMovies;
};

// Used in MoviesForm
export const toDurationString = (totalMinutes: number | null) => {
	if (!totalMinutes) return "";
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const timeString = `${hours}h ${minutes}m`;
	return timeString;
};

// Helper function for sortMovies at the moment
const compareMovies = (m1: Movie, m2: Movie, sortingStandard: string): number => {
	switch (sortingStandard) {
		case "rating":
			if (m1.rating !== m2.rating) return m1.rating - m2.rating;
			break;
		case "title":
			if (m1.title !== m2.title) return m1.title < m2.title ? -1 : 1;
			break;
		case "year":
			if (m1.year && m2.year && m1.year !== m2.year) return m1.year - m2.year;
			break;
		default:
			return -1;
	}
	return -1;
};

// Used in MoviesList
const sortMovies = (moviesList: Movie[], sortingStandard: string, dir: string | null) => {
	if (!dir) return;

	if (dir === "ASC") {
		moviesList.sort((movieA, movieB) => compareMovies(movieA, movieB, sortingStandard));
	} else {
		moviesList.sort((movieA, movieB) => compareMovies(movieB, movieA, sortingStandard));
	}
};

// Create DUMMY MOVIES for starting users.
export function toUserMovies (dummyMovies: Movie[], moviesAmount: number) {
	let userMovies: Movie[] = [];
	for (let i = 0; i < dummyMovies.length; i++) {
		if (i >= moviesAmount) break;
		const m = dummyMovies[i];
		userMovies.push({ ...m, isFromStore: false });
	}
	return userMovies;
}

// Convert Movies Obj to Movies Array.
// Being used in movie-api.ts getUserBySearch and getUserById Fn.
export function toMovieArray (movies: Object | Array<Movie>) {
	if (Array.isArray(movies)) return movies;

	let moviesArray: Movie[] = [];
	Object.entries(movies).forEach(([ key, value ]) => {
		moviesArray.push({ ...value, key });
	});

	return moviesArray;
}

export default sortMovies;
