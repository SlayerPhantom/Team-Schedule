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
	Alert,
} from 'reactstrap';
import buildURL from '../utils/buildURL';
function Home() {
	const [groups, setgroups] = useState([]);
	const [loading, setloading] = useState(true);
	const [schedule, setschedule] = useState({
		sunday: [],
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: [],
	});
	const [groupname, setgroupname] = useState('');
	const [groupid, setgroupid] = useState('');
	const [timename, settimename] = useState('');
	const [starttime, setstarttime] = useState('');
	const [endtime, setendtime] = useState('');
	const [day, setday] = useState('');
	const [timeid, settimeid] = useState('');
	const [scheduleid, setscheduleid] = useState(
		localStorage.getItem('scheduleid')
	);
	const [token, settoken] = useState(localStorage.getItem('token'));
	const [username, setusername] = useState(localStorage.getItem('username'));
	const [modal, setModal] = useState(false);
	const [timemodal, settimeModal] = useState(false);
	const [edittimemodal, setedittimeModal] = useState(false);
	const [message, setMessage] = useState('');
	const [mode, setmode] = useState('none');
	const toggle = () => setModal(!modal);
	const toggletime = () => settimeModal(!timemodal);
	const toggletimeedit = () => setedittimeModal(!edittimemodal);

	useEffect(() => {
		const onload = async () => {
			const getusergroups = async () => {
				try {
					const headers = { Authorization: token };
					const url = buildURL('api/user/getgroups');
					const res = await axios.get(url, { headers });
					if (res.data.errors) {
						const { errors } = res.data;
						console.log(errors);
						setMessage(errors);
						return;
					}
					setgroups(res.data.groups);
				} catch (error) {
					console.log(error);
				}
			};
			const getuserschedule = async () => {
				try {
					const headers = { Authorization: token };
					const url = buildURL('api/schedule/getscheduleuser');
					const res = await axios.get(url, { headers });
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
					} = res.data;
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
			await getusergroups();
			await getuserschedule();
		};
		onload();
	}, []);

	function logout() {
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		localStorage.removeItem('scheduleid');
		window.location.replace('/');
	}
	function gotogroup(id) {
		const url = buildURL(`group/${id}`);
		window.location.replace(`/group/${id}`);
	}

	async function removeGroup() {
		try {
			const url = buildURL('api/group/removegroup');
			const payload = { id: groupid };
			const res = await axios.post(url, payload);
			if (res.data.errors) {
				const { errors } = res.data;
				console.log(errors);
				setMessage(errors);
				return;
			}
			setMessage(res.data.message);
			setgroups(groups.filter((group) => group.id != groupid));
			setTimeout(() => {
				setMessage('');
			}, 2000);
			setgroupid('');
		} catch (error) {
			console.log(error);
		}
	}
	async function edittime() {
		try {
			const url = buildURL('api/schedule/edituserschedule');
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

	async function addtime() {
		try {
			const url = buildURL('api/schedule/addtimeuser');
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
			toggletime();
			setMessage(res.data.message);
		} catch (error) {}
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
				return;
			}
			const { id, scheduleid, members } = res.data;
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
		!loading && (
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
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
							Groups
						</h3>{' '}
						<div style={{ marginTop: '25px' }}>
							<FaPlus
								onClick={toggle}
								style={{
									cursor: 'pointer',
									color: 'blue',
								}}
							/>
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
							<h5
								style={{
									cursor: 'pointer',
									textAlign: 'center',
								}}
								onMouseOver={onHover}
								onMouseLeave={offHover}
								onClick={() => {
									localStorage.setItem('groupname', group.name);
									gotogroup(group.id);
								}}
							>
								{group.name}
							</h5>
							{username == group.creator ? (
								<FaMinus
									color="white"
									size="2em"
									onClick={() => {
										setgroupid(group.id);
									}}
									style={{ cursor: 'pointer', color: 'red' }}
								/>
							) : null}
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
									{`${username}'s `} Schedule
								</h1>
								{timeid && mode === 'delete' && (
									<div
										style={{
											position: 'absolute',
											height: '100%',
											width: '100%',
											display: 'grid',
											placeItems: 'center',
										}}
									>
										<Alert color="danger">
											<p style={{ textAlign: 'center' }}>
												Are you sure you want to delete this time?
											</p>
											<br />
											<div
												style={{ display: 'flex', justifyContent: 'center' }}
											>
												<Button
													color="danger"
													onClick={async () => {
														try {
															const url = buildURL(
																'api/schedule/removetimeuser'
															);
															const payload = { day, timeid };
															const headers = { Authorization: token };
															const res = await axios.post(url, payload, {
																headers,
															});
															if (res.data.errors) {
																const { errors } = res.data;
																console.log(errors);
																setMessage(errors);
																return;
															}
															settimeid('');
															setschedule(res.data.schedule);
															setMessage(res.data.message);
														} catch (error) {
															console.log(error);
														}
													}}
												>
													yes
												</Button>
												<Button color="secondary" onClick={() => settimeid('')}>
													cancel
												</Button>
											</div>
										</Alert>
									</div>
								)}
								{groupid && (
									<div
										style={{
											position: 'absolute',
											height: '100%',
											width: '100%',
											display: 'grid',
											placeItems: 'center',
										}}
									>
										<Alert color="danger">
											<p style={{ textAlign: 'center' }}>
												Are you sure you want to delete this group?
											</p>
											<br />
											<div
												style={{ display: 'flex', justifyContent: 'center' }}
											>
												<Button
													color="danger"
													onClick={async () => removeGroup}
												>
													yes
												</Button>
												<Button
													color="secondary"
													onClick={() => setgroupid('')}
												>
													cancel
												</Button>
											</div>
										</Alert>
									</div>
								)}

								<div
									style={{ position: 'absolute', right: '80px', top: '50px' }}
								>
									<Button color="primary" onClick={toggletime}>
										Add
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
														<option>sunday</option>
														<option>monday</option>
														<option>tuesday</option>
														<option>wednesday</option>
														<option>thursday</option>
														<option>friday</option>
														<option>saturday</option>
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
									<Button
										color="success"
										onClick={() => {
											settimeid('none');
											setmode('edit');
										}}
									>
										Edit
									</Button>
									<Modal isOpen={edittimemodal} toggle={toggletimeedit}>
										<ModalHeader toggle={toggletimeedit}>Edit time</ModalHeader>
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
													<Label for="start time">new start time</Label>
													<Input
														type="time"
														name="start time"
														id="startTime"
														placeholder="start time placeholder"
														onChange={(e) => setstarttime(e.target.value)}
													/>
												</FormGroup>
												<FormGroup>
													<Label for="exampleTime">new end time</Label>
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
												color="success"
												onClick={() => {
													edittime();
												}}
											>
												edit
											</Button>{' '}
											<Button color="secondary" onClick={toggletimeedit}>
												Cancel
											</Button>
										</ModalFooter>
									</Modal>
									<Button
										color="danger"
										onClick={() => {
											settimeid('');
											setmode('delete');
										}}
									>
										delete
									</Button>
									{mode !== 'none' ? (
										<Button
											color="secondary"
											onClick={() => {
												settimeid('');
												setmode('none');
											}}
										>
											cancel
										</Button>
									) : null}
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
										{mode === 'edit'
											? schedule.sunday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															settimeid(day._id);
															setday('sunday');
															toggletimeedit();
														}}
														style={{ color: 'green', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'delete'
											? schedule.sunday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															setday('sunday');
															settimeid(day._id);
														}}
														style={{ color: 'crimson', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'none'
											? schedule.sunday.map((day) => (
													<p key={day._id}>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
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
										{mode === 'edit'
											? schedule.monday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															settimeid(day._id);
															setday('monday');
															toggletimeedit();
														}}
														style={{ color: 'green', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'delete'
											? schedule.monday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															setday('monday');
															settimeid(day._id);
														}}
														style={{ color: 'crimson', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'none'
											? schedule.monday.map((day) => (
													<p key={day._id}>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
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
										{mode === 'edit'
											? schedule.tuesday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															settimeid(day._id);
															setday('tuesday');
															toggletimeedit();
														}}
														style={{ color: 'green', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'delete'
											? schedule.tuesday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															setday('tuesday');
															settimeid(day._id);
														}}
														style={{ color: 'crimson', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'none'
											? schedule.tuesday.map((day) => (
													<p key={day._id}>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
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
										{mode === 'edit'
											? schedule.wednesday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															settimeid(day._id);
															setday('wednesday');
															toggletimeedit();
														}}
														style={{ color: 'green', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'delete'
											? schedule.wednesday.map((day) => (
													<p
														key={day.id}
														onClick={() => {
															setday('wednesday');
															settimeid(day._id);
														}}
														style={{ color: 'crimson', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'none'
											? schedule.wednesday.map((day) => (
													<p key={day._id}>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
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
										{mode === 'edit'
											? schedule.thursday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															settimeid(day._id);
															setday('thursday');
															toggletimeedit();
														}}
														style={{ color: 'green', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'delete'
											? schedule.thursday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															setday('thursday');
															settimeid(day._id);
														}}
														style={{ color: 'crimson', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'none'
											? schedule.thursday.map((day) => (
													<p key={day._id}>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
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
										{mode === 'edit'
											? schedule.friday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															settimeid(day._id);
															setday('friday');
															toggletimeedit();
														}}
														style={{ color: 'green', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'delete'
											? schedule.friday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															setday('friday');
															settimeid(day._id);
														}}
														style={{ color: 'crimson', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'none'
											? schedule.friday.map((day) => (
													<p key={day._id}>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
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
										{mode === 'edit'
											? schedule.saturday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															settimeid(day._id);
															setday('saturday');
															toggletimeedit();
														}}
														style={{ color: 'green', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'delete'
											? schedule.saturday.map((day) => (
													<p
														key={day._id}
														onClick={() => {
															setday('saturday');
															settimeid(day._id);
														}}
														style={{ color: 'crimson', cursor: 'pointer' }}
													>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
										{mode === 'none'
											? schedule.saturday.map((day) => (
													<p key={day._id}>
														{day.name} : {day.start} - {day.end}
													</p>
											  ))
											: null}
									</div>
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
		)
	);
}

export default Home;
