import "./modal.css";
import {IoClose} from 'react-icons/io5'
const Modal = (props) => {
	if (props.show) {
		return (
			<div className="modal" onClick={props.onClose}>
				<div className="modal-main" onClick={(e) => e.stopPropagation()}>
					<div className="modal-title">
						{props.title}
						<div id="modal-close-button" onClick={props.onClose}>
							<IoClose />
						</div>
					</div>
					<div className="modal-content">{props.children}</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Modal;
