import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { fetchDatabasesIfNeeded, hideMessage } from './actions';
import Dashboard from './components/app/Dashboard.jsx';
import DBDashboard from './components/app/DBDashboard.jsx';
import Collection from './components/app/Collection.jsx';
import SideNav from './components/app/SideNav.jsx';
import PageMessage from './components/app/PageMessage.jsx';
import Confirm from './components/app/Confirm.jsx';
import ModalManager from './components/app/ModalManager.jsx';
import { PopoverWrapper } from '@terebentina/react-popover';

import styles from './app.scss';

// named export here so we can test App output without redux
export class App extends Component {
	static propTypes = {
		modalToShow: PropTypes.object,
		message: PropTypes.object,
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
		let content;
		if (!this.props.selectedDb) {
			content = <Dashboard />;
		} else if (!this.props.selectedCollection) {
			content = <DBDashboard db={this.props.selectedDb} />;
		} else {
			content = <Collection />;
		}

		return (
			<PopoverWrapper className={styles.app}>
				<PageMessage message={this.props.message} onHide={this.onHide} />
				<Confirm />
				<header className={styles.header}>
					<span>Mongo Syllabus</span>
				</header>
				<main className={styles.main}>
					<SideNav />
					{content}
				</main>
				<footer className={styles.footer}>2016 Dan Caragea</footer>
				{this.props.modalToShow ? <ModalManager modal={this.props.modalToShow.modal} payload={this.props.modalToShow.payload} /> : null}
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
