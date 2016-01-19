import React from 'react';
import CollectionRename from './modals/CollectionRename.jsx';

import './ModalManager.scss';

const Modals = {
	CollectionRename,
};

class ModalManager extends React.Component {
	static propTypes = {
		modal: React.PropTypes.string.isRequired,
		payload: React.PropTypes.any,
	};

	render() {
		const Modal = Modals[this.props.modal];

		return (
			<div id="modals">
				<Modal payload={this.props.payload} />
				<div className="backdrop"></div>
			</div>
		);
	}
}

export default ModalManager;
