import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Doc from './ResultsAsJson/Doc.jsx';

import styles from './ResultsAsJson.scss';

export class ResultsAsJson extends Component {
	static propTypes = {
		selectedDb: PropTypes.string.isRequired,
		selectedCollection: PropTypes.string.isRequired,
		results: PropTypes.array.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<div className={styles.docs}>
				{this.props.results.map((doc, i) => <Doc key={`doc_${i}`} selectedDb={this.props.selectedDb} selectedCollection={this.props.selectedCollection} doc={doc} />)}
			</div>
		);
	}
}

export default ResultsAsJson;
