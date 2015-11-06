import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import TestUtils from 'react-addons-test-utils';

// http://simonsmith.io/unit-testing-react-components-without-a-dom/
var createComponent = function(component, props = {}, ...children) {
	const renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
	return renderer.getRenderOutput();
};


test('Components:App', (assert) => {
	const component = createComponent(App);
	const expected = 'boo3';
	assert.deepEqual(component.props.children, expected);
	assert.end();
});
