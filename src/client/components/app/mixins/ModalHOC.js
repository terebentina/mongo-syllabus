import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'client/actions';


export function modal(WrappedComponent) {
	class Modal extends Component {
		static propTypes = {
			dispatch: PropTypes.func.isRequired,
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
