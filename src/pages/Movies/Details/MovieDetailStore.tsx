import React, { useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MovieContext from "../../../store/movie-context";
import MovieDetail from "../../../components/movies/MovieDetail/MovieDetail";

const MovieDetailStore: React.FC = () => {
	// Movie Detail Page will contain not only MovieDetail, but also its sidebar
	const params = useParams();
	const movieId = params.movieId || "";
	const movieCtx = useContext(MovieContext);
	const movie = movieCtx.getStoreMovie(movieId);

	// Not Found Page is displayed instead
	if (!movie) {
		return <h2>Sorry, Movie is not found.</h2>;
	}

	return (
		<Fragment>
			<Helmet>
				<title>{movie.title} (Store)</title>
				<meta name="description" content={`About ${movie.title}, ${movie.description}`} />
			</Helmet>
			<MovieDetail movie={movie} />
		</Fragment>
	);
};

export default MovieDetailStore;
