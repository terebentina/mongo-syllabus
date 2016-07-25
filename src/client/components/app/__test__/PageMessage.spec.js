import test from 'tape';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Sinon from 'sinon';

import PageMessage from '../PageMessage';
import styles from '../PageMessage.css';

test('Components:PageMessage', (t) => {
	const onHide = Sinon.spy();
	let component = shallow(<PageMessage onHide={onHide} />);
	t.equal(component.type(), null, 'does not render anything without a message');

	component = shallow(<PageMessage message={{ message: 'foo', type: 'bar' }} onHide={onHide} />);
	t.ok(component.is('div'), 'renders a <div>');
	t.notOk(component.props().className, 'no className if wrong type');
	t.equal(component.text(), 'foo', 'message is displayed');

	component = shallow(<PageMessage message={{ message: 'foo', type: 'error' }} onHide={onHide} />);
	t.equal(component.props().className, styles['page-message--error'], 'correct className is passed');
	t.equal(component.text(), 'foo', 'message is displayed');
	t.end();
});
