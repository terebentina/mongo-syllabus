import React from 'react';
import Tap from './Tappable.jsx';

class SideMenu extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.array.isRequired,
		onDbSelect: React.PropTypes.func.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		collections: React.PropTypes.array.isRequired,
		onCollectionSelect: React.PropTypes.func.isRequired,
	};
	onDbSelect(db, e) {
		e.preventDefault();
		this.props.onDbSelect(db);
	}

	onCollectionSelect(collection, e) {
		e.preventDefault();
		this.props.onCollectionSelect(collection);
	}

	render() {
		return (
			<div>
				<h3>Databases</h3>
				{this.props.databases.map((db, i) => <Tap key={`db_${i}`} onClickTap={this.onDbSelect.bind(this, db.name)}>{db.name}</Tap>)}

				<h3>Collections</h3>
				{this.props.collections.map((collection, i) => <Tap key={`col_${i}`} onClickTap={this.onCollectionSelect.bind(this, collection)}>{collection}</Tap>)}
			</div>
		);
	}
}

export default SideMenu;
