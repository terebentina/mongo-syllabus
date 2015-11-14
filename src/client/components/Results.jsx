import React from 'react';
import { pacomoDecorator } from '../utils/pacomo';
import Pagination from './Pagination.jsx';
import Doc from './Doc.jsx';

@pacomoDecorator
class Results extends React.Component {
	static propTypes = {
		total: React.PropTypes.number.isRequired,
		currentPage: React.PropTypes.number.isRequired,
		rpp: React.PropTypes.number.isRequired,
		results: React.PropTypes.array.isRequired,
		onPageLoadRequest: React.PropTypes.func.isRequired,
	};

	render() {
		return (
			<div>
				<Pagination total={this.props.total} currentPage={this.props.currentPage} rpp={this.props.rpp} onPageLoadRequest={this.props.onPageLoadRequest} />
				<div className="results">
					{this.props.results.map((doc, i) => <Doc key={`doc_${i}`} doc={doc} />)}
				</div>
			</div>
		);
	}
}

export default Results;
