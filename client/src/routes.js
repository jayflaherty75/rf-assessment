
import React from 'react';
// import { Route, Switch } from 'react-router';
// import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";

const Page1 = () => (<div>This is temporary page 1</div>);
const Page2 = () => (<div>This is temporary page 2</div>);
const Page3 = () => (<div>This is temporary page 3</div>);

class AppRoutes extends React.Component {
	render () {
		const { history } = this.props;

		return (
			<ConnectedRouter history={history}>
				<Routes>
                    <Route exact path="/" render={() => (<Page1 />)} />
                    <Route exact path="/page2" render={() => (<Page2 />)} />
                    <Route exact path="/page3" render={() => (<Page3 />)} />
                    <Route path="*" element={<div>Page not found.</div>} />
				</Routes>
			</ConnectedRouter>
		);
	}
}

export default AppRoutes;
