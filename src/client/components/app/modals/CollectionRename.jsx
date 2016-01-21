import React from 'react';
import { connect } from 'react-redux';
import Link from '../../Tappable.jsx';
import { renameCollection } from '../../../actions';

class CollectionRename extends React.Component {
	static propTypes = {
		selectedCollection: React.PropTypes.string.isRequired,
		doDestroy: React.PropTypes.func.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = { collectionName: this.props.selectedCollection };
	}

	onChange(e) {
		this.setState({ collectionName: e.target.value });
	}

	onKeyDown(e) {
		if (e.keyCode == 13) {
			// on enter
			this.save(e);
		} else if (e.keyCode == 27) {
			// on esc
			this.props.doDestroy(e);
		}
	}

	save(e) {
		e.preventDefault();
		this.props.dispatch(renameCollection(this.state.collectionName));
		this.props.doDestroy(e);
	}

	render() {
		return (
			<div>
				<header>
					<h3>Rename collection</h3>
				</header>
				<main>
					<label>
						<span>New name:</span>
						<input type="text" value={this.state.collectionName} onChange={::this.onChange} onKeyDown={::this.onKeyDown} autoFocus />
					</label>
				</main>
				<footer className="actions">
					<Link onClickTap={this.props.doDestroy}>Cancel</Link>
					<button onClick={::this.save}>Save</button>
				</footer>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedCollection: state.selectedCollection || '',
	};
}

export default connect(mapStateToProps)(CollectionRename);
