import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../UI/Modal/Modal';

interface Props {
	navList: Array<{ name: string; link: string }>;
	heading: string;
	onClose: () => void;
}

const VerticalNavModal: React.FC<Props> = ({ navList, heading, onClose }) => {
	return (
		<Modal onClose={onClose} modalClass='nav-modal'>
			<h4 className='nav-modal-heading'>
				{heading}
				<FontAwesomeIcon onClick={onClose} icon={faArrowLeft} className='nav-modal-icon' />
			</h4>
			<ul className='nav-modal-list'>
				{navList.map(({ name, link }) => (
					<li className='nav-modal-item' key={name}>
						<Link to={link} className='nav-modal-link' onClick={onClose}>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</Modal>
	);
};

export default VerticalNavModal;
