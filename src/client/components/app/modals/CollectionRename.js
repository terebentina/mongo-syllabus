import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { collectionRenamePayloadShape } from 'client/store/shapes';

class CollectionRename extends Component {
  static propTypes = {
    payload: collectionRenamePayloadShape.isRequired,
    doDestroy: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { collectionName: this.props.payload.collection };

  shouldComponentUpdate = shouldPureComponentUpdate;

  onChange = (e) => {
    this.setState({ collectionName: e.target.value });
  };

  onKeyDown = (e) => {
    if (e.keyCode == 13) {
      // on enter
      this.save(e);
    } else if (e.keyCode == 27) {
      // on esc
      this.props.doDestroy(e);
    }
  };

  save = (e) => {
    e.preventDefault();
    this.props.actions.renameCollection(this.props.payload, this.state.collectionName);
    this.props.doDestroy(e);
  };

  render() {
    return (
      <div>
        <header>
          <h3>Rename collection</h3>
        </header>
        <main>
          <label>
            <span>New name:</span>
            <input type="text" value={this.state.collectionName} onChange={this.onChange} onKeyDown={this.onKeyDown} autoFocus />
          </label>
        </main>
        <footer className="actions">
          <a href="" onClick={this.props.doDestroy}>Cancel</a>
          <button onClick={this.save}>Save</button>
        </footer>
      </div>
    );
  }
}

export default CollectionRename;
