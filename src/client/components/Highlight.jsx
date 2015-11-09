import React from 'react';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';

function hightlight(elem) {
	Prism.highlightElement(elem, false);
}

class Highlight extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		className: React.PropTypes.string.isRequired,
	};

	componentDidMount() {
		hightlight(this.refs.code);
	}

	componentDidUpdate() {
		hightlight(this.refs.code);
	}

	render() {
		return (
			<code ref="code" className={this.props.className}>
				{this.props.children}
			</code>
		);
	}
}

export default Highlight;
