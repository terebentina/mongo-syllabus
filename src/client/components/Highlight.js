import React from 'react';
import Prism from 'prismjs';

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
			<pre ref="code">
				<code className={this.props.className}>
					{this.props.children}
				</code>
			</pre>
		);
	}
}

export default Highlight;
