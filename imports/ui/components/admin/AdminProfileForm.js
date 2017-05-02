import React from 'react';
import { Link, browserHistory } from 'react-router';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
//ANTD 
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';

const FormItem = Form.Item;


class ProfileForm extends React.Component {

  state = { loading: false };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});

    const failure = (error) => {
      if (error && error.reason) {  message.error(error.reason); }
      this.setState({loading: false});
    }

    const success = () => {
      this.setState({loading: false});
      message.info('profile saved!');
    };

    this.props.form.validateFields((err, { email }) => {
      if (err) { failure(); }
        this.props.mutate({ variables: { email, _id: this.props.user._id } })
        .then(() => {
          this.props.data.refetch()
          this.props.form.resetFields();
          return this.setState({ loading: false });
        });

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

const GET_USER_DATA = gql`
  mutation saveUserProfile ($email: String!, $_id:ID!){
    saveUserProfile(email: $email, _id: $_id) {
      emails { address, verified },
      roles,
      _id
    }
  }
`;


export const AdminProfileForm = graphql(GET_USER_DATA)(
  Form.create()(ProfileForm)
);

