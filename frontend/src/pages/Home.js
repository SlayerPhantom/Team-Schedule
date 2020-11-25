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
	FormText,
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
				{/* <div
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
					</h1> */}
				{/* <div style={{ marginTop: '25px' }}>
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
				</div> */}
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
			<div style={{ backgroundColor: 'red' }}>
				<h1 style={{ backgroundColor: 'red', textAlign: 'center' }}>
					hello there
				</h1>
			</div>
		</div>
	);
}

export default Home;
