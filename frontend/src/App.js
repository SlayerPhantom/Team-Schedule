import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Forgot from './pages/Forgot';
import SendPasswordReset from './pages/SendPasswordReset';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/home" exact component={Home} />
				<Route path="/resetpassword/:${token}" exact component={Forgot} />
				<Route path="/forgotpassword" exact component={SendPasswordReset} />
			</Switch>
		</Router>
	);
}

export default App;
