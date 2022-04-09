import React from 'react';
import Modal from './Modal';

interface ModalProps {
	modalContent: { isSuccess: boolean; message: string; onClose: () => void };
}

const SuccessModal: React.FC<ModalProps> = ({ modalContent }) => {
	const { isSuccess, message, onClose } = modalContent;

	return (
		<Modal onClose={onClose}>
			<div className='modal-content modal-content--add'>
				{isSuccess && <h2>Update Successful!</h2>}
				{!isSuccess && <h2>Update Unsuccessful...</h2>}
				<p>
					<i className='fa fa-angle-right' />
					{'  ' + message}{' '}
				</p>
				{isSuccess && (
					<button onClick={onClose} className='btn-delete'>
						Confirm
					</button>
				)}
				{!isSuccess && (
					<button onClick={onClose} className='btn-delete'>
						Go Back
					</button>
				)}
			</div>
		</Modal>
	);
};

export default SuccessModal;
