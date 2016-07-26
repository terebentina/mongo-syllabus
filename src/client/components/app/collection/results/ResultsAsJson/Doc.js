import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
const beautify = require('js-beautify').js_beautify;
import Highlight from './doc/Highlight';

import styles from './Doc.css';

const beautyOpts = { indent_size: 2 };

class Doc extends Component {
	static propTypes = {
		selectedDb: PropTypes.string.isRequired,
		selectedCollection: PropTypes.string.isRequired,
		doc: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onEditClick = (e) => {
		const { actions, selectedDb, selectedCollection, doc } = this.props;

		e.preventDefault();
		actions.showModal('DocumentUpdate', { db: selectedDb, collection: selectedCollection, doc: doc });
	};

	onDeleteClick = (e) => {
		const { actions, selectedDb, selectedCollection, doc } = this.props;

		e.preventDefault();
		actions.confirmAndRemoveDoc(selectedDb, selectedCollection, doc._id);
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

export default Doc;
