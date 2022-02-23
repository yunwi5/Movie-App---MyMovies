import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentPen } from "@fortawesome/pro-regular-svg-icons";

import Movie from "../../../models/Movie";
import { Fragment } from "react";
import { faStar } from "@fortawesome/free-regular-svg-icons";

interface Props {
	movie: Movie;
	onChangeFavoriate: () => void;
	onDelete: () => void;
}

const MovieCardNav: React.FC<Props> = (props) => {
	const { movie, onChangeFavoriate, onDelete } = props;
	const navigate = useNavigate();

	return (
		<div className="card-nav">
			<span className="card-nav-mark">
				<i className="fa fa-bars" />
			            </span>
			<ul className="setting-list">
				<li onClick={onChangeFavoriate}>
					{movie.isFavorite ? (
						<>
							<FontAwesomeIcon icon={faStar} className="fa" />
							Unfavorite
						</>
					) : (
						<Fragment>
							<i className="fa fa-star" /> Favorite
						</Fragment>
					)}
				</li>
				<li onClick={() => navigate(`/movie-evaluate/${movie.id}`)}>
					<FontAwesomeIcon icon={faCommentPen} className="fa" />
					Evaluate
				</li>
				<li onClick={() => navigate(`/movie-edit/${movie.id}`)}>
					<i className="fa fa-pencil" />
					Edit
				</li>
				<li onClick={onDelete}>
					<i className="fa fa-eraser" />
					Delete
				</li>
			</ul>
		</div>
	);
};

export default MovieCardNav;
