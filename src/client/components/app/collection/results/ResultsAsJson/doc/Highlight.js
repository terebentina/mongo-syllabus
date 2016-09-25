import React, { Component, PropTypes } from 'react';
import Prism from 'prismjs';
import shouldPureComponentUpdate from 'react-pure-render/function';

import './Highlight.css';

function hightlight(elem) {
  Prism.highlightElement(elem, false);
}

class Highlight extends Component {
  static propTypes = {
    children: PropTypes.node, className: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    hightlight(this.refs.code);
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidUpdate = () => {
    hightlight(this.refs.code);
  };

  render() {
    return (
      <pre ref="code" className={this.props.className}>
        {this.props.children}
      </pre>
    );
  }
}

export default Highlight;
