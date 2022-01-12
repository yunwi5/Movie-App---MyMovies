import React from "react";
import Modal from "./Modal";
import Movie from "../../../models/Movie";

interface ModalProps {
	modalContent: {
		movie: Movie;
		message: string;
		onAdd: () => void;
		onClose: () => void;
	};
}

const AddModal: React.FC<ModalProps> = ({ modalContent }) => {
	const { movie, message, onAdd, onClose } = modalContent;

	return (
		<Modal onClose={onClose}>
			<div className="modal-content modal-content--add">
				<h2>Want to add this movie?</h2>
				<p>
					<i className="fa fa-angle-right" />
					{"  " + message}{" "}
				</p>
				<button onClick={onAdd.bind(null, movie)} className="btn-delete">
					Collect
				</button>
			</div>
		</Modal>
	);
};

export default AddModal;
