import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDatabasesIfNeeded, hideMessage } from './actions';
import App from './App';

function AppConnector(props) {
  return <App {...props} />;
}

function mapStateToProps(state) {
  return {
    modalToShow: state.modalToShow || null,
    message: state.message || null,
    selectedDb: state.selectedDb || '',
    selectedCollection: state.selectedCollection || '',
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchDatabasesIfNeeded, hideMessage }, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(AppConnector);
