// There are total 13 genres from Netflix.

export const GenreList = [
	"Anime",
	"Action & Adventures",
	"Science-Fiction & Fantasy",
	"Thriller",
	"TV Shows",
	"Romantic Movies",
	"Comedies",
	"Music & Musicals",
	"Drama",
	"Documentaries",
	"Children & Family Movies",
	"Horror",
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
	| "Action & Adventures"
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
	isFromStore: boolean;
	// UserMovie needs to have key, so that user can send DELETE request using the movie key.
	key?: string;
}

// class UserMovie implements Movie {
// 	id: string;
// 	title: string;
// 	rating: number;
// 	description: string;
// 	imgUrl: string;
// 	genreList: genre[];
// 	producer: string | null;
// 	duration: number | null;
// 	year: number | null;
// 	isFavorite: boolean;
// 	director: string | null;
// 	isFromStore: boolean;
// 	// UserMovie nees to have key, so that user can send DELETE request using the movie key.
// 	key?: string;

// 	constructor(movieObj: Object) {
// 		this.id = movieObj.id;
// 		this.title = inTitle;
// 	}
// }

// export UserMovie;

export default Movie;
