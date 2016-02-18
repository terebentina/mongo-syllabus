import React from 'react';
import { connect } from 'react-redux';
import { createCollection } from '../../../actions';

class CollectionCreate extends React.Component {
	static propTypes = {
		payload: React.PropTypes.shape({
			db: React.PropTypes.string,
		}).isRequired,
		doDestroy: React.PropTypes.func.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	state = { collectionName: '' };

	onChange = (e) => {
		this.setState({ collectionName: e.target.value });
	};

	onKeyDown = (e) => {
		if (e.keyCode == 13) {
			// on enter
			this.save(e);
		} else if (e.keyCode == 27) {
			// on esc
			this.props.doDestroy(e);
		}
	};

	save = (e) => {
		e.preventDefault();
		this.props.dispatch(createCollection(this.props.payload.db, this.state.collectionName));
		this.props.doDestroy(e);
	};

	render() {
		return (
			<div>
				<header>
					<h3>Add collection</h3>
				</header>
				<main>
					<label>
						<span>Collection name:</span>
						<input type="text" value={this.state.collectionName} onChange={this.onChange} onKeyDown={this.onKeyDown} autoFocus />
					</label>
				</main>
				<footer className="actions">
					<a onClick={this.props.doDestroy}>Cancel</a>
					<button onClick={this.save}>Save</button>
				</footer>
			</div>
		);
	}
}

export default connect()(CollectionCreate);
