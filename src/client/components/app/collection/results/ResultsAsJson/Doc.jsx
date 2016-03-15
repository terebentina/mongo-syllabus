import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
const beautify = require('js-beautify').js_beautify;
import Highlight from './doc/Highlight.jsx';
import { confirmAndRemoveDoc } from '../../../../../actions';

import styles from './Doc.scss';

const beautyOpts = { indent_size: 2 };

export class Doc extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		doc: React.PropTypes.object.isRequired,
		actions: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onEditClick = (e) => {
		e.preventDefault();
	};

	onDeleteClick = (e) => {
		e.preventDefault();
		this.props.actions.confirmAndRemoveDoc(this.props.selectedDb, this.props.selectedCollection, this.props.doc._id);
	};

	render() {
		return (
			<article className={styles.article}>
				<header>
					<a onClick={this.onEditClick}><svg><use xlinkHref="#icon-create"></use></svg></a>
					<a onClick={this.onDeleteClick}><svg><use xlinkHref="#icon-delete"></use></svg></a>
				</header>
				<div>
					<Highlight className="language-javascript">{beautify(JSON.stringify(this.props.doc), beautyOpts)}</Highlight>
				</div>
			</article>
		);
	}
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators({ confirmAndRemoveDoc }, dispatch),
	};
}

export default connect(null, mapActionsToProps)(Doc);
