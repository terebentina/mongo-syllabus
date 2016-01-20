import React from 'react';
import Link from '../../Tappable.jsx';

class CollectionRename extends React.Component {
	static propTypes = {
		doDestroy: React.PropTypes.func.isRequired,
	};

	render() {
		return (
			<div>
				<header>
					<h3>Rename collection</h3>
				</header>
				<main>
					<label>
						<span>New name:</span>
						<input type="text" />
					</label>
				</main>
				<footer className="actions">
					<Link onClickTap={this.props.doDestroy}>Cancel</Link>
					<button type="submit">Save</button>
				</footer>
			</div>
		);
	}
}

export default CollectionRename;
