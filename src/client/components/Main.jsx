import React from 'react';
import { pacomoDecorator } from '../utils/pacomo';
import { connect } from 'react-redux';
import { fetchDocs } from '../actions';
import Doc from './Doc.jsx';

import './Main.scss';

@pacomoDecorator
class Main extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		collections: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		docs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedCollection && nextProps.selectedCollection !== this.props.selectedCollection) {
			nextProps.dispatch(fetchDocs(nextProps.selectedDb, nextProps.selectedCollection));
		}
	}

	render() {
		return (
			<main>
				<h2>{`Collection: ${this.props.selectedCollection}`}</h2>
				<textarea ref="query" />
				<div className="results">
					{this.props.docs.map((doc, i) => <Doc key={`doc_${i}`} doc={doc} />)}
				</div>
			</main>
		);
	}
}

function mapStateToProps(state = {selectedDb: '', databases: [], selectedCollection: '', collections: [], docs: []}) {
	return state;
}

export default connect(mapStateToProps)(Main);
