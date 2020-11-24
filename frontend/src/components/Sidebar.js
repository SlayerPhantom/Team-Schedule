import '../css/Sidebar.css';
import React, { useState, useEffect } from 'react';

function Sidebar({ width, height, events }) {
	const [xPosition, setX] = useState(-width);

	const toggleMenu = () => {
		if (xPosition < 0) {
			setX(0);
		} else {
			setX(-width);
		}
	};

	useEffect(() => {
		setX(0);
	}, []);
	return (
		<React.Fragment>
			<div
				className="side-bar"
				style={{
					transform: `translatex(${xPosition}px)`,
					width: width,
					minHeight: height,
					backgroundColor: 'black',
					color: 'white',
				}}
			>
				<button
					onClick={() => toggleMenu()}
					className="toggle-menu"
					style={{
						transform: `translate(${width}px, 20vh)`,
					}}
				></button>
				<div className="content">
					<h1 style={{ textAlign: 'center', marginTop: '10px' }}>Events</h1>
					{events.map((event) => (
						<div key={event.id}>
							<h3 style={{ marginLeft: '20px' }}>{event.name}</h3>
						</div>
					))}
				</div>
			</div>
		</React.Fragment>
	);
}

export default Sidebar;
