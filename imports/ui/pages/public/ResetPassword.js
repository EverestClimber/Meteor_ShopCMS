import React from 'react';
import { Link } from 'react-router';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
//apollo
import { resetPassword } from 'meteor-apollo-accounts'
import apollo from '/imports/ui/apollo/ApolloClient'




// CONSTANTS & DESTRUCTURING
// ====================================

const FormItem = Form.Item;

// STYLES
// ====================================





  const styles = {
    cardStyles: {
      maxWidth: 400,
      width: 400,
      margin: "auto",
      marginTop: 40,
      padding: 0,
    },
    loginButton: {
      width: '100%'
    }
  };


// INTERNAL COMPONENTS
// ====================================




const ResetPasswordForm = Form.create()(React.createClass({
  getInitialState () {
    return {
      loading: false,
      submitted: false
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true})
    this.props.form.validateFields((err, { password, confirm }) => {
      if (err) { return; }
      resetPassword({newPassword: password, token: this.props.token}, apollo)
      .then( res => {
        return this.setState({loading: false, submitted: true});
      }).catch(err => console.log(err))
    });

  },
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you entered are inconsistent!');
    } else { callback(); }
  },
  render() {
    const { getFieldDecorator } = this.props.form;

    const newPasswordRules = [
      { required: true, message: 'Please input a new password!' }
    ];

    const repeatNewPassword = [
      { required: true, message: 'Please repeat the new password!' },
      { validator: this.checkPassword }
    ];

    if (this.state.submitted) {
      return (
        <div>
          <h3>Your password has been successfully reset!</h3>
        </div>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit} className="cant-find-form">
        <FormItem>
          {getFieldDecorator('password', { rules: newPasswordRules })(
            <Input 
              addonBefore={<Icon type="lock" />} 
              type="password" 
              placeholder="New password" 
            />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('confirm', { rules: repeatNewPassword })(
            <Input 
              addonBefore={<Icon type="lock" />} 
              type="password" 
              placeholder="Repeat new password" 
            />
          )}
        </FormItem>
        <FormItem>
          <Button loading={this.state.loading} type="primary" htmlType="submit">
            Reset & Login
          </Button>
        </FormItem>
      </Form>
    );
  }
}));

// EXPORTED COMPONENT
// ====================================
class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      canSubmit: false,
      token: this.props.params.token,
    }
  }

  render() {
    return (
      <Card style={styles.cardStyles} title={'Reset Your Password'} >
        <ResetPasswordForm token={this.state.token} />
      </Card>
    );
  }

}

export default ResetPassword
