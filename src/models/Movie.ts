// There are total 13 genres from Netflix.

export const GenreList = [
	"Anime",
	"Drama",
	"Thriller",
	"Horror",
	"Children & Family Movies",
	"TV Shows",
	"Romantic Movies",
	"Comedies",
	"Music & Musicals",
	"Science-Fiction & Fantasy",
	"Action & Adventurs",
	"Documentaries",
	"Other"
];

export type genre =
	| "Anime"
	| "Drama"
	| "Thriller"
	| "Horror"
	| "Children & Family Movies"
	| "TV Shows"
	| "Romantic Movies"
	| "Comedies"
	| "Music & Musicals"
	| "Science-Fiction & Fantasy"
	| "Action & Adventurs"
	| "Documentaries"
	| "Other";

// Movie interface
// More Properties can be added later on
interface Movie {
	id: string;
	title: string;
	rating: number;
	description: string;
	imgUrl: string;
	genreList: genre[];
	producer: string | null;
	duration: number | null;
	year: number | null;
	isFavorite: boolean;
	director: string | null;
}

export default Movie;
