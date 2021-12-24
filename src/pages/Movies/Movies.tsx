import React, { useContext } from "react";
import MoviesList from "../../components/movies/MoviesList";
import MovieContext from "../../store/movie-context";

const Movies: React.FC = () => {
	const movieCtx = useContext(MovieContext);
	const userMovies = movieCtx.moviesList;

	return <MoviesList isForUser={true} initialMovies={userMovies} />;
};

export default Movies;
