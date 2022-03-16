import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

import Movie from "../../../models/Movie";
import MovieContext from "../../../store/movie-context";
import AuthContext from "../../../store/auth-context";
import { userIsAdmin } from "../../../utilities/admin-util";
import Movieform from "./MovieForm";

const MovieAdd: React.FC = () => {
	const navigate = useNavigate();
	const movieCtx = useContext(MovieContext);
	const user = useContext(AuthContext).user;

	const addMovieHandler = (newMovieObj: Movie) => {
		movieCtx.addMovie(newMovieObj);

		// Add movie to the store if the user is admin
		if (user && userIsAdmin(user.email)) movieCtx.addMovieToStore(newMovieObj);
		navigate("/movies");
	};

	return (
		<main className="movie-add">
			<Stack sx={{ width: "100%" }} spacing={2} className="form-info">
				<Alert severity="info">
					<AlertTitle>Add Your Own Movie</AlertTitle>
					You can add movies that are not existing on the store yet, by using this form.
					Your new movie will be added to your movies list.
				</Alert>
			</Stack>
			<Movieform onSubmit={addMovieHandler} />
		</main>
	);
};

export default MovieAdd;
