import { useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MovieEvaluation from "../../../components/Evaluation/EvaluationEdit/MovieEvaluation";
import MovieContext from "../../../store/movie-context";

const MovieEvaluationPage: React.FC = () => {
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
				<title>Evaluate {movie.title}</title>
				<meta name="description" content={`Evaluate user's custom movie ${movie.title}`} />
			</Helmet>
			<MovieEvaluation movie={movie} />
		</Fragment>
	);
};

export default MovieEvaluationPage;
