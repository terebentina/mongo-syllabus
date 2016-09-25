import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createCollection } from 'client/actions';
import { collectionCreatePayloadShape } from 'client/store/shapes';
import CollectionCreate from './CollectionCreate';

function CollectionCreateConnector(props) {
  return <CollectionCreate {...props} />;
}

CollectionCreateConnector.propTypes = {
  payload: collectionCreatePayloadShape.isRequired,
  doDestroy: PropTypes.func.isRequired,
};

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ createCollection }, dispatch),
  };
}

export default connect(null, mapActionsToProps)(CollectionCreateConnector);
