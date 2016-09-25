import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDocument } from 'client/actions';
import { documentUpdatePayloadShape } from 'client/store/shapes';
import DocumentUpdate from './DocumentUpdate';

function DocumentUpdateConnector(props) {
  return <DocumentUpdate {...props} />;
}

DocumentUpdateConnector.propTypes = {
  payload: documentUpdatePayloadShape.isRequired,
  doDestroy: PropTypes.func.isRequired,
};

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateDocument }, dispatch),
  };
}

export default connect(null, mapActionsToProps)(DocumentUpdateConnector);
