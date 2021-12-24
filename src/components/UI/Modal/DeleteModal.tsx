import React from "react";
import Modal from "./Modal";
import Movie from "../../../models/Movie";

interface ModalProps {
	modalContent: { movie: Movie; message: string; onDelete: (movie: Movie) => void; onClose: () => void };
}

const DeleteModal: React.FC<ModalProps> = ({ modalContent }) => {
	const { movie, message, onDelete, onClose } = modalContent;

	return (
		<Modal onClose={onClose}>
			<div className="modal-content modal-content--delete">
				<h2>Deletion</h2>
				<p>
					<i className="fa fa-angle-right" />
					{"  " + message}{" "}
				</p>
				<button onClick={onDelete.bind(null, movie)} className="btn-delete">
					Delete
				</button>
			</div>
		</Modal>
	);
};

export default DeleteModal;
