import React from 'react';
import { pacomoDecorator } from '../utils/pacomo';
import { connect } from 'react-redux';
import { fetchDocs, setDocsFilter, setCurrentPage } from '../actions';
import QueryBox from './QueryBox.jsx';
import Results from './Results.jsx';

import './Main.scss';

@pacomoDecorator
class Main extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		filter: React.PropTypes.object.isRequired,
		docs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		totalDocs: React.PropTypes.number.isRequired,
		currentPage: React.PropTypes.number.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.onNewQuery = this.onNewQuery.bind(this);
		this.onPageLoad = this.onPageLoad.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedCollection && nextProps.selectedCollection !== this.props.selectedCollection) {
			nextProps.dispatch(fetchDocs());
		}
	}

	onNewQuery(filter) {
		this.props.dispatch(setDocsFilter(filter));
		this.props.dispatch(fetchDocs());
	}

	onPageLoad(pageNum) {
		this.props.dispatch(setCurrentPage(pageNum));
		this.props.dispatch(fetchDocs());
	}

	render() {
		return (
			<main>
				<h2>{`Collection: ${this.props.selectedCollection}`}</h2>
				<QueryBox dispatch={this.props.dispatch} onSubmit={this.onNewQuery} />
				<Results results={this.props.docs} total={this.props.totalDocs} currentPage={this.props.currentPage} rpp={this.props.filter.limit} onPageLoadRequest={this.onPageLoad} />
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedDb: state.selectedDb || '',
		selectedCollection: state.selectedCollection || '',
		filter: state.filter || {query: '', limit: 30},
		docs: state.docs || [],
		totalDocs: state.totalDocs || 0,
		currentPage: state.currentPage || 0,
	};
}

export default connect(mapStateToProps)(Main);
