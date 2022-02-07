import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAltEdit } from "@fortawesome/pro-duotone-svg-icons";

interface NavIconProps {
	navIsActive: boolean;
	onEdit: () => void;
	onEvaluate: () => void;
	onToggle: () => void;
	onShowSidebar: () => void;
	onShowModal: () => void;
}

// Used in MovieDetail top nav section
const MovieNavIconList: React.FC<NavIconProps> = (props) => {
	const { navIsActive, onEdit, onEvaluate, onToggle, onShowSidebar, onShowModal } = props;

	return (
		<div className={`movie-detail__nav ${navIsActive ? "movie-detail__nav--active" : ""}`}>
			<div className="icon-wrapper" onClick={onToggle}>
				<i className="fa fa-bars" />
			</div>
			<ul className="movie-detail__nav-bar">
				<li className="similar" onClick={onShowSidebar}>
					<i className="fa fa-video-camera" />
					Similar Movies
				</li>
				<li className="evaluate" onClick={onEvaluate}>
					<FontAwesomeIcon className="fa fa-evaluate" icon={faCommentAltEdit as any} />
					Evaluate
				</li>
				<li className="edit" onClick={onEdit}>
					<i className="fa fa-pencil" /> Edit
				</li>
				<li className="delete" onClick={onShowModal}>
					<i className="fa fa-eraser" />
					Delete
				</li>
			</ul>
		</div>
	);
};

export default MovieNavIconList;
