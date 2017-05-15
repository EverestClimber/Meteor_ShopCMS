import React from 'react';
import { graphql } from 'react-apollo';
import { Link, browserHistory } from 'react-router';
import gql from 'graphql-tag';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import { AddShopForm } from '../../components/common';


const columns = [
	{
	  title: '_id',
	  dataIndex: '_id',
	  key: '_id',
	  render: _id => <Link to={`/admin/users/${_id}`}>{_id}</Link>,
	},
	{
	  title: 'email',
	  dataIndex: 'emails.0.address',
	  key: 'emails.0.address'
	},
	{
	  title: 'role',
	  dataIndex: 'roles',
	  key: 'roles'
	},
];


class AdminUsersTable extends React.Component {
	render(){
		return (
			<Table
				rowKey={record => record._id} 
				columns={columns} 
				dataSource={this.props.users}  
			/>
		);
	}
}

class AdminShopsPage extends React.Component {

	state = { visible: false, loadingSubmit: false }

	handleCancel = () => {
		this.setState({ visible: false });
	}
	showModal = () => {
		this.setState({ visible: true });
	}
	handleCreate = ({longitude, latitude, image}) => {
		const form = this.form;
		this.setState({loadingSubmit: true})
		form.validateFields((err, { title, description, image }) => {
			if (err) { return; }
			let variables = { title, description, image };
			console.log(variables);
			this.setState({visible: false, loadingSubmit: false});
		});
		/*form.validateFields((err, { messageValue, watchgroupId, priorityLevel, reportType }) => {
			if (err) { return; }
			let variables = { image, longitude, latitude, messageValue, watchgroupId, priorityLevel, reportType }
			this.props.mutate({ variables })
			.then(() => {
			this.props.data.refetch()
			form.resetFields();
			return this.setState({ visible: false, loadingSubmit: false });
			}).catch(e => {
			const errors = e.graphQLErrors.map( err => err.message );
			console.log('error ran');
			console.log(errors);
			});
		});*/
	}
	saveFormRef = (form) => {
	this.form = form;
	}

	render(){
		//const { loading, users } = this.props.data;

		//if (loading) { return <div>Loading...</div>; }

		return (
			<div>
				<Button type="primary" onClick={this.showModal}>+ Add Shop</Button>
				<AddShopForm
				ref={this.saveFormRef}
				visible={this.state.visible}
				onCancel={this.handleCancel}
				onCreate={this.handleCreate}
				loadingSubmit={this.state.loadingSubmit}
				{...this.props}
				/>
			</div>
		);
	}
}

/*const GET_SHOPS = gql`
  query getShops {
    shops {
      _id
    }
  }
`;*/


export default AdminShopsPage //graphql(GET_SHOPS)(AdminUsersPage);