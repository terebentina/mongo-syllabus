import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renameCollection } from 'client/actions';
import { collectionRenamePayloadShape } from 'client/store/shapes';
import CollectionRename from './CollectionRename';

function CollectionRenameConnector(props) {
	return <CollectionRename {...props} />;
}

CollectionRenameConnector.propTypes = {
	payload: collectionRenamePayloadShape.isRequired,
	doDestroy: PropTypes.func.isRequired,
};

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators({ renameCollection }, dispatch),
	};
}

export default connect(null, mapActionsToProps)(CollectionRenameConnector);
