import React from 'react';
import Highlight from './Highlight.jsx';
import shouldPureComponentUpdate from 'react-pure-render/function';

import './Doc.scss';

class Doc extends React.Component {
	static propTypes = {
		// exactly 1 child
		doc: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<article>
				<Highlight className="language-javascript">{JSON.stringify(this.props.doc)}</Highlight>
			</article>
		);
	}
}

export default Doc;
