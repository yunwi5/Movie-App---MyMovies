// There are total 12 genres from Netflix.
export type genre =
	| 'Anime'
	| 'Drama'
	| 'Thriller'
	| 'Horror'
	| 'Children & Family Movies'
	| 'TV Shows'
	| 'Romantic Movies'
	| 'Comedies'
	| 'Music & Musicals'
	| 'Science-Fiction & Fantasy'
	| 'Action & Adventurs'
	| 'Documentaries'
	| 'Other';

interface Movie {
	id: string;
	title: string;
	rating: number;
	description: string;
	imgUrl: string;
	genreList: genre[];
	company: string | null;
	duration: number | null;
	year: number | null;
	isFavorite: boolean;
}

export default Movie;
