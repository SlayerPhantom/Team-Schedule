import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import buildURL from '../utils/buildURL';
import background from '../images/bgimg.jpg';
import registericon from '../images/register.jpg';
function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [message, setMessage] = useState('');

	async function register() {
		try {
			const payload = {
				username,
				password,
				confirmPassword,
				fname,
				lname,
				email,
			};
			const url = buildURL('api/register');
			const res = await axios.post(url, payload);
			if (res.data.errors) {
				setMessage(res.data.errors);
				return console.log(res.data.errors);
			}
			setUsername('');
			setPassword('');
			setConfirmPassword('');
			setEmail('');
			setFname('');
			setLname('');
			setMessage(res.data.message);
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
					width: '600px',
					height: '600px',
					backgroundColor: 'white',
					borderRadius: '10px',
					position: 'absolute',
				}}
			>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<img
						src={registericon}
						alt="user"
						style={{
							width: '100px',
							height: '90px',
							borderRadius: '10%',
							marginTop: '10px',
						}}
					/>
				</div>
				<h1 style={{ textAlign: 'center' }}>Register</h1>
				<Form>
					<FormGroup style={{ margin: '5px 10px 0 10px' }}>
						<Label for="username">Username</Label>
						<Input
							type="text"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</FormGroup>
					<FormGroup style={{ margin: '5px 10px 0 10px' }}>
						<Label for="email">Email</Label>
						<Input
							type="text"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormGroup>
					<Row form style={{ margin: '5px 10px 0 10px' }}>
						<Col md={6}>
							<FormGroup>
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="confirm password">Confirm Password</Label>
								<Input
									type="password"
									name="confirm password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</FormGroup>
						</Col>
					</Row>
					<Row form style={{ margin: '5px 10px 0 10px' }}>
						<Col md={6}>
							<FormGroup>
								<Label for="First Name">First Name</Label>
								<Input
									type="text"
									name="fname"
									placeholder="First Name"
									value={fname}
									onChange={(e) => setFname(e.target.value)}
								/>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label for="Last Name">Last Name</Label>
								<Input
									type="text"
									name="lname"
									placeholder="Last Name"
									value={lname}
									onChange={(e) => setLname(e.target.value)}
								/>
							</FormGroup>
						</Col>
					</Row>

					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button type="button" color="primary" onClick={register}>
							Register
						</Button>
					</div>
					<div
						style={{
							margin: '20px',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Link to={'/'}>Already have an account? Sign in</Link>
					</div>
					<p style={{ textAlign: 'center', marginBottom: '10px' }}>{message}</p>
				</Form>
			</div>
		</div>
	);
}

export default Register;
