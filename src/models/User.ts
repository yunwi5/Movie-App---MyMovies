import Movie from "./Movie";

interface User {
	id: string;
	email: string;
	userName: string;
	movies: Movie[];
}

export default User;
