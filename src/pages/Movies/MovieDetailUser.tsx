import React, { useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MovieContext from "../../store/movie-context";
import MovieDetail from "../../components/movies/MovieDetail";

const MovieDetailUser: React.FC = () => {
	// Movie Detail Page will contain not only MovieDetail, but also its sidebar
	const params = useParams();
	const movieId = params.movieId || "";

	const movieCtx = useContext(MovieContext);
	const movie = movieCtx.getUserMovie(movieId);

	// Not Found Page is displayed instead
	if (!movie) {
		return <h2>Sorry, Your Movie is not found.</h2>;
	}

	const isFromUser = false;

	return (
		<Fragment>
			<Helmet>
				<title>{movie.title} (User)</title>
				<meta
					name="description"
					content={`About your movie ${movie.title}, ${movie.description}`}
				/>
			</Helmet>
			<MovieDetail movie={movie} />
		</Fragment>
	);
};

export default MovieDetailUser;
