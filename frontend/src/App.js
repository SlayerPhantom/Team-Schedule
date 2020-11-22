import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/home" exact component={Home} />
			</Switch>
		</Router>
	);
}

export default App;
