import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
const beautify = require('js-beautify').js_beautify;
import Highlight from './doc/Highlight.jsx';
import { confirmAndRemoveDoc, showModal } from '../../../../../actions';

import styles from './Doc.scss';

const beautyOpts = { indent_size: 2 };

export class Doc extends Component {
	static propTypes = {
		selectedDb: PropTypes.string.isRequired,
		selectedCollection: PropTypes.string.isRequired,
		doc: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onEditClick = (e) => {
		e.preventDefault();
		this.props.actions.showModal('UpdateDocument', { db: this.props.selectedDb, collection: this.props.selectedCollection, doc: this.props.doc });
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
		actions: bindActionCreators({ confirmAndRemoveDoc, showModal }, dispatch),
	};
}

export default connect(null, mapActionsToProps)(Doc);
