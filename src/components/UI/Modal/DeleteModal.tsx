import React from "react";
import Modal from "./Modal";

interface ModalProps {
	modalContent: {
		// movie: Movie;
		message: string;
		onDelete: () => void;
		onClose: () => void;
	};
}

const DeleteModal: React.FC<ModalProps> = ({ modalContent }) => {
	const { message, onDelete, onClose } = modalContent;

	return (
		<Modal onClose={onClose}>
			<div className="modal-content modal-content--delete">
				<h2>Deletion</h2>
				<p>
					<i className="fa fa-angle-right" />
					{"  " + message}{" "}
				</p>
				<button onClick={onDelete} className="btn-delete">
					Delete
				</button>
			</div>
		</Modal>
	);
};

export default DeleteModal;
