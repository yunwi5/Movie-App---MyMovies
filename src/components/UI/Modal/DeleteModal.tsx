import React from "react";
import Modal from "./Modal";

interface ModalProps {
	modalContent: { id: string; message: string; onDelete: (id: string) => void; onClose: () => void };
}

const DeleteModal: React.FC<ModalProps> = ({ modalContent }) => {
	const { id, message, onDelete, onClose } = modalContent;

	const modelCloseHandler = () => {
		onDelete(id);
	};

	return (
		<Modal onClose={onClose}>
			<div className="modal-content modal-content--delete">
				<h2>Deletion</h2>
				<p>
					<i className="fa fa-angle-right" />
					{"  " + message}{" "}
				</p>
				<button onClick={modelCloseHandler} className="btn-delete">
					Delete
				</button>
			</div>
		</Modal>
	);
};

export default DeleteModal;
