import { Fragment } from "react";
import ReactDOM from "react-dom";

/* BackDrop */
interface BackdropProps {
	onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
	return <div className="backdrop" onClick={props.onClose} />;
};

interface OverlayProps {
	modalClass?: string;
}

/* Overlay */
const ModalOverlay: React.FC<OverlayProps> = (props) => {
	return (
		<div className={`modal ${props.modalClass}`}>
			<div className="">{props.children}</div>
		</div>
	);
};

const portalElement: HTMLElement = document.getElementById(
	"overlays"
) as HTMLElement;

/* Modal */
interface ModalProps {
	onClose: () => void;
	modalClass?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				portalElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay modalClass={props.modalClass}>
					{props.children}
				</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
};

export default Modal;
