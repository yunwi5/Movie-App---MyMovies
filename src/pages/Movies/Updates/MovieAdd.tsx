import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Movieform from "../../../components/movies/AddForm/MovieForm";

const MovieAdd: React.FC = () => {
	return (
		<Fragment>
			<Helmet>
				<title>Add Your Own Movie</title>
				<meta
					name="description"
					content="Add you own favorite movies to your collection and make your own comments & evaluations!"
				/>
			</Helmet>
			<Movieform />
		</Fragment>
	);
};

export default MovieAdd;
