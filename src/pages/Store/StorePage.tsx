import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import MovieContext from "../../store/movie-context";
import { GenreList } from "../../models/Movie";

import { Genre } from "../../models/Movie";
import { getMoviesAndUrlForGenre } from "../../utilities/movie-util/movies-util";
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
			<Helmet>
				<title>Store Movies in MyMovies</title>
				<meta
					name="description"
					content="Store Movies for users to freely add to their personal collection"
				/>
			</Helmet>

			<AllGenresStore genreStoresList={genreStoresList12} />
		</Fragment>
	);
};

export default StorePage;
