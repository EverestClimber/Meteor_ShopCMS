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




class SignupForm extends React.Component {
	render(){
		return (
			<div>
				SignupForm
			</div>
		);
	}
}

class SignupPage extends React.Component {
	render(){
		return (
			<Row type='flex' justify='center' align='middle' style={{height: '55vh'}}>
				<Card>
					<SignupForm />
				</Card>
			</Row>
		);
	}
}

export { SignupPage };