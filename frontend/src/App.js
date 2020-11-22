import React, { useState } from 'react';
import axios from 'axios';

import buildURL from './utils/buildURL';

function App() {
	const [user, setUser] = useState({});
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div>
			<div>
				<h1>Login</h1>
				<input
					type="text"
					value={username}
					onChange={(text) => setUsername(text.target.value)}
					placeholder="username"
				/>
				<input
					type="password"
					value={password}
					onChange={(text) => setPassword(text.target.value)}
					placeholder="password"
				/>
			</div>
			<button
				type="button"
				onClick={async () => {
					try {
						const url = buildURL('api/login');
						const res = await axios.post(url, { username, password });
						if (res.data.error) return console.error(res.data.error);
						const { id } = res.data;
						console.log(id);
						setUser({ username, id });
					} catch (e) {
						console.error(e);
					}
				}}
			>
				login
			</button>
			<div>
				<h1>Register</h1>
				<input
					type="text"
					value={username}
					onChange={(text) => setUsername(text.target.value)}
					placeholder="username"
				/>
				<input
					type="password"
					value={password}
					onChange={(text) => setPassword(text.target.value)}
					placeholder="password"
				/>
				<button
					type="button"
					onClick={async () => {
						try {
							const url = buildURL('api/register');
							const res = await axios.post(url, { username, password });
							if (res.data.error) {
								return console.error(res.data.error);
							}
							console.log('successfully registered');
						} catch (error) {
							console.error(error);
						}
					}}
				>
					register
				</button>
			</div>
			{user.username}
		</div>
	);
}

export default App;
