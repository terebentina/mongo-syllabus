import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Pagination from './results/Pagination.jsx';
import ResultsAsJson from './results/ResultsAsJson.jsx';
import ResultsAsTable from './results/ResultsAsTable.jsx';

class Results extends React.Component {
	static propTypes = {
		viewMode: React.PropTypes.string.isRequired,
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		total: React.PropTypes.number.isRequired,
		currentPage: React.PropTypes.number.isRequired,
		rpp: React.PropTypes.number.isRequired,
		results: React.PropTypes.array.isRequired,
		onPageLoadRequest: React.PropTypes.func.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		let results;
		if (this.props.viewMode == 'table') {
			results = <ResultsAsTable selectedDb={this.props.selectedDb} selectedCollection={this.props.selectedCollection} results={this.props.results} />;
		} else {
			results = <ResultsAsJson selectedDb={this.props.selectedDb} selectedCollection={this.props.selectedCollection} results={this.props.results} />;
		}
		return (
			<section className={this.props.viewMode}>
				<Pagination total={this.props.total} currentPage={this.props.currentPage} rpp={this.props.rpp} onPageLoadRequest={this.props.onPageLoadRequest} />
				{results}
				<Pagination total={this.props.total} currentPage={this.props.currentPage} rpp={this.props.rpp} onPageLoadRequest={this.props.onPageLoadRequest} />
			</section>
		);
	}
}

export default Results;
