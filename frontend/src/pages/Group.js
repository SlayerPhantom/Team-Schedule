import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMinus, FaPlus } from 'react-icons/fa';
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

function Group(props) {
	const [searchedusers, setsearchedusers] = useState([]);
	const [scheduleid, setscheduleid] = useState('');
	const [timename, settimename] = useState('');
	const [schedule, setschedule] = useState({
		sunday: [],
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: [],
	});
	const [searchusername, setsearchusername] = useState('');
	const [starttime, setstarttime] = useState('');
	const [endtime, setendtime] = useState('');
	const [groupid, setgroupid] = useState(props.match.params.groupid);
	const [groupname, setgroupname] = useState('group 1');
	const [username, setusername] = useState(localStorage.getItem('username'));
	const [day, setday] = useState('');
	const [userid, setuserid] = useState('');
	const [token, settoken] = useState(localStorage.getItem('token'));
	const [modal, setModal] = useState(false);
	const [timemodal, settimeModal] = useState(false);
	const [loading, setloading] = useState(true);
	const [message, setMessage] = useState('');
	const [members, setmembers] = useState([]);
	const toggle = () => setModal(!modal);
	const toggletime = () => settimeModal(!timemodal);

	useEffect(() => {
		const getgroupschedule = async () => {
			try {
				const url = buildURL(`api/schedule/getschedulegroup`);
				const payload = { id: groupid };
				const res = await axios.post(url, payload);
				if (res.data.errors) {
					const { errors } = res.data;
					console.log(errors);
					setMessage(errors);
					return;
				}
				const {
					monday,
					tuesday,
					wednesday,
					thursday,
					friday,
					saturday,
					sunday,
					scheduleid,
				} = res.data;
				setscheduleid(scheduleid);

				setschedule({
					monday,
					tuesday,
					wednesday,
					thursday,
					friday,
					saturday,
					sunday,
				});
				setloading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getgroupschedule();
	}, []);

	function onHover(e) {
		e.target.style.color = 'red';
	}

	function offHover(e) {
		e.target.style.color = 'white';
	}

	async function removeuser() {
		try {
			const url = buildURL('api/group/removeuser');
			const payload = { userid, id: groupid };
			const res = await axios.delete(url, payload);
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}
			setmembers(members.filter((member) => member.id != userid));
			setMessage(res.data.message);
		} catch (error) {
			console.log(error);
		}
	}

	async function adduser(name, userid) {
		try {
			const url = buildURL('api/group/adduser');
			const payload = { id: groupid, name, userid };
			const res = axios.post(url, payload);
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}
			setmembers([...members, { username: name, id: userid }]);
			setMessage(res.data.message);
		} catch (error) {
			console.log(error);
		}
	}

	async function searchusers(search) {
		try {
			const url = buildURL('api/user/search');
			const payload = { search };
			const res = await axios.post(url, payload);
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}
			setsearchedusers(res.data.users);
		} catch (error) {
			console.log(error);
		}
	}

	async function addtime() {
		try {
			const url = buildURL('api/schedule/addtimegroup');
			const headers = { Authorization: token };
			const payload = {
				start: starttime,
				end: endtime,
				name: timename,
				day,
				id: groupid,
			};
			const res = await axios.post(url, payload, { headers });
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}

			setschedule(res.data.schedule);
			setMessage(res.data.message);
		} catch (error) {
			console.log(error);
		}
	}

	async function edittime() {
		try {
			const url = buildURL('api/schedule/editgroupchedule');
			const headers = { Authorization: token };
			const payload = {
				start: starttime,
				end: endtime,
				day,
				timeid,
				name: timename,
				id: scheduleid,
			};
			const res = await axios.post(url, payload, {
				headers,
			});
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}
			setschedule(res.data.schedule);
			setMessage('successfully edited message');
			toggletimeedit();
		} catch (error) {
			console.log(error);
		}
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
					width: '200px',
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
					<h3
						style={{
							textAlign: 'center',
							marginTop: '20px',
							textDecoration: 'underlined',
						}}
					>
						members
					</h3>{' '}
					<div style={{ marginTop: '25px' }}>
						<Button
							color="primary"
							onClick={toggle}
							style={{ paddingBottom: '5px' }}
							size="sm"
						>
							<FaPlus />
						</Button>
					</div>
					<div>
						<Modal isOpen={modal} toggle={toggle}>
							<ModalHeader toggle={toggle}>Search users</ModalHeader>
							<ModalBody>
								<Form>
									<FormGroup>
										<Label for="search username">Enter their username</Label>
										<Input
											type="text"
											name="users"
											id="users"
											placeholder="search a username"
											value={searchusername}
											onChange={(e) => setsearchusername(e.target.value)}
										/>
									</FormGroup>
								</Form>
								{searchedusers.map((user) => (
									<div key={user.id} style={{ display: 'flex' }}>
										<p>{user.username}</p>
										<Button onClick={() => adduser(user.id)}>add</Button>
									</div>
								))}
							</ModalBody>
							<ModalFooter>
								<Button
									color="primary"
									onClick={() => {
										searchusers(searchusername);
									}}
								>
									search
								</Button>{' '}
								<Button
									color="secondary"
									onClick={() => {
										setsearchedusers([]);
										toggle();
									}}
								>
									Cancel
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				</div>
				{members.map((member) => (
					<div
						key={member.id}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '5px',
						}}
					>
						<h5
							style={{
								cursor: 'pointer',
								textAlign: 'center',
							}}
							onMouseOver={onHover}
							onMouseLeave={offHover}
						>
							{member.username}
						</h5>
						<Button
							color="danger"
							size="sm"
							onClick={() => removeuser(member.id)}
						>
							<FaMinus color="white" size="2em" />
						</Button>
					</div>
				))}
			</div>

			<div
				style={{
					position: 'absolute',
					height: '100%',
					width: `calc(100% - 200px)`,
					left: '200px',
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
							marginTop: '40px',
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								marginBottom: '20px',
								borderBottom: '2px solid black',
							}}
						>
							<h1 style={{ textAlign: 'center' }}>
								{`${groupname} `} Schedule
							</h1>
							<div style={{ marginTop: '10px' }}>
								<Button color="primary" onClick={toggletime}>
									Add time to Schedule
								</Button>
								<Modal isOpen={timemodal} toggle={toggletime}>
									<ModalHeader toggle={toggletime}>Add time</ModalHeader>
									<ModalBody>
										<Form>
											<FormGroup>
												<Label for="name">name of time</Label>
												<Input
													type="text"
													name="name of time"
													id="timeName"
													placeholder="name of time"
													value={timename}
													onChange={(e) => settimename(e.target.value)}
												/>
											</FormGroup>

											<FormGroup>
												<Label for="day of week">Select day of week</Label>
												<Input
													type="select"
													name="select"
													id="exampleSelect"
													value={day}
													onChange={(e) => setday(e.target.value)}
												>
													<option>Sunday</option>
													<option>Monday</option>
													<option>Tuesday</option>
													<option>Wednesday</option>
													<option>Thursday</option>
													<option>Friday</option>
													<option>Sunday</option>
												</Input>
											</FormGroup>
											<FormGroup>
												<Label for="start time">start time</Label>
												<Input
													type="time"
													name="start time"
													id="startTime"
													placeholder="start time placeholder"
													onChange={(e) => setstarttime(e.target.value)}
												/>
											</FormGroup>
											<FormGroup>
												<Label for="exampleTime">end time</Label>
												<Input
													type="time"
													name="end time"
													id="endTime"
													onChange={(e) => setendtime(e.target.value)}
													placeholder="end time placeholder"
												/>
											</FormGroup>
										</Form>
									</ModalBody>
									<ModalFooter>
										<Button
											color="primary"
											onClick={() => {
												addtime();
											}}
										>
											Add
										</Button>{' '}
										<Button color="secondary" onClick={toggletime}>
											Cancel
										</Button>
									</ModalFooter>
								</Modal>
							</div>
						</div>
						<div style={{ height: '100%', width: '100%', display: 'flex' }}>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
									fontWeight: 'bold',
								}}
							>
								<h6 style={{ textDecoration: 'underline' }}>Sunday</h6>
								<div>
									{schedule.sunday.map((day, index) => (
										<p key={index}>
											{day.name} : {day.start} - {day.end}
										</p>
									))}
								</div>
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
									fontWeight: 'bold',
								}}
							>
								<h6 style={{ textDecoration: 'underline' }}>Monday</h6>
								<div>
									{schedule.monday.map((day, index) => (
										<p key={index}>
											{day.name} : {day.start} - {day.end}
										</p>
									))}
								</div>
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
									fontWeight: 'bold',
								}}
							>
								<h6 style={{ textDecoration: 'underline' }}>Tuesday</h6>
								<div>
									{schedule.tuesday.map((day, index) => (
										<p key={index}>
											{day.name} : {day.start} - {day.end}
										</p>
									))}
								</div>
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
									fontWeight: 'bold',
								}}
							>
								<h6 style={{ textDecoration: 'underline' }}>Wednesday</h6>
								<div>
									{schedule.wednesday.map((day, index) => (
										<p key={index}>
											{day.name} : {day.start} - {day.end}
										</p>
									))}
								</div>
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
									fontWeight: 'bold',
								}}
							>
								<h6 style={{ textDecoration: 'underline' }}>Thursday</h6>
								<div>
									{schedule.thursday.map((day, index) => (
										<p key={index}>
											{day.name} : {day.start} - {day.end}
										</p>
									))}
								</div>
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
									fontWeight: 'bold',
								}}
							>
								<h6 style={{ textDecoration: 'underline' }}>Friday</h6>
								<div>
									{schedule.friday.map((day, index) => (
										<p key={index}>
											{day.name} : {day.start} - {day.end}
										</p>
									))}
								</div>
							</div>
							<div
								style={{
									flex: 1,
									textAlign: 'center',
									borderRight: '1px solid black',
									fontWeight: 'bold',
								}}
							>
								<h6 style={{ textDecoration: 'underline' }}>Saturday</h6>
								<div>
									{schedule.saturday.map((day, index) => (
										<p key={index}>
											{day.name} : {day.start} - {day.end}
										</p>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Group;
