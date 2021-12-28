import { useContext } from "react";
import { useParams } from "react-router-dom";
import MovieEdit from "../../components/movies/MovieEdit";
import MovieContext from "../../store/movie-context";

const MovieEditPage: React.FC = () => {
	const movieCtx = useContext(MovieContext);

	const params = useParams();
	const movieId = params.movieId || "";
	const movie = movieCtx.getUserMovie(movieId);

	if (!movie) {
		return <h3>Sorry the movie is not found</h3>;
	}

	return <MovieEdit movie={movie} />;
};

export default MovieEditPage;
