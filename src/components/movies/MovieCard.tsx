import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "../../models/Movie";
import { toDurationString } from "../../utilities/movies-util";
import DeleteModal from "../UI/Modal/DeleteModal";
import MovieContext from "../../store/movie-context";
import Rating from "@mui/material/Rating";
import AddModal from "../UI/Modal/AddModal";

interface Props {
	movie: Movie;
	onEdit: (movie: Movie) => void;
	isForUser: boolean;
}

const MovieCard: React.FC<Props> = (props) => {
	const { movie, onEdit, isForUser } = props;

	const navigate = useNavigate();
	const movieCtx = useContext(MovieContext);

	const [ showDeleteModal, setShowDeleteModal ] = useState(false);
	const deleteModalContent = {
		movie,
		message: `Are you sure you want to delete ${movie.title}?`,
		onDelete: () => {
			movieCtx.deleteMovie(movie);
			navigate("/movies");
		},
		onClose: () => {
			setShowDeleteModal(false);
		}
	};

	const [ showAddModal, setShowAddModal ] = useState(false);
	const addModalContent = {
		movie,
		message: `Movie ${movie.title} will be added to your collection!`,
		onAdd: () => {
			movieCtx.addMovie(movie);
			navigate("/movies");
		},
		onClose: () => {
			setShowAddModal(false);
		}
	};

	const favoriteChangeHandler = () => {
		movie.isFavorite = !movie.isFavorite;
		onEdit(movie);
	};

	const deleteHandler = () => {
		setShowDeleteModal(true);
	};

	const addHandler = () => {
		setShowAddModal(true);
	};

	const navigateToDetail = () => {
		if (movie.isFromStore) {
			navigate(`/movie-detail/store/${movie.id}`);
			return;
		}
		navigate(`/movie-detail/user/${movie.id}`);
	};

	return (
		<React.Fragment>
			<div key={movie.id} className="movie-card">
				{movie.isFavorite && <i className="fa fa-star fa-favorite" />}
				<div className="image-wrapper">
					<img src={movie.imgUrl} />
				</div>

				<div className="movie-card__lines">
					<div className="first-line">
						<h3>{movie.title}</h3>
						{movie.year && <em className="year">({movie.year})</em>}
						{/* Enable favorite & editing & deleting only if this is user Movie */}
						{isForUser && (
							<div className="delete-mark-wrapper">
								<span className="delete-mark">
									<i className="fa fa-bars" />
								</span>
								<ul className="setting-list">
									<li onClick={favoriteChangeHandler}>
										<i className="fa fa-star" />
										{movie.isFavorite ? "Unfavorite" : "Favorite"}
									</li>
									<li onClick={() => navigate(`/movie-edit/${movie.id}`)}>
										<i className="fa fa-pencil" />
										Edit
									</li>
									<li onClick={deleteHandler}>
										<i className="fa fa-eraser" />
										Delete
									</li>
								</ul>
							</div>
						)}
						{!isForUser && (
							<div className="add-mark-wrapper" onClick={addHandler}>
								<i className="fa fa-plus" />
							</div>
						)}
					</div>

					<div className="second-line">
						<div className="content-wrapper">
							<span className="rating">
								<Rating
									name="size-medium"
									value={movie.rating / 2}
									size="large"
									precision={0.5}
									readOnly
								/>
								<span className="rating__number">({movie.rating}/10)</span>
							</span>
							{movie.producer && <div className="company">{movie.producer}</div>}
							{movie.duration ? (
								<div className="duration">{toDurationString(movie.duration)}</div>
							) : (
								""
							)}
							<ul className="movie-card__genre-list">
								{movie.genreList.map((genre, idx) => <li key={idx}>{genre}</li>)}
							</ul>
							<button className="detail" onClick={navigateToDetail}>
								<span className="detail-link">Detail</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			{showAddModal && <AddModal modalContent={addModalContent} />}
			{showDeleteModal && <DeleteModal modalContent={deleteModalContent} />}
		</React.Fragment>
	);
};

export default MovieCard;
