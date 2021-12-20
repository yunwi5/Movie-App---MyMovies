import React from "react";
import Modal from "./Modal";

interface ModalProps {
	modalContent: { heading: string; messages: string[]; onClose: () => void };
}

const AuthModal: React.FC<ModalProps> = ({ modalContent }) => {
	const { heading, messages, onClose } = modalContent;

	return (
		<Modal onClose={onClose}>
			<div className="modal-content">
				<h2>{heading}</h2>
				<ul>
					{messages.map((mes, idx) => (
						<li key={idx}>
							<i className="fa fa-angle-right" />
							{"  " + mes}
						</li>
					))}
				</ul>
				<button onClick={onClose} className="btn-gen">
					Close
				</button>
			</div>
		</Modal>
	);
};

export default AuthModal;
