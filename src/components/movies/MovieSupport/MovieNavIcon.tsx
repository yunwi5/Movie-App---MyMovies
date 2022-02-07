interface NavIconProps {
	navIsActive: boolean;
	onEdit: () => void;
	onToggle: () => void;
	onShowSidebar: () => void;
	onShowModal: () => void;
}

// Used in MovieDetail section
const MovieNavIcon: React.FC<NavIconProps> = (props) => {
	const { navIsActive, onEdit, onToggle, onShowSidebar, onShowModal } = props;

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

export default MovieNavIcon;
