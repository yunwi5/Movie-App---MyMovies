import { Fragment, useContext } from "react";
import MovieContext from "../../store/movie-context";
import { GenreList } from "../../models/Movie";

import Movie, { genre as Genre } from "../../models/Movie";
import { getMoviesAndUrlForGenre } from "../../utilities/movies-util";
import AllGenresStore from "../../components/movies/MovieStore/AllGenresStore";

const StorePage: React.FC = () => {
	const movieCtx = useContext(MovieContext);
	const storeMoviesList = movieCtx.storeMovies;

	const genreList12 = GenreList.filter((genre) => genre !== "Other");
	const genreStoresList12 = genreList12.map((genre) =>
		getMoviesAndUrlForGenre(genre as Genre, storeMoviesList)
	);

	return (
		<Fragment>
			<AllGenresStore genreStoresList={genreStoresList12} />
		</Fragment>
	);
};

export default StorePage;
