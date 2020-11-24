import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import userevents from '../utils/events';
import buildURL from '../utils/buildURL';

function Home() {
	const [username, setUsername] = useState('unravelphantom');
	const [message, setMessage] = useState('');
	const [events, setEvents] = useState(userevents);
	// useEffect(() => {
	// 	try {
	// 		setUsername(localStorage.getItem('username'));
	// 		const url = buildURL('api/getevents')
	// 		const headers = {Authorization: localStorage.getItem('token')}
	// 		const res = await axios.get(url, {headers})
	// 		if (res.data.errors){
	// 			console.log(res.data.errors);
	// 			setMessage(res.data.errors);
	// 			return;
	// 		}
	// 		setEvents(res.data.events)
	// 	} catch (error) {
	// 		console.log(error);
	// 		setMessage(error);
	// 	}
	// }, []);
	return (
		<div style={{ display: 'flex' }}>
			<Sidebar width={300} height={'100vh'} events={events} />
			<div
				style={{
					height: '100vh',
					width: '70vw',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div></div>
			</div>
		</div>
	);
}

export default Home;
