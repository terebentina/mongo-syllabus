import React from 'react';
import { pacomoDecorator } from '../utils/pacomo';
import { connect } from 'react-redux';
import { fetchDocs } from '../actions';

@pacomoDecorator
class Main extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.array.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		collections: React.PropTypes.array.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	componentDidMount() {
		console.log('dispatch in main?', this.props.dispatch);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedCollection && nextProps.selectedCollection !== this.props.selectedCollection) {
			nextProps.dispatch(fetchDocs(nextProps.selectedCollection));
		}
	}

	render() {
		return (
			<main>
				<h2>{`Collection: ${this.props.selectedCollection}`}</h2>
				<textarea ref="query" />
			</main>
		);
	}
}

function mapStateToProps(state = {selectedDb: '', databases: [], selectedCollection: '', collections: []}) {
	return state;
}

export default connect(mapStateToProps)(Main);
