import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAndRemoveDoc, showModal } from 'client/actions';
import Doc from './Doc';

function DocConnector(props) {
  return <Doc {...props} />;
}

DocConnector.propTypes = {
  selectedDb: PropTypes.string.isRequired,
  selectedCollection: PropTypes.string.isRequired,
  doc: PropTypes.object.isRequired,
};

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ confirmAndRemoveDoc, showModal }, dispatch),
  };
}

export default connect(null, mapActionsToProps)(DocConnector);
