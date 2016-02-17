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
			<tr>
				<td></td>
				{Object.keys(this.props.types).map((prop) => <td key={prop} className={this.props.types[prop]}>{formatValue(this.props.doc[prop], this.props.types[prop])}</td>)}
			</tr>
		);
	}
}

function formatValue(val, type) {
	if (typeof val == 'undefined') {
		return <div className="undefined">&nbsp;</div>;
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
