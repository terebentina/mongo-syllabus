import React, { Component, PropTypes } from 'react';

import styles from './ModalManager.css';

class ModalManager extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    payload: PropTypes.any,
    actions: PropTypes.object.isRequired,
  };

  destroy = (e) => {
    e.preventDefault();
    this.props.actions.hideModal();
  };

  render() {
    const {
      component: Modal, payload,
    } = this.props;

    return (
      <div id="modals">
        <div className={styles.modal_wrapper}>
          <div className={styles.modal}>
            <a href="" className={styles.close} onClick={this.destroy}>
              <svg>
                <use xlinkHref="#icon-close" />
              </svg>
            </a>
            <Modal payload={payload} doDestroy={this.destroy} />
          </div>
        </div>
        <div className={styles.backdrop} />
      </div>
    );
  }
}

export default ModalManager;
