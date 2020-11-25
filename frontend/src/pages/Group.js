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
import groupmembers from '../utils/members';
import userschedule from '../utils/schedule';

function Group(props) {
	const [searchedusers, setsearchedusers] = useState([]);
	const [scheduleid, setscheduleid] = useState('');
	const [timename, settimename] = useState('');
	const [schedule, setschedule] = useState(userschedule);

	const [starttime, setstarttime] = useState('');
	const [endtime, setendtime] = useState('');
	const [groupid, setgroupid] = useState(props.match.params.token);
	const [groupname, setgroupname] = useState('group 1');
	const [day, setday] = useState('');
	const [token, settoken] = useState('');
	const [username, setusername] = useState('');
	const [modal, setModal] = useState(false);
	const [timemodal, settimeModal] = useState(false);
	const [message, setMessage] = useState('');
	const [members, setmembers] = useState(groupmembers);
	const toggle = () => setModal(!modal);
	const toggletime = () => settimeModal(!timemodal);

	useEffect(() => {
		settoken(localStorage.getItem('token'));
		setusername(localStorage.getItem('username'));
		setscheduleid(localStorage.getItem('scheduleid'));
	});

	function onHover(e) {
		e.target.style.color = 'red';
	}

	function offHover(e) {
		e.target.style.color = 'white';
	}

	async function removeuser(userid) {
		try {
			const url = buildURL('api/group/removeuser');
			const payload = { userid, groupid };
			const res = await axios.delete(url, payload);
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}
			setmembers(members.filter((member) => member.id !== userid));
			setMessage(res.data.message);
		} catch (error) {
			console.log(error);
		}
	}

	async function adduser(id, name, userid) {
		try {
			const url = buildURL('api/group/adduser');
			const payload = { id, name, userid };
			const res = axios.post(url, payload);
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}
			setmembers([...members, { username: name, id }]);
			setMessage(res.data.message);
		} catch (error) {
			console.log(error);
		}
	}

	async function searchusers(search) {
		const url = buildURL('api/user/search');
		const payload = { search };
		const res = await axios.post(url, payload);
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
				id: scheduleid,
			};
			const res = await axios.post(url, payload, { headers });
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}
			const time = { start: starttime, end: endtime, name: timename };
			switch (day) {
				case 'monday':
					schedule.monday.push(time);
					break;
				case 'tuesday':
					schedule.tuesday.push(time);
					break;
				case 'wednesday':
					schedule.wednesday.push(time);
					break;
				case 'thursday':
					schedule.thursday.push(time);
					break;
				case 'friday':
					schedule.friday.push(time);
					break;
				case 'saturday':
					schedule.saturday.push(time);
					break;
				case 'sunday':
					schedule.sunday.push(time);
					break;
				default:
					console.log('not a valid day');
			}
			setschedule(schedule);
			setMessage(res.data.message);
		} catch (error) {}
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
