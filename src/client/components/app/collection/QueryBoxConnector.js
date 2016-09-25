import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchDocs, showMessage } from 'client/actions';
import QueryBox from './QueryBox';

function QueryBoxConnector(props) {
  console.log('props', props);
  return <QueryBox {...props} />;
}

QueryBoxConnector.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ searchDocs, showMessage }, dispatch),
  };
}

export default connect(null, mapActionsToProps)(QueryBoxConnector);
