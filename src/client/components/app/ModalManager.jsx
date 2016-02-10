import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/index';
import CollectionRename from './modals/CollectionRename.jsx';
import CollectionCreate from './modals/CollectionCreate.jsx';

import './ModalManager.scss';

const Modals = {
	CollectionRename,
	CollectionCreate,
};

export class ModalManager extends React.Component {
	static propTypes = {
		modal: React.PropTypes.string.isRequired,
		payload: React.PropTypes.any,
		dispatch: React.PropTypes.func.isRequired,
	};

	destroy(e) {
		e.preventDefault();
		this.props.dispatch(hideModal());
	}

	render() {
		const Modal = Modals[this.props.modal];

		return (
			<div id="modals">
				<div className="modal_wrapper">
					<div className="modal">
						<a className="close" onClick={::this.destroy}><svg className="icon-close"><use xlinkHref="#icon-close"></use></svg></a>
						<Modal payload={this.props.payload} doDestroy={::this.destroy} />
					</div>
				</div>
				<div className="backdrop"></div>
			</div>
		);
	}
}

export default connect()(ModalManager);
