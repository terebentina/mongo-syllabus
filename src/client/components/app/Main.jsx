import React from 'react';
import { pacomoDecorator } from '../../utils/pacomo';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { searchDocs, fetchDocs } from '../../actions';
import QueryBox from './main/QueryBox.jsx';
import Results from './main/Results.jsx';

import './Main.scss';

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

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedCollection && nextProps.selectedCollection !== this.props.selectedCollection) {
			nextProps.dispatch(searchDocs());
		}
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	onNewQuery(filter) {
		this.props.dispatch(searchDocs(filter));
	}

	onPageLoad(pageNum) {
		this.props.dispatch(fetchDocs(pageNum));
	}

	render() {
		if (!this.props.selectedDb || !this.props.selectedCollection) {
			return null;
		}
		return (
			<main>
				<h2>{`Collection: ${this.props.selectedCollection}`}</h2>
				<QueryBox dispatch={this.props.dispatch} onSubmit={::this.onNewQuery} />
				<Results results={this.props.docs} total={this.props.totalDocs} currentPage={this.props.currentPage} rpp={this.props.filter.limit} onPageLoadRequest={::this.onPageLoad} />
			</main>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedDb: state.selectedDb || '',
		selectedCollection: state.selectedCollection || '',
		filter: state.filter || { query: '', limit: 30 },
		docs: state.docs || [],
		totalDocs: state.totalDocs || 0,
		currentPage: state.currentPage || 0,
	};
}

export default pacomoDecorator(connect(mapStateToProps)(Main));