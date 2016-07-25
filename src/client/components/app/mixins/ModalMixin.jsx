import React, { Component, PropTypes } from 'react';
import { hideModal } from '../../../actions/index';

const ModalMixin = (superclass) => class extends superclass {
	destroy() {
		this.props.dispatch(hideModal());
	}

	render() {
		return (
			<div className="modal_wrapper">
				{this.modalContent.apply(this)}
			</div>
		);
	}
};

export default ModalMixin;
