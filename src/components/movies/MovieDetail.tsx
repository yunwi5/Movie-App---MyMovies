import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../../store/movie-context";

const MovieDetail: React.FC = () => {
	const params = useParams();
	const movieId = params.movieId ? params.movieId : "";

	const movieCtx = useContext(MovieContext);
	const movie = movieCtx.getMovie(movieId);

	// Not Found Page is displayed
	if (!movie) {
		return <p>Sorry, Movie is not found.</p>;
	}

	return (
		<main>
			<h3>Movie Detail Page </h3>
			<h4>{movie.title}</h4>
			<p>
				{movie.year} * {movie.duration}
			</p>
			<p>{movie.description}</p>
		</main>
	);
};

export default MovieDetail;
