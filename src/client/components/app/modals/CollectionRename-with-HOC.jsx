import React from 'react';
import { modal } from '../mixins/ModalHOC.jsx';

class CollectionRename extends React.Component {
	//static propTypes = {
	//};

	render() {
		return (
			<div className="modal">
				modal content as big or as small as we want
			</div>
		);
	}
}

export default modal(CollectionRename);
