import { useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MovieEdit from "../../../components/movies/MovieEdit/MovieEdit";
import MovieContext from "../../../store/movie-context";

const MovieEditPage: React.FC = () => {
	const movieCtx = useContext(MovieContext);

	const params = useParams();
	const movieId = params.movieId || "";
	const movie = movieCtx.getUserMovie(movieId);

	if (!movie) {
		return <h3>Sorry the movie is not found</h3>;
	}

	return (
		<Fragment>
			<Helmet>
				<title>Edit {movie.title}</title>
				<meta name="description" content={`Edit custom movie ${movie.title}`} />
			</Helmet>

			<MovieEdit movie={movie} />
		</Fragment>
	);
};

export default MovieEditPage;
