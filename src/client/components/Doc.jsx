import React from 'react';
import Highlight from './Highlight.jsx';
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
				<Highlight className="language-javascript">{beautify(JSON.stringify(this.props.doc), beautyOpts)}</Highlight>
			</article>
		);
	}
}

export default Doc;
