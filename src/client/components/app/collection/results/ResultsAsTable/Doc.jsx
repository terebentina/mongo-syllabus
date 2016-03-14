import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { confirmAndRemoveDoc } from '../../../../../actions';

import styles from './Doc.scss';

class Doc extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		doc: React.PropTypes.object.isRequired,
		types: React.PropTypes.object.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onEditClick = (e) => {
		e.preventDefault();
	};

	onDeleteClick = (e) => {
		e.preventDefault();
		this.props.dispatch(confirmAndRemoveDoc(this.props.selectedDb, this.props.selectedCollection, this.props.doc._id));
	};

	render() {
		return (
			<tr className={styles.row}>
				<td className={styles.actions}>
					<a onClick={this.onEditClick}><svg className={styles.iconCreate}><use xlinkHref="#icon-create"></use></svg></a>
					<a onClick={this.onDeleteClick}><svg className={styles.iconDelete}><use xlinkHref="#icon-delete"></use></svg></a>
				</td>
				{Object.keys(this.props.types).map((prop) => <td key={prop} className={styles[this.props.types[prop]]}>{formatValue(this.props.doc[prop], this.props.types[prop])}</td>)}
			</tr>
		);
	}
}

function formatValue(val, type) {
	if (typeof val == 'undefined') {
		return <div className={styles.undefined}>&nbsp;</div>;
	}
	if (type == 'array') {
		const len = val.length;
		return `[${len ? len : ' '}]`;
	} else if (type == 'object') {
		const len = Object.keys(val).length;
		return `{${len ? len : ' '}}`;
	//} else if (type == 'objectId') {
	//	return `oid(${val})`;
	} else if (type == 'boolean') {
		return val ? 'true' : 'false';
	//} else if (type == 'string') {
	//	return val ? val : '""';
	}
	return val;
}

export default Doc;
