import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideModal } from 'client/actions/index';
import CollectionRenameConnector from './modals/CollectionRenameConnector';
import CollectionCreateConnector from './modals/CollectionCreateConnector';
import DocumentUpdateConnector from './modals/DocumentUpdateConnector';
import ModalManager from './ModalManager';

const Modals = {
  CollectionRename: CollectionRenameConnector,
  CollectionCreate: CollectionCreateConnector,
  DocumentUpdate: DocumentUpdateConnector,
};

function ModalManagerConnector(props) {
  return <ModalManager {...props} />;
}

ModalManagerConnector.propTypes = {
  modal: PropTypes.string.isRequired,
  payload: PropTypes.any,
};

function mapStateToProps(state, { modal }) {
  console.log('modal', modal);
  return { component: Modals[modal] };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ hideModal }, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(ModalManagerConnector);
