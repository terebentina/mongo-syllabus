import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DocConnector from './ResultsAsJson/DocConnector';

import styles from './ResultsAsJson.css';

export class ResultsAsJson extends Component {
  static propTypes = {
    selectedDb: PropTypes.string.isRequired,
    selectedCollection: PropTypes.string.isRequired,
    results: PropTypes.array.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { results, selectedDb, selectedCollection } = this.props;

    return (
      <div className={styles.docs}>
        {results.map((doc, i) =>
          <DocConnector key={`doc_${i}`} selectedDb={selectedDb} selectedCollection={selectedCollection} doc={doc} />)}
      </div>
    );
  }
}

export default ResultsAsJson;
