import React from 'react';
import Tap from './Tappable.jsx';

class SideNav extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.array.isRequired,
		onDbSelect: React.PropTypes.func.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		collections: React.PropTypes.array.isRequired,
		onCollectionSelect: React.PropTypes.func.isRequired,
	};

	onDbSelect(e) {
		console.log('e.target.value', e.target.value);
		e.preventDefault();
		this.props.onDbSelect(e.target.value);
	}

	onCollectionSelect(collection, e) {
		e.preventDefault();
		this.props.onCollectionSelect(collection);
	}

	render() {
		return (
			<nav>
				<div>
					Databases:
					<select value={this.props.selectedDb} onChange={this.onDbSelect.bind(this)}>
						<option value=""></option>
						{this.props.databases.map((db, i) => <option key={`db_${i}`} value={db.name}>{db.name}</option>)}
					</select>
				</div>

				<h3>Collections</h3>
				{this.props.collections.map((collection, i) => <Tap key={`col_${i}`} onClickTap={this.onCollectionSelect.bind(this, collection)}>{collection}</Tap>)}
			</nav>
		);
	}
}

export default SideNav;
