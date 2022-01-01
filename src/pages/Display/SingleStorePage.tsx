import { useContext } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../../store/movie-context";

import Movie, { genre as Genre } from "../../models/Movie";
import { getMoviesAndUrlForGenre } from "../../utilities/movies-util";
import SingleGenreStore from "../../components/movies/MovieStore/SingleGenreStore";

const SingleStorePage: React.FC = () => {
	const params = useParams();
	const genreName = params.genreName;

	const movieCtx = useContext(MovieContext);
	const storeMoviesList = movieCtx.storeMovies;

	const singleGenreStore = getMoviesAndUrlForGenre(genreName as Genre, storeMoviesList);

	return <SingleGenreStore singleGenreStore={singleGenreStore} />;
};

export default SingleStorePage;
