import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { confirmAndRemoveDoc } from '../../../../../actions';

import styles from './Doc.scss';

export class Doc extends Component {
	static propTypes = {
		selectedDb: PropTypes.string.isRequired,
		selectedCollection: PropTypes.string.isRequired,
		doc: PropTypes.object.isRequired,
		types: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onEditClick = (e) => {
		e.preventDefault();
	};

	onDeleteClick = (e) => {
		const { actions, selectedDb, selectedCollection, doc } = this.props;

		e.preventDefault();
		actions.confirmAndRemoveDoc(selectedDb, selectedCollection, doc._id);
	};

	render() {
		const { types, doc } = this.props;

		return (
			<tr className={styles.row}>
				<td className={styles.actions}>
					<a onClick={this.onEditClick}><svg><use xlinkHref="#icon-create"></use></svg></a>
					<a onClick={this.onDeleteClick}><svg><use xlinkHref="#icon-delete"></use></svg></a>
				</td>
				{Object.keys(types).map((prop) => <td key={prop} className={styles[types[prop]]}>{formatValue(doc[prop], types[prop])}</td>)}
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
		return `[${len || ' '}]`;
	} else if (type == 'object') {
		const len = Object.keys(val).length;
		return `{${len || ' '}}`;
	//} else if (type == 'objectId') {
	//	return `oid(${val})`;
	} else if (type == 'boolean') {
		return val ? 'true' : 'false';
	//} else if (type == 'string') {
	//	return val ? val : '""';
	}
	return val;
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators({ confirmAndRemoveDoc }, dispatch),
	};
}

export default connect(null, mapActionsToProps)(Doc);
