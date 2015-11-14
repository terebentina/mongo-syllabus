import React from 'react';
import Tap from './Tappable.jsx';
import { pacomoDecorator } from '../utils/pacomo';

import './Pagination.scss';

@pacomoDecorator
class Pagination extends React.Component {
	static propTypes = {
		total: React.PropTypes.number.isRequired,
		currentPage: React.PropTypes.number.isRequired,
		rpp: React.PropTypes.number.isRequired,
		onPageLoadRequest: React.PropTypes.func.isRequired,
	};

	onPageClick(pageNum, e) {
		e.preventDefault();
		this.props.onPageLoadRequest(pageNum);
	}

	render() {
		if (!this.props.total) {
			return false;
		}
		const totalPages = Math.ceil(this.props.total / this.props.rpp);

		const links = [];

		for (let i = 1; i <= totalPages; i++) {
			links.push(<Tap key={`pag_${i}`} onClickTap={this.onPageClick.bind(this, i)}>{i}</Tap>);
		}

		return (
			<div>
				{links}
			</div>
		);
	}
}

export default Pagination;
