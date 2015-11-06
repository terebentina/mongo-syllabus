import React from 'react';

class Tappable extends React.Component {
	static propTypes = {
		className: React.PropTypes.string,
		title: React.PropTypes.string,
		tabIndex: React.PropTypes.string,
		rel: React.PropTypes.string,
		target: React.PropTypes.string,
		onClickTap: React.PropTypes.func.isRequired,
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

		if (this.props.onClickTap) {
			props.onClick = this.props.onClickTap;
			props.onTouchEnd = this.props.onClickTap;
		}

		return <a {...props}>{this.props.children}</a>;
	}
}

export default Tappable;
