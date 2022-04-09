import { faSearch } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Modal from './Modal';

interface Props {
	onClose: () => void;
	modalClass?: string;
}

const InfoModal: React.FC<Props> = ({ onClose, modalClass }) => {
	return (
		<Modal onClose={onClose} modalClass={modalClass}>
			<div className='modal-content modal-content--info'>
				<h2>
					<FontAwesomeIcon icon={faSearch} className='modal__heading-icon' />
					How We Search Movie
				</h2>
				<p className='modal-message'>
					<i className='fa fa-angle-right' />
					<span>
						We use <strong>Web Scraping</strong> tecnnique to seach for your wanted
						movie. It will find and automatically fills most of the information so that
						you do not need to add on your own!
					</span>
				</p>
				<p className='modal-message'>
					<i className='fa fa-angle-right' />
					<span>
						Please enter an accurate movie name for effective scraping. Extra space and
						case sensitiveness do not matter. However, spelling does matter!
					</span>
				</p>
				<button onClick={onClose} className='secondary-btn'>
					Got it
				</button>
			</div>
		</Modal>
	);
};

export default InfoModal;
