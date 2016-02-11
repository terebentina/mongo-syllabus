import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { pacomoDecorator } from '../../utils/pacomo';
import { searchDocs, fetchDocs, showModal, confirmAndDropCollection } from '../../actions';
import QueryBox from './collection/QueryBox.jsx';
import Results from './collection/Results.jsx';
import Popover from '@terebentina/react-popover';

import './Collection.scss';

export class Collection extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		filter: React.PropTypes.object.isRequired,
		docs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		totalDocs: React.PropTypes.number.isRequired,
		currentPage: React.PropTypes.number.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onNewQuery(filter) {
		this.props.dispatch(searchDocs(filter));
	}

	onPageLoad(pageNum) {
		this.props.dispatch(fetchDocs(pageNum));
	}

	onRenameClick(e) {
		e.preventDefault();
		this.props.dispatch(showModal('CollectionRename', { db: this.props.selectedDb, collection: this.props.selectedCollection }));
	}

	onDropClick(e) {
		e.preventDefault();
		this.props.dispatch(confirmAndDropCollection(this.props.selectedDb, this.props.selectedCollection));
	}

	render() {
		if (!this.props.selectedDb || !this.props.selectedCollection) {
			return null;
		}
		return (
			<div>
				<header>
					<h2>{`Collection: ${this.props.selectedCollection}`}</h2>
					<a onClick={::this.onRenameClick}><svg className="icon-create"><use xlinkHref="#icon-create"></use></svg></a>
					<a onClick={::this.onDropClick}><svg className="icon-delete"><use xlinkHref="#icon-delete"></use></svg></a>
					<a href="#"><svg className="icon-add"><use xlinkHref="#icon-add"></use></svg></a>
					<Popover className="menu" position="bottom" trigger={<svg className="icon-visibility"><use xlinkHref="#icon-visibility"></use></svg>}>
						<a href="#">as Json</a>
						<a href="#">as table</a>
					</Popover>

				</header>
				<QueryBox dispatch={this.props.dispatch} onSubmit={::this.onNewQuery} />
				<Results selectedDb={this.props.selectedDb} selectedCollection={this.props.selectedCollection} results={this.props.docs} total={this.props.totalDocs} currentPage={this.props.currentPage} rpp={this.props.filter.limit} onPageLoadRequest={::this.onPageLoad} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		selectedDb: state.selectedDb || '',
		selectedCollection: state.selectedCollection || '',
		filter: state.filter || { query: '', limit: 30 },
		docs: state.docs || [],
		totalDocs: state.totalDocs || 0,
		currentPage: state.currentPage || 0,
	};
}

export default connect(mapStateToProps)(pacomoDecorator(Collection));
