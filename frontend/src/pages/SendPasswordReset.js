import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import buildURL from '../utils/buildURL';
import background from '../images/bgimg.jpg';
import user from '../images/user.jpg';

function SendPasswordReset() {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	async function sendEmail() {
		try {
			const payload = { email };
			const url = buildURL(`api/miscellaneous/resetpassword`);
			const res = await axios.post(url, payload);
			if (res.data.errors) {
				setMessage(res.data.errors);
				console.log(res.data.errors);
				return;
			}
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
				alt="background"
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
				<h1 style={{ textAlign: 'center' }}>Enter your Email Adress</h1>
				<Form>
					<FormGroup style={{ margin: '20px' }}>
						<Label for="email">Email</Label>
						<Input
							type="text"
							name="email"
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormGroup>

					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button type="button" color="primary" onClick={sendEmail}>
							Send Email
						</Button>
					</div>
					<div
						style={{
							margin: '20px',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Link to="/">Go to login</Link>
					</div>
				</Form>
				<p style={{ textAlign: 'center', marginBottom: '10px' }}>{message}</p>
			</div>
		</div>
	);
}

export default SendPasswordReset;
