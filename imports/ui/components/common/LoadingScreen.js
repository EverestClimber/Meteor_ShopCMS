import React from 'react';
import Row from 'antd/lib/row';
import Spin from 'antd/lib/spin';

const LoadingScreen = () => {
	return (
		<Row type='flex' justify='center' align='middle' style={{height: '100vh'}}>
			<Spin />
		</Row>
	);
}

export { LoadingScreen };