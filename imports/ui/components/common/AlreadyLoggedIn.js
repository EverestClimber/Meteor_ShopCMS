import React from 'react';
//antd
import Card from 'antd/lib/card';



const AlreadyLoggedIn = () => {
	return (
		<div style={{textAlign: 'center'}}>
			<img style={{height: 'auto', width: 100}} src="/apollo.svg" />
			<h2>You Are Already Logged In!</h2>
		</div>
	);
}

export { AlreadyLoggedIn };