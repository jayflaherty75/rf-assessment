
import React from 'react';
// import { Route, Switch } from 'react-router';
// import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";

const SignUpModule = () => (<div>This is a temporary page</div>);

class AppRoutes extends React.Component {
	render () {
		const { history } = this.props;

		return (
			<Router history={history}>
				<Routes>
					<Route exact path="/" render={() => (<SignUpModule />)} />
				</Routes>
			</Router>
		);
	}
}

export default AppRoutes;
