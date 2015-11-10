import React from 'react';
import { pacomoDecorator } from '../utils/pacomo';
import { connect } from 'react-redux';
import { fetchDocs } from '../actions';
import Doc from './Doc.jsx';
import Pagination from './Pagination.jsx';
import QueryBox from './QueryBox.jsx';

import './Main.scss';

@pacomoDecorator
class Main extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		collections: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		//docs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		docs: React.PropTypes.object.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedCollection && nextProps.selectedCollection !== this.props.selectedCollection) {
			nextProps.dispatch(fetchDocs(nextProps.selectedDb, nextProps.selectedCollection));
		}
	}

	onNewQuery(query) {
		this.props.dispatch(fetchDocs(this.props.selectedDb, this.props.selectedCollection, query));
	}

	render() {
		return (
			<main>
				<h2>{`Collection: ${this.props.selectedCollection}`}</h2>
				<QueryBox onSubmit={this.onNewQuery} />
				{this.props.docs.total ? <Pagination total={this.props.docs.total} next={this.props.docs.next} prev={this.props.docs.prev} /> : null}
				{this.props.docs && this.props.docs.results ?
					<div className="results">
						{this.props.docs.results.map((doc, i) => <Doc key={`doc_${i}`} doc={doc}/>)}
					</div>
					: null
				}
			</main>
		);
	}
}

function mapStateToProps(state = {selectedDb: '', databases: [], selectedCollection: '', collections: [], docs: {}}) {
	return state;
}

export default connect(mapStateToProps)(Main);
