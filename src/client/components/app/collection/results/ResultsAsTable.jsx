import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { typesFromResults } from '../../../../utils/mongodb';
import Doc from './ResultsAsTable/Doc.jsx';

import styles from './ResultsAsTable.css';

export class ResultsAsTable extends Component {
	static propTypes = {
		selectedDb: PropTypes.string.isRequired,
		selectedCollection: PropTypes.string.isRequired,
		results: PropTypes.array.isRequired,
	};

	state = { types: {} };

	componentWillMount = () => {
		this.setState({ types: typesFromResults(this.props.results) });
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.results != this.props.results) {
			this.setState({ types: typesFromResults(nextProps.results) });
		}
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const { results, selectedDb, selectedCollection } = this.props;

		return (
			<table className={styles.table}>
				<thead>
					<tr>
						<th>&nbsp;</th>
						{Object.keys(this.state.types).map((name, i) => <th key={i}>{name}</th>)}
					</tr>
				</thead>
				<tbody>
					{results.map((doc, i) => <Doc key={`doc_${i}`} types={this.state.types} selectedDb={selectedDb} selectedCollection={selectedCollection} doc={doc} />)}
				</tbody>
			</table>
		);
	}
}

export default ResultsAsTable;
