import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../../store/movie-context";

import AuthContext from "../../store/auth-context";
import DetailHeader from "./MovieDetail/DetailHeader";
import DetailFooter from "./MovieDetail/DetailFooter";
import DeleteModal from "../UI/Modal/DeleteModal";
import Movie from "../../models/Movie";
import AddModal from "../UI/Modal/AddModal";

// The functionality inclused deleting movie, editing movie (not available at the moment)
// Maybe adding comment.
const MovieDetail: React.FC<{ movie: Movie }> = ({ movie }) => {
	const navigate = useNavigate();

	const movieCtx = useContext(MovieContext);
	const isLoggedIn = useContext(AuthContext).isLoggedIn;
	// Get Similar Movies from the store, not from the User Movies
	const storeMovies = movieCtx.storeMovies;

	const [ showAddModal, setShowAddModal ] = useState(false);
	const [ showDeleteModal, setShowDeleteModal ] = useState(false);

	const addModalContent = {
		movie,
		message: `Movie  ${movie.title} will be added to your collection`,
		onAdd: () => {
			movieCtx.addMovie(movie);
			setShowAddModal(false);
			navigate(`/movie-detail/user/${movie.id}`);
		},
		onClose: () => {
			setShowAddModal(false);
		}
	};

	const deleteModalContent = {
		message: `Are you sure you want to delete ${movie.title}?`,
		onDelete: () => {
			movieCtx.deleteMovie(movie);
			setShowDeleteModal(false);
			navigate("/movies");
		},
		onClose: () => {
			setShowDeleteModal(false);
		}
	};

	const showAddModalHandler = (askAdding: boolean) => {
		if (!isLoggedIn) {
			navigate("/auth/login");
			return;
		}
		setShowAddModal(askAdding);
	};

	const showDeleteModalHandler = (askDeleting: boolean) => {
		setShowDeleteModal(askDeleting);
	};

	// Dynamically toggle isFavorite prop
	const setFavoriteHandler = () => {
		const isFavorite = !movie.isFavorite;
		const newMovie = { ...movie, isFavorite };
		movieCtx.editMovie(newMovie);
	};

	return (
		<Fragment>
			{showDeleteModal && <DeleteModal modalContent={deleteModalContent} />}
			{showAddModal && <AddModal modalContent={addModalContent} />}
			<main className="movie-detail">
				<DetailHeader
					onFavorite={setFavoriteHandler}
					movie={movie}
					storeMovies={storeMovies}
					onShowAddModal={showAddModalHandler}
					onShowDeleteModal={showDeleteModalHandler}
				/>
				<DetailFooter movie={movie} isFromStore={movie.isFromStore} />
			</main>
		</Fragment>
	);
};

export default MovieDetail;
