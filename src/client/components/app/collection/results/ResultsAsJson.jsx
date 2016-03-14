import React from 'react';
import { connect } from 'react-redux';
import Doc from './ResultsAsJson/Doc.jsx';

import styles from './ResultsAsJson.scss';

class ResultsAsJson extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		results: React.PropTypes.array.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className={styles.docs}>
				{this.props.results.map((doc, i) => <Doc key={`doc_${i}`} selectedDb={this.props.selectedDb} selectedCollection={this.props.selectedCollection} doc={doc} dispatch={this.props.dispatch} />)}
			</div>
		);
	}
}

export default connect()(ResultsAsJson);
