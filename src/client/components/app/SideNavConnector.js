import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectDb, selectAndSearchDocs, loadDb, showModal } from 'client/actions';
import SideNav from './SideNav';

function SideNavConnector(props) {
  return <SideNav {...props} />;
}

const EMPTY_ARR = [];
function mapStateToProps(state) {
  console.log('state.servers', state.servers);
  return {
    selectedServer: state.selectedServer || -1,
    servers: state.servers || EMPTY_ARR,
    selectedDb: state.selectedDb || '',
    databases: state.databases || EMPTY_ARR,
    selectedCollection: state.selectedCollection || '',
    collections: state.collections || EMPTY_ARR,
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ selectDb, selectAndSearchDocs, loadDb, showModal }, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(SideNavConnector);
