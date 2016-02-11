import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { pacomoDecorator } from '../../../utils/pacomo';
import Pagination from './results/Pagination.jsx';
import Doc from './results/Doc.jsx';

import './Results.scss';

class Results extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		total: React.PropTypes.number.isRequired,
		currentPage: React.PropTypes.number.isRequired,
		rpp: React.PropTypes.number.isRequired,
		results: React.PropTypes.array.isRequired,
		onPageLoadRequest: React.PropTypes.func.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<section>
				<Pagination total={this.props.total} currentPage={this.props.currentPage} rpp={this.props.rpp} onPageLoadRequest={this.props.onPageLoadRequest} />
				<div className="docs">
					{this.props.results.map((doc, i) => <Doc key={`doc_${i}`} selectedDb={this.props.selectedDb} selectedCollection={this.props.selectedCollection} doc={doc} dispatch={this.props.dispatch} />)}
				</div>
				<Pagination total={this.props.total} currentPage={this.props.currentPage} rpp={this.props.rpp} onPageLoadRequest={this.props.onPageLoadRequest} />
			</section>
		);
	}
}

export default connect()(pacomoDecorator(Results));
