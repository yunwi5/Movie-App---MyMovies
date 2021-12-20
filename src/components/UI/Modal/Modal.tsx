import { Fragment } from "react";
import ReactDOM from "react-dom";

/* BackDrop */
interface BackdropProps {
	onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
	return <div className="backdrop" onClick={props.onClose} />;
};

/* Overlay */
const ModalOverlay: React.FC = (props) => {
	return (
		<div className={"modal"}>
			<div className="">{props.children}</div>
		</div>
	);
};

const portalElement: HTMLElement = document.getElementById("overlays") as HTMLElement;

/* Modal */
interface ModalProps {
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
			{ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
		</Fragment>
	);
};

export default Modal;
