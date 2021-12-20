import Movie from '../models/Movie';

export const filterMovies = (
	movies: Movie[],
	searchWord: string | undefined
) => {
	if (!searchWord) return movies;
	const newMovies = movies.filter((movie) =>
		movie.title.toLowerCase().includes(searchWord.toLowerCase())
	);
	return newMovies;
};

export const toDurationString = (totalMinutes: number | null) => {
	if (!totalMinutes) return '';
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const timeString = `${hours}h ${minutes}m`;
	return timeString;
};

const compareMovies = (
	m1: Movie,
	m2: Movie,
	sortingStandard: string
): number => {
	switch (sortingStandard) {
		case 'rating':
			if (m1.rating !== m2.rating) return m1.rating - m2.rating;
			break;
		case 'title':
			if (m1.title !== m2.title) return m1.title < m2.title ? -1 : 1;
			break;
		case 'year':
			if (m1.year && m2.year && m1.year !== m2.year)
				return m1.year - m2.year;
			break;
		default:
			return -1;
	}
	return -1;
};

const sortMovies = (
	moviesList: Movie[],
	sortingStandard: string,
	dir: string | null
) => {
	if (!dir) return;

	if (dir === 'ASC') {
		moviesList.sort((movieA, movieB) =>
			compareMovies(movieA, movieB, sortingStandard)
		);
	} else {
		moviesList.sort((movieA, movieB) =>
			compareMovies(movieB, movieA, sortingStandard)
		);
	}
};

export default sortMovies;
