import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
//import Sinon from 'sinon';

import Tappable from '../Tappable.jsx';

function prepare(component) {
	const renderer = TestUtils.createRenderer();
	renderer.render(component);
	return renderer.getRenderOutput();
}

test('Components:Tappable', (t) => {
	const onClickTap = () => {};
	const component = prepare(<Tappable className="foo" onClickTap={onClickTap}>Link text</Tappable>);
	t.equal(component.type, 'a', 'renders an <a>');
	t.equal(component.props.className, 'foo', 'correct className is passed');
	t.equal(typeof component.props.onClick, 'function', 'onClick handler added');
	t.equal(typeof component.props.onTouchEnd, 'function', 'onTouchEnd handler added');
	t.equal(typeof component.props.onTouchStart, 'function', 'onTouchStart handler added');
	t.equal(component.props.children, 'Link text', 'proper text added');
	t.end();
});
