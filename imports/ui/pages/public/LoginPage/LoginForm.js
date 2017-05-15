import React from 'react';
import { withApollo } from 'react-apollo';
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
import Alert from 'antd/lib/alert';
//
import ApolloClient from '/imports/ui/apollo/ApolloClient'
//
import { handleLogin } from '../../../../modules/helpers'
import { FormErrorArea } from '../../../components/common'

const FormItem = Form.Item;



class FormComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = { loading: false, errors: [] };
	}
	onSubmit = (e) => {
	  	e.preventDefault();
	  	let _this = this;
	  	_this.setState({ loading: true, errors: [] });
	  	const { form, client } = _this.props;
	    form.validateFields( (err, {email, password}) => {
	    	if (err) { return _this.setState({ loading: false }); }
	    	return handleLogin(email, password, ApolloClient, _this);
	    });
	}
	render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="form-card" >
      <Card>
	      <Form onSubmit={this.onSubmit} >
	            <FormItem hasFeedback>
	              {getFieldDecorator('email', {
	                rules: [{ required: true, message: 'Input your Email!' }],
	              })(
	                <Input prefix={<Icon type="mail" />} placeholder="Email" />
	              )}
	            </FormItem>
	            <FormItem hasFeedback>
		          {getFieldDecorator('password', {
		            rules: [{ required: true, message: 'Please input your Password!' }],
		          })(
		            <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
		          )}
		        </FormItem>
	          <Button loading={this.state.loading} type="primary" htmlType="submit" className='onboarding-btn'>
	           	Login
	          </Button>
	      </Form>
	    </Card>
  		<FormErrorArea errors={this.state.errors} />
      </div>
    );
  }
}

const LoginForm = Form.create()(FormComponent);

export default LoginForm;