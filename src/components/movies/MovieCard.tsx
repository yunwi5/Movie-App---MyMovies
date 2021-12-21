import React, { useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../../models/Movie";
import { toDurationString } from "../../utilities/movies-util";
import DeleteModal from "../UI/Modal/DeleteModal";
import Rating from "@mui/material/Rating";

interface Props {
	movie: Movie;
	onDelete: (id: string) => void;
	onEdit: (movie: Movie) => void;
}

const MovieCard: React.FC<Props> = (props) => {
	const { movie, onDelete, onEdit } = props;
	const [ showModal, setShowModal ] = useState(false);
	const modalContent = {
		id: movie.id,
		message: `Are you sure you want to delete ${movie.title}?`,
		onDelete,
		onClose: () => {
			console.log("Why not close?");
			setShowModal(false);
		}
	};

	const favoriteChangeHandler = () => {
		movie.isFavorite = !movie.isFavorite;
		onEdit(movie);
	};

	const deleteHandler = () => {
		setShowModal(true);
	};

	return (
		<React.Fragment>
			<div key={movie.id} className="movie-card">
				{movie.isFavorite && <i className="fa fa-star-o" />}
				<div className="image-wrapper">
					<img src={movie.imgUrl} />
				</div>

				<div className="movie-card__lines">
					<div className="first-line">
						<h3>{movie.title}</h3>
						{movie.year && <em className="year">({movie.year})</em>}
						<div className="delete-mark-wrapper">
							<span className="delete-mark">
								<i className="fa fa-bars" />
							</span>
							<ul className="setting-list">
								<li onClick={favoriteChangeHandler}>
									<i className="fa fa-star" />
									{movie.isFavorite ? "Unfavorite" : "Favorite"}
								</li>
								<li>
									<i className="fa fa-pencil" />
									Edit
								</li>
								<li onClick={deleteHandler}>
									<i className="fa fa-eraser" />
									Delete
								</li>
							</ul>
						</div>
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
							<button className="detail">
								<Link className="detail-link" to={`/movie-detail/${movie.id}`}>
									Detail
								</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
			{showModal && <DeleteModal modalContent={modalContent} />}
		</React.Fragment>
	);
};

export default MovieCard;
