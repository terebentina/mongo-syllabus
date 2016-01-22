import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
//import Sinon from 'sinon';

import PageMessage from '../PageMessage.jsx';

function prepare(component) {
	const renderer = TestUtils.createRenderer();
	renderer.render(component);
	return renderer.getRenderOutput();
}

test('Components:PageMessage', (t) => {
	let component = prepare(<PageMessage onHide={() => {}} />);
	t.equal(component, null, 'does not render anything without a message');

	component = prepare(<PageMessage message={{ message: 'foo', type: 'bar' }} onHide={() => {}} />);
	t.equal(component.type, 'div', 'renders a <div>');
	t.equal(component.props.className, 'bar', 'correct className is passed');
	t.equal(component.props.children, 'foo', 'message is displayed');
	t.end();
});
