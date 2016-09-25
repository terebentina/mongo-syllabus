import React, { Component } from 'react';
import mix from 'client/utils/mixins';
import ModalMixin from '../mixins/ModalMixin';

class CollectionRename extends mix(Component).with(ModalMixin) {
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
