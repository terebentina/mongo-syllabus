import React from 'react';
import Highlight from './doc/Highlight.jsx';
import shouldPureComponentUpdate from 'react-pure-render/function';
const beautify = require('js-beautify').js_beautify;

import './Doc.scss';

const beautyOpts = { indent_size: 2 };

class Doc extends React.Component {
	static propTypes = {
		// exactly 1 child
		doc: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<article>
				<header><a href=""><svg className="icon-create"><use xlinkHref="#icon-create"></use></svg></a><a href=""><svg className="icon-delete"><use xlinkHref="#icon-delete"></use></svg></a></header>
				<div>
					<Highlight className="language-javascript">{beautify(JSON.stringify(this.props.doc), beautyOpts)}</Highlight>
				</div>
			</article>
		);
	}
}

export default Doc;
