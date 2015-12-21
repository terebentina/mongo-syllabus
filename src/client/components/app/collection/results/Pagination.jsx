import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Tap from '../../../Tappable.jsx';

import './Pagination.scss';

const countOut = 3;
const countIn = 3;

class Pagination extends React.Component {
	static propTypes = {
		total: React.PropTypes.number.isRequired,
		currentPage: React.PropTypes.number.isRequired,
		rpp: React.PropTypes.number.isRequired,
		onPageLoadRequest: React.PropTypes.func.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onPageClick(pageNum, e) {
		e.preventDefault();
		this.props.onPageLoadRequest(pageNum);
	}

	render() {
		if (!this.props.total) {
			return false;
		}
		const totalPages = Math.ceil(this.props.total / this.props.rpp);
		// Beginning group of pages: n1...n2
		const n1 = 1;
		const n2 = Math.min(countOut, totalPages - 1);

		// Ending group of pages: n7...n8
		const n7 = Math.max(2, totalPages - countOut + 1);
		const n8 = totalPages;

		// Middle group of pages: n4...n5
		const n4 = Math.max(n2 + 1, this.props.currentPage + 1 - countIn);
		const n5 = Math.min(n7 - 1, this.props.currentPage + 1 + countIn);
		const useMiddle = (n5 >= n4);

		// Point n3 between n2 and n4
		const n3 = parseInt((n2 + n4) / 2, 10);
		const useN3 = (useMiddle && ((n4 - n2) > 1));

		// Point n6 between n5 and n7
		const n6 = parseInt((n5 + n7) / 2, 10);
		const useN6 = (useMiddle && ((n7 - n5) > 1));
		const links = [];

		// Generate links data in accordance with calculated numbers
		for (let i = n1; i <= n2; i++) {
			links.push(<Tap key={`pag_${i}`} className={this.props.currentPage === i - 1 ? 'active' : ''} onClickTap={this.onPageClick.bind(this, i - 1)}>{i}</Tap>);
		}
		if (useN3) {
			links.push(<span key={`pag_${n3}`}>...</span>);
		}
		for (let i = n4; i <= n5; i++) {
			links.push(<Tap key={`pag_${i}`} className={this.props.currentPage === i - 1 ? 'active' : ''} onClickTap={this.onPageClick.bind(this, i - 1)}>{i}</Tap>);
		}
		if (useN6) {
			links.push(<span key={`pag_${n6}`}>...</span>);
		}
		for (let i = n7; i <= n8; i++) {
			links.push(<Tap key={`pag_${i}`} className={this.props.currentPage === i - 1 ? 'active' : ''} onClickTap={this.onPageClick.bind(this, i - 1)}>{i}</Tap>);
		}

		return (
			<div>
				{links}
			</div>
		);
	}
}

export default Pagination;
