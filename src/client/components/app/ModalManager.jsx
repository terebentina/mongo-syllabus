import React from 'react';

//import './ModalManager.scss';

class ModalManager extends React.Component {
	static propTypes = {
		modal: React.PropTypes.string.isRequired,
		payload: React.PropTypes.any,
	};

	render() {
		const modalToShow = React.createElement(this.props.modal, null, this.props.payload);

		return (
			<div id="modals">
				{modalToShow}
				<div className="backdrop"></div>
			</div>
		);
	}
}

export default ModalManager;
