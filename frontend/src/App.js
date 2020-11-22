import React, { useState } from 'react';
import axios from 'axios';

import buildURL from './utils/buildURL';

function App() {
	const [user, setUser] = useState({});
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
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
					type="text"
					value={email}
					onChange={(text) => setEmail(text.target.value)}
					placeholder="email"
				/>
				<input
					type="text"
					value={fname}
					onChange={(text) => setFname(text.target.value)}
					placeholder="First Name"
				/>
				<input
					type="text"
					value={lname}
					onChange={(text) => setLname(text.target.value)}
					placeholder="Last Name"
				/>
				<input
					type="password"
					value={password}
					onChange={(text) => setPassword(text.target.value)}
					placeholder="password"
				/>
				<input
					type="password"
					value={password}
					onChange={(text) => setConfirmPassword(text.target.value)}
					placeholder="confirm password"
				/>
				<button
					type="button"
					onClick={async () => {
						try {
							const url = buildURL('api/register');
							const res = await axios.post(url, {
								username,
								password,
								email,
								confirmPassword,
								fname,
								lname,
							});
							if (res.data.error) {
								return console.error(res.data.error);
							}
							console.log('successfully registered, verify password to begin');
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
