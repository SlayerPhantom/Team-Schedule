import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMinus } from 'react-icons/fa';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';

import buildURL from '../utils/buildURL';
import usergroups from '../utils/groups';
function Home() {
	const [groups, setgroups] = useState(usergroups);
	const [groupname, setgroupname] = useState('');
	const [token, settoken] = useState('');
	const [username, setusername] = useState('');
	const [modal, setModal] = useState(false);
	const [message, setMessage] = useState('');
	const toggle = () => setModal(!modal);

	useEffect(() => {
		settoken(localStorage.getItem('token'));
		setusername(localStorage.getItem('username'));
	});

	function logout() {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		localStorage.removeItem('scheduleid');
		window.location.replace('/');
	}
	function gotogroup(id) {
		const url = buildURL(`group/${id}`);
		window.location.replace(url);
	}

	function removeGroup() {
		console.log('remove group');
	}

	async function addGroup() {
		try {
			const url = buildURL('api/group/creategroup');
			const headers = { Authorization: token };
			const payload = { name: groupname };
			const res = await axios.post(url, payload, { headers });
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
			}
			const { id, scheduleid, members, message } = res.data;
			setgroups([
				...groups,
				{ id, name: groupname, scheduleid, creator: username, members },
			]);
			setMessage(message);
			setTimeout(() => {
				setMessage('');
			}, 2000);
			toggle();
		} catch (error) {
			console.log(error);
		}
	}

	function onHover(e) {
		e.target.style.color = 'red';
	}

	function offHover(e) {
		e.target.style.color = 'white';
	}

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				backgroundColor: 'gray',
				position: 'relative',
			}}
		>
			<div
				style={{
					width: '300px',
					height: '100%',
					position: 'fixed',
					backgroundColor: 'black',
					color: 'white',
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						borderBottom: '1px solid white',
						marginBottom: '10px',
					}}
				>
					<h1
						style={{
							textAlign: 'center',
							marginTop: '20px',
							textDecoration: 'underlined',
						}}
					>
						Groups
					</h1>{' '}
					<div style={{ marginTop: '25px' }}>
						<Button color="primary" onClick={toggle}>
							Add Group
						</Button>
						<Modal isOpen={modal} toggle={toggle}>
							<ModalHeader toggle={toggle}>Add group</ModalHeader>
							<ModalBody>
								<Form>
									<FormGroup>
										<Label for="group name">group name</Label>
										<Input
											type="text"
											name="name"
											id="groupname"
											placeholder="group name"
											value={groupname}
											onChange={(e) => setgroupname(e.target.value)}
										/>
									</FormGroup>
								</Form>
							</ModalBody>
							<ModalFooter>
								<Button
									color="primary"
									onClick={() => {
										addGroup();
									}}
								>
									Add
								</Button>{' '}
								<Button color="secondary" onClick={toggle}>
									Cancel
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				</div>
				{groups.map((group) => (
					<div
						key={group.id}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '5px',
						}}
					>
						<h3
							style={{
								cursor: 'pointer',
								textAlign: 'center',
							}}
							onMouseOver={onHover}
							onMouseLeave={offHover}
							onClick={() => {
								gotogroup(group.id);
							}}
						>
							{group.name}
						</h3>
						<Button color="danger" size="sm" onClick={removeGroup}>
							<FaMinus color="white" size="2em" />
						</Button>
					</div>
				))}
			</div>

			<div
				style={{
					position: 'absolute',
					height: '100%',
					width: `calc(100% - 300px)`,
					left: '300px',
					backgroundColor: 'blue',
				}}
			>
				<div
					style={{
						height: `calc(100% - 30px)`,
						width: 'calc(100% - 10px)',
					}}
				>
					<div
						style={{
							height: `calc(100% - 25px)`,
							marginTop: '55px',
							border: '1px solid black',
						}}
					>
						<h1 style={{ textAlign: 'center' }}>{`${username}'s `} Schedule</h1>
						<div style={{ height: '100%', width: '100%', display: 'flex' }}>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
								}}
							>
								Sunday
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
								}}
							>
								Monday
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
								}}
							>
								Tuesday
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
								}}
							>
								Wednesday
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
								}}
							>
								Thursday
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
								}}
							>
								Friday
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
								}}
							>
								Saturday
							</div>
						</div>
					</div>
					<Button
						color="secondary"
						size="md"
						onClick={logout}
						style={{ position: 'absolute', right: '20px', top: '5px' }}
					>
						Logout
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Home;
