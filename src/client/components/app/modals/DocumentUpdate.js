import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { documentUpdatePayloadShape } from 'client/store/shapes';

class DocumentUpdate extends Component {
	static propTypes = {
		payload: documentUpdatePayloadShape.isRequired,
		doDestroy: PropTypes.func.isRequired,
		actions: PropTypes.object.isRequired,
	};

	state = { doc: JSON.stringify(this.props.payload.doc, null, 4) };

	shouldComponentUpdate = shouldPureComponentUpdate;

	onChange = (e) => {
		this.setState({ doc: e.target.value });
	};

	onKeyDown = (e) => {
		if (e.keyCode == 27) {
			// on esc
			this.props.doDestroy(e);
		}
	};

	save = (e) => {
		e.preventDefault();
		this.props.actions.updateDocument(this.props.payload, this.state.doc);
		this.props.doDestroy(e);
	};

	render() {
		return (
			<div>
				<header>
					<h3>Update document</h3>
				</header>
				<main>
					<label>
						<span>Doc:</span>
						<textarea value={this.state.doc} onChange={this.onChange} onKeyDown={this.onKeyDown} autoFocus />
					</label>
				</main>
				<footer className="actions">
					<a onClick={this.props.doDestroy}>Cancel</a>
					<button onClick={this.save}>Save</button>
				</footer>
			</div>
		);
	}
}

export default DocumentUpdate;
