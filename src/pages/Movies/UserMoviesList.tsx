import React, { useContext, Fragment } from "react";
import { Helmet } from "react-helmet";
import MoviesList from "../../components/movies/MoviesList";
import MovieContext from "../../store/movie-context";

const Movies: React.FC = () => {
	const movieCtx = useContext(MovieContext);
	const userMovies = movieCtx.moviesList;

	return (
		<Fragment>
			<Helmet>
				<title>Your Movie Collection</title>
				<meta name="description" content="Your personal movie collection" />
			</Helmet>
			<MoviesList isForUser={true} initialMovies={userMovies} />
		</Fragment>
	);
};

export default Movies;
