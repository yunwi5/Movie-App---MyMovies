import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "../../../models/Movie";
import {
	toDurationString,
	getShortMovieDescription
} from "../../../utilities/movie-util/movies-util";
import DeleteModal from "../../UI/Modal/DeleteModal";
import StarRating from "../../UI/DesignElement/StarRating";
import EvaluationCard from "../../Evaluation/EvaluationCard/EvaluationCard";
import MovieContext from "../../../store/movie-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHourglass,
	faBuilding,
	faCameraMovie,
	faTanakh,
	faPencilRuler
} from "@fortawesome/pro-duotone-svg-icons";
import AddModal from "../../UI/Modal/AddModal";

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
			{showAddModal && <AddModal modalContent={addModalContent} />}
			{showDeleteModal && <DeleteModal modalContent={deleteModalContent} />}
			<div key={movie.id} className="movie-card">
				<EvaluationCard movie={movie} />
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
							<StarRating rating={movie.rating} />
							{movie.producer && (
								<div className="company">
									<FontAwesomeIcon icon={faBuilding as any} className="icon" />
									{movie.producer}
								</div>
							)}
							{movie.duration ? (
								<div className="duration">
									<FontAwesomeIcon className="icon" icon={faHourglass as any} />
									{toDurationString(movie.duration)}
								</div>
							) : (
								""
							)}
							<ul className="movie-card__genre-list">
								<FontAwesomeIcon icon={faCameraMovie as any} className="icon" />
								{movie.genreList.map((genre, idx) => {
									const isNotLast = idx < movie.genreList.length - 1;
									return (
										<li key={idx}>
											<span>{genre}</span>
											{isNotLast && <span className="separator"> | </span>}
										</li>
									);
								})}
							</ul>
							<p className="movie-card__description">
								<FontAwesomeIcon icon={faTanakh as any} className="icon" />
								{getShortMovieDescription(movie.description)}
							</p>
							<button className="detail" onClick={navigateToDetail}>
								<span className="detail-link">Detail</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default MovieCard;