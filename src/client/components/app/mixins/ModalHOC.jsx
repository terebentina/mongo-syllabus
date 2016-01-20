import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../actions/index';


export function modal(WrappedComponent) {
	class Modal extends React.Component {
		static propTypes = {
			dispatch: React.PropTypes.func.isRequired,
		};

		destroy() {
			this.props.dispatch(hideModal());
		}

		render() {
			return (
				<div className="modal_wrapper">
					<WrappedComponent {...this.props} />
				</div>
			);
		}
	}

	return connect()(Modal);
}
