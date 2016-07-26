import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideModal } from '../../actions/index';
import CollectionRename from './modals/CollectionRename';
import CollectionCreate from './modals/CollectionCreate';
import UpdateDocument from './modals/UpdateDocument';
import ModalManager from './ModalManager';

const Modals = {
	CollectionRename,
	CollectionCreate,
	UpdateDocument,
};

function ModalManagerConnector(props) {
	return <ModalManager {...props} />;
}

ModalManagerConnector.propTypes = {
	modal: PropTypes.string.isRequired,
	payload: PropTypes.any,
};

function mapStateToProps(state, { modal }) {
	return { component: Modals[modal] };
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators({ hideModal }, dispatch),
	};
}

export default connect(mapStateToProps, mapActionsToProps)(ModalManagerConnector);
