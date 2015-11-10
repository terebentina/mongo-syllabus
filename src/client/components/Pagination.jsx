import React from 'react';

class Pagination extends React.Component {
	static propTypes = {
		total: React.PropTypes.number.isRequired,
		prev: React.PropTypes.string,
		next: React.PropTypes.string,
	};

	render() {
		return (
			<div>
				{this.props.prev ? <span><a href={this.props.prev}>&lt; Go back</a></span> : null}
				{this.props.next ? <span><a href={this.props.next}>Go forward &gt;</a></span> : null}
			</div>
		);
	}
}

export default Pagination;
