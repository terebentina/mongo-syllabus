import React, { Component, PropTypes } from 'react';
import mix from '../../../utils/mixins';
import ModalMixin from '../mixins/ModalMixin';

class CollectionRename extends mix(React.Component).with(ModalMixin) {
	//static propTypes = {
	//};

	modalContent() {
		return (
			<div className="modal create__entity">
				modal content
			</div>
		);
	}
}

export default CollectionRename;
