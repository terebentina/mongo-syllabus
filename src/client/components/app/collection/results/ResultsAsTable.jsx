import React from 'react';
import { typesFromResults } from '../../../../utils/mongodb';
import Doc from './ResultsAsTable/Doc.jsx';

class ResultsAsTable extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		results: React.PropTypes.array.isRequired,
	};

	state = { types: {} };

	componentWillMount() {
		this.setState({ types: typesFromResults(this.props.results) });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.results != this.props.results) {
			this.setState({ types: typesFromResults(nextProps.results) });
		}
	}

	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>&nbsp;</th>
						{Object.keys(this.state.types).map((name, i) => <th key={i}>{name}</th>)}
					</tr>
				</thead>
				<tbody>
					{this.props.results.map((doc, i) => <Doc key={`doc_${i}`} selectedDb={this.props.selectedDb} selectedCollection={this.props.selectedCollection} doc={doc} dispatch={this.props.dispatch} />)}
				</tbody>
			</table>
		);
	}
}

export default ResultsAsTable;
