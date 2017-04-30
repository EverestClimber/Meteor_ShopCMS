import React from 'react';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import message from 'antd/lib/message';
//
import SignupForm from './SignupForm';
//common
import { AlreadyLoggedIn } from '../../../components/common'


class SignupPage extends React.Component {
	getContent = () => {
		const { data, user} = this.props.data;

		if (data && data.user) {
			return <SignupForm /> 
		} else {
			return <AlreadyLoggedIn user={user} />
		}

	}
	render(){
		const { data } = this.props.data
		return (
			<Row type='flex' justify='center' align='middle' style={{height: '75vh'}}>
				{this.getContent()}
			</Row>
		);
	}
}

export { SignupPage };