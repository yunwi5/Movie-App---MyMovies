import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import MovieAdd from "../../../components/movies/AddForm/MovieAdd";

const MovieAddPage: React.FC = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Add Your Own Movie</title>
				<meta
					name="description"
					content="Add you own favorite movies to your collection and make your own comments & evaluations!"
				/>
			</Helmet>
			<MovieAdd />
		</Fragment>
	);
};

export default MovieAddPage;
