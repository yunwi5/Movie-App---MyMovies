import Movie, { genre as genreType, Genre } from '../../models/Movie';

export function getGenreMoviesCount (movies: Movie[], genre: string) {
	let genreCounts = 0;

	for (const m of movies) {
		if (m.genreList.includes(genre as genreType)) genreCounts++;
	}

	return genreCounts;
}

// Map google genres to App genres
export function mapGenres (googleGenres: string) {
	const initialGenres = googleGenres.split('/');
	const mappedGenres: Genre[] = [];
	for (let genre of initialGenres) {
		switch (genre.trim()) {
			case 'Sci-fi':
			case 'Fantasy':
				mappedGenres.push(Genre.SCI_FICTION_FANTASY);
				break;
			case 'Action':
				mappedGenres.push(Genre.ACTION_ADVENTURES);
				break;
			case 'Romance':
				mappedGenres.push(Genre.ROMANTIC);
				break;
			case 'Comedy':
				mappedGenres.push(Genre.COMEDIES);
				break;
			case 'Family':
				mappedGenres.push(Genre.CHILDREN_FAMILY);
				break;
			case 'Musical':
				mappedGenres.push(Genre.MUSICALS);
				break;
			case 'Documentary':
				mappedGenres.push(Genre.DOCUMENTARIES);
				break;
			case 'Mystery':
			case 'Psychological thriller':
				mappedGenres.push(Genre.THRILLER);
				break;
		}
	}
	return mappedGenres;
}
