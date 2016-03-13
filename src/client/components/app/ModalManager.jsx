import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/index';
import CollectionRename from './modals/CollectionRename.jsx';
import CollectionCreate from './modals/CollectionCreate.jsx';

import styles from './ModalManager.scss';

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

	destroy = (e) => {
		e.preventDefault();
		this.props.dispatch(hideModal());
	};

	render() {
		const Modal = Modals[this.props.modal];

		return (
			<div id="modals">
				<div className={styles.modal_wrapper}>
					<div className={styles.modal}>
						<a className={styles.close} onClick={this.destroy}><svg className={styles.iconClose}><use xlinkHref="#icon-close"></use></svg></a>
						<Modal payload={this.props.payload} doDestroy={this.destroy} />
					</div>
				</div>
				<div className={styles.backdrop}></div>
			</div>
		);
	}
}

export default connect()(ModalManager);
