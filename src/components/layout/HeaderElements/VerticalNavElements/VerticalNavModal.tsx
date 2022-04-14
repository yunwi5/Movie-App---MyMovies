import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../UI/Modal/Modal';

interface Props {
	navList: Array<{ name: string; link: string }>;
	onClose: () => void;
}

const VerticalNavModal: React.FC<Props> = ({ navList, onClose }) => {
	return (
		<Modal onClose={onClose} modalClass='nav-modal'>
			<ul className='nav-modal-list'>
				{navList.map(({ name, link }) => (
					<li className='nav-modal-item'>
						<Link to={link} className='nav-modal-link'>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</Modal>
	);
};

export default VerticalNavModal;
