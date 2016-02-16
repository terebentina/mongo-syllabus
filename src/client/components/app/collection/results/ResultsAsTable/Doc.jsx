import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { confirmAndRemoveDoc } from '../../../../../actions';
import { getPropertyType } from '../../../../../utils/mongodb';

//import './Doc.scss';

class Doc extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		doc: React.PropTypes.object.isRequired,
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
			<tr>
				<td></td>
				{Object.keys(this.props.doc).map((prop) => <td key={prop}>{formatValue(this.props.doc[prop])}</td>)}
			</tr>
		);
	}
}

function formatValue(val) {
	const type = getPropertyType(val);
	if (type == 'array') {
		return `Array[${val.length}]`;
	} else if (type == 'object') {
		return `Object{${Object.keys(val).length}}`;
	} else if (type == 'objectId') {
		return `ObjectID(${val})`;
	} else if (type == 'boolean') {
		return val ? 'true' : 'false';
	} else if (type == 'string') {
		return val ? val : '""';
	}
	return val;
}

export default Doc;
