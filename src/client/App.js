import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { PopoverWrapper } from '@terebentina/react-popover';
import { fetchDatabasesIfNeeded, hideMessage } from './actions';
import { pageMessageShape, modalShape } from './store/shapes';
import Dashboard from './components/app/Dashboard';
import DBDashboard from './components/app/DBDashboard';
import CollectionConnector from './components/app/CollectionConnector';
import SideNavConnector from './components/app/SideNavConnector';
import PageMessage from './components/app/PageMessage';
import ConfirmConnector from './components/app/ConfirmConnector';
import ModalManagerConnector from './components/app/ModalManagerConnector';

import styles from './App.css';

// named export here so we can test App output without redux
export class App extends Component {
	static propTypes = {
		modalToShow: modalShape,
		message: pageMessageShape,
		selectedDb: PropTypes.string.isRequired,
		selectedCollection: PropTypes.string.isRequired,
		actions: PropTypes.object.isRequired,
	};

	componentDidMount() {
		this.props.actions.fetchDatabasesIfNeeded();
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	onHide = () => this.props.actions.hideMessage();

	render() {
		const { selectedDb, selectedCollection, message, modalToShow } = this.props;

		let content;
		if (!selectedDb) {
			content = <Dashboard />;
		} else if (!selectedCollection) {
			content = <DBDashboard db={selectedDb} />;
		} else {
			content = <CollectionConnector />;
		}

		return (
			<PopoverWrapper className={styles.app}>
				<PageMessage message={message} onHide={this.onHide} />
				<ConfirmConnector />
				<header className={styles.header}>
					<span>Mongo Syllabus</span>
				</header>
				<main className={styles.main}>
					<SideNavConnector />
					{content}
				</main>
				<footer className={styles.footer}>2016 Dan Caragea</footer>
				{modalToShow ? <ModalManagerConnector modal={modalToShow.modal} payload={modalToShow.payload} /> : null}
			</PopoverWrapper>
		);
	}
}

function mapStateToProps(state) {
	return {
		modalToShow: state.modalToShow || null,
		message: state.message || null,
		selectedDb: state.selectedDb || '',
		selectedCollection: state.selectedCollection || '',
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators({ fetchDatabasesIfNeeded, hideMessage }, dispatch),
	};
}

export default connect(mapStateToProps, mapActionsToProps)(App);
