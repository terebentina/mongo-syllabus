import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { setDocsFilter } from '../../../actions';

class QueryBox extends React.Component {
	static propTypes = {
		onSubmit: React.PropTypes.func.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.state = { query: '' };
	}

	componentWillMount() {
		this.props.dispatch(setDocsFilter());
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	onChange(e) {
		this.setState({ query: e.target.value });
	}

	render() {
		return (
			<textarea ref="query" value={this.state.query} onChange={this.onChange} />
		);
	}
}

export default QueryBox;
