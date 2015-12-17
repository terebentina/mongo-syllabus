import React from 'react';
import history from '../history';

class Tappable extends React.Component {
	static propTypes = {
		className: React.PropTypes.string,
		title: React.PropTypes.string,
		tabIndex: React.PropTypes.string,
		rel: React.PropTypes.string,
		target: React.PropTypes.string,
		to: React.PropTypes.string,
		onClick: React.PropTypes.func,
		onClickTap: React.PropTypes.func,
		children: React.PropTypes.node,
	};
	shouldComponentUpdate() {
		return false;
	}
	onTouchStart(e) {
		// this is what prevents click events from happening. Doing the same from touchend doesn't work!!!
		e.preventDefault();
	}
	render() {
		const props = {
			href: '#',
			className: this.props.className,
			title: this.props.title,
			tabIndex: this.props.tabIndex,
			rel: this.props.rel,
			target: this.props.target,
			onTouchStart: this.onTouchStart,
		};

		if (this.props.to) {
			props.onClick = props.onTouchEnd = (e) => {
				e.preventDefault();
				//console.log('e.type', e.type);
				history.pushState(null, this.props.to);
			};
		} else if (this.props.onClickTap) {
			props.onClick = this.props.onClickTap;
			props.onTouchEnd = this.props.onClickTap;
		} else if (this.props.onClick) {
			props.onClick = this.props.onClick;
			props.onTouchEnd = this.props.onClick;
		}
		return <a {...props}>{this.props.children}</a>;
	}
}

export default Tappable;
