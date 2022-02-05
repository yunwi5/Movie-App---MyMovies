import { useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MovieContext from "../../store/movie-context";

import SingleProducerStore from "../../components/movies/MovieStore/SingleProducerStore";
import { getMoviesAndLogoOfProducer } from "../../utilities/movie-util/movies-util";
import { ProductionCompany } from "../../models/Movie";

const ProducerStorePage: React.FC = () => {
	const params = useParams();
	const producerName = params.producerName;
	const producer = producerName ? producerName as ProductionCompany : ProductionCompany.MARVEL;

	const movieCtx = useContext(MovieContext);
	const storeMoviesList = movieCtx.storeMovies;

	const { movies, logo } = getMoviesAndLogoOfProducer(producer, storeMoviesList);

	return (
		<Fragment>
			<Helmet>
				<title>Movies by {producerName}</title>
				<meta name="description" content={`Movies produced by ${producerName}`} />
			</Helmet>
			<SingleProducerStore movies={movies} logo={logo} producer={producer} />
		</Fragment>
	);
};

export default ProducerStorePage;
