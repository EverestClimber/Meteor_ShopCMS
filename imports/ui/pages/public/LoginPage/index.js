import React from 'react';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
import { withApollo } from 'react-apollo';
import { handleLogin } from '../../../../modules/helpers'
import LoginForm from './LoginForm';
//common
import { AlreadyLoggedIn } from '../../../components/common'

class LoginPage extends React.Component {
	getContent = () => {
		const { data } = this.props;

		if (!data || !data.user || data.user === null) {
			return <LoginForm /> 
		} else {
			return <AlreadyLoggedIn user={data.user} />
		}

	}
	render(){
		return (
			<Row type='flex' justify='center' align='middle' style={{height: '55vh'}}>
				{this.getContent()}
			</Row>
		);
	}
}

export { LoginPage };