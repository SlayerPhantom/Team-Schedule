import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import buildURL from '../utils/buildURL';
import background from '../images/bgimg.jpg';
import user from '../images/user.jpg';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	async function login() {
		try {
			const payload = { username, password };
			const url = buildURL('api/login');
			const res = await axios.post(url, payload);
			if (res.data.errors) {
				setMessage(res.data.errors);
				setTimeout(() => {
					setMessage('');
				}, 2000);
				console.log(res.data.errors);
				return;
			}
			const { token, scheduleid } = res.data;
			localStorage.setItem('token', token);
			localStorage.setItem('username', username);
			localStorage.setItem('scheduleid', scheduleid);
			window.location.replace('/home');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<img
				src={background}
				alt="background image"
				style={{
					width: '100%',
					height: '100%',
					opacity: 0.9,
					position: 'absolute',
				}}
			/>
			<div
				style={{
					width: '460px',
					height: '480px',
					backgroundColor: 'white',
					borderRadius: '10px',
					position: 'absolute',
				}}
			>
				<img
					src={user}
					alt="user"
					style={{
						display: 'flex',
						justifyContent: 'center',
						width: '100px',
						height: '90px',
						borderRadius: '10%',
						marginLeft: '180px',
						marginTop: '10px',
					}}
				/>
				<h1 style={{ textAlign: 'center' }}>Login</h1>
				<Form>
					<FormGroup style={{ margin: '20px' }}>
						<Label for="username">Username</Label>
						<Input
							type="text"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</FormGroup>
					<FormGroup style={{ margin: '20px' }}>
						<Label for="examplePassword">Password</Label>
						<Input
							type="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormGroup>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button type="button" color="primary" onClick={login}>
							Login
						</Button>
					</div>
					<div
						style={{
							margin: '20px',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Link to="/register">Don't have an account? Register Here!</Link>
						<Link to="/forgotpassword">Forgot password?</Link>
					</div>
				</Form>
				<p style={{ textAlign: 'center', marginBottom: '10px' }}>{message}</p>
			</div>
		</div>
	);
}

export default Login;
