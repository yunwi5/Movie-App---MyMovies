import { useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MovieContext from "../../store/movie-context";

import { Genre } from "../../models/Movie";
import { getMoviesAndUrlForGenre } from "../../utilities/movie-util/movies-util";
import SingleGenreStore from "../../components/movies/MovieStore/SingleGenreStore";

const GenreStorePage: React.FC = () => {
	const params = useParams();
	const genreName = params.genreName;

	const movieCtx = useContext(MovieContext);
	const storeMoviesList = movieCtx.storeMovies;

	const singleGenreStore = getMoviesAndUrlForGenre(genreName as Genre, storeMoviesList);

	return (
		<Fragment>
			<Helmet>
				<title>{genreName} Movies</title>
				<meta name="description" content={`Movies related to ${genreName}`} />
			</Helmet>
			<SingleGenreStore singleGenreStore={singleGenreStore} />
		</Fragment>
	);
};

export default GenreStorePage;
