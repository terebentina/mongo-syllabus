import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { searchDocs, showMessage } from '../../../actions';
import * as Constants from '../../../actions/constants';

import styles from './QueryBox.scss';

class QueryBox extends React.Component {
	static propTypes = {
		onSubmit: React.PropTypes.func.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	state = { query: '', limit: 30 };

	shouldComponentUpdate = shouldPureComponentUpdate;

	onChange = (e) => {
		this.setState({ query: e.target.value });
	};

	onChangeLimit = (e) => {
		this.setState({ limit: e.target.value });
	};

	sendQuery = (e) => {
		e.preventDefault();

		try {
			if (this.state.query != '' && this.state.query != '{}') {
				JSON.parse(this.state.query);
			}
			this.props.dispatch(searchDocs(this.state));
		} catch (err) {
			this.props.dispatch(showMessage('Invalid JSON entered. Please fix your query and try again', Constants.MESSAGE_ERROR));
		}
	};

	render() {
		return (
			<form onSubmit={this.sendQuery} className={styles.querybox}>
				<header>Filter:</header>
				<textarea ref="query" value={this.state.query} onChange={this.onChange} />
				<select value={this.state.limit} onChange={this.onChangeLimit}>
					<option value={10}>10</option>
					<option value={30}>30</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</select>
				<button type="submit">Run query</button>
			</form>
		);
	}
}

export default QueryBox;
