import React from 'react';

class QueryBox extends React.Component {
	static propTypes = {
		onSubmit: React.PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.state = {query: ''};
	}

	onChange(e) {
		this.setState({query: e.target.value});
	}

	render() {
		return (
			<textarea ref="query" value={this.state.query} onChange={this.onChange} />
		);
	}
}

export default QueryBox;
