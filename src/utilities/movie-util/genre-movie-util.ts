import Movie, { genre as Genre } from "../../models/Movie";

export function getGenreMoviesCount (movies: Movie[], genre: string) {
	let genreCounts = 0;

	for (const m of movies) {
		if (m.genreList.includes(genre as Genre)) genreCounts++;
	}

	return genreCounts;
}
