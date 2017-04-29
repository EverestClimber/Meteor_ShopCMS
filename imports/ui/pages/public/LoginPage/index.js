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


class LoginPage extends React.Component {
	render(){
		console.log(this.props.data && this.props.data)
		return (
			<Row type='flex' justify='center' align='middle' style={{height: '55vh'}}>
				<Card>
					{this.props.data && !this.props.data.user && <LoginForm />}
				</Card>
			</Row>
		);
	}
}

export { LoginPage };