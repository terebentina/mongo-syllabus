import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import * as Constants from 'client/actions/constants';

import styles from './QueryBox.css';

class QueryBox extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		actions: PropTypes.object.isRequired,
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
			this.props.actions.searchDocs(this.state);
		} catch (err) {
			this.props.actions.showMessage('Invalid JSON entered. Please fix your query and try again', Constants.MESSAGE_ERROR);
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
