// TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ADMIN_SAVE_USERPROFILE } from '/imports/ui/apollo/mutations'
//ANTD 
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Select from 'antd/lib/select';
// MODULES
import { states_list, selectFilterByLabel } from '/imports/modules/helpers'



// CONSTANTS & DESTRUCTURING
// ===================================
const FormItem = Form.Item;
const Option = Select.Option

const ROLE_OPTIONS = [ 'admin', 'manager' ]


// EXPORTED COMPONENT
// ===================================
class AdminEditUserForm extends React.Component {

  state = { loading: false };

  handleSubmit = (e) => {
    e.preventDefault();
    const { data, mutate, user, form } = this.props;
    this.setState({loading: true});

    const failure = (error) => {
      if (error && error.reason) {  message.error(error.reason); }
      this.setState({loading: false});
    }

    const success = () => {
      data.refetch();
      this.setState({loading: false});
      message.info('profile saved!');
    };

    form.validateFields((err, { email, roles, firstName, lastName }) => {
      if (err) { failure(); }
        mutate({ variables: { email, _id: user._id, roles } })
          .then(() => success());
    });

  }
  render(){
    const { user, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit} style={{width: 450, margin: 'auto'}}>
      <Row gutter={15} type="flex" justify="center" align="middle"  >
      <Col span='24'>
        <FormItem label="Your Email Address">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
            initialValue: user.emails[0].address ? user.emails[0].address  : null
          })(
            <Input placeholder="Email Address" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('firstName', {
            rules: [{ required: false, message: 'Please input your firstName!' }],
            initialValue: user.profile && user.profile.firstName && user.profile.firstName  || null
          })(
            <Input  placeholder="First name..."  />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('lastName', {
            rules: [{ required: false, message: 'Please input your lastName!' }],
            initialValue: user.profile && user.profile.lastName && user.profile.lastName  || null
          })(
            <Input placeholder="Last name..." />
          )}
        </FormItem>
        <FormItem label='Roles'>
          {getFieldDecorator('roles', {
            initialValue: user && user.roles && user.roles || [],
          })(
            <Select mode='multiple' showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {ROLE_OPTIONS.map(item => <Option key={item} value={item}>{item}</Option> )}
            </Select>
          )}
        </FormItem>
      </Col>
      <Col span='24'>
        <FormItem>
          <Button loading={this.state.loading} htmlType="submit" type='primary'>
            SAVE CHANGES
          </Button>
        </FormItem>
      </Col> 
      </Row>
      </Form>
    );
  }
}



export default graphql(ADMIN_SAVE_USERPROFILE)(
  Form.create()(AdminEditUserForm)
);

