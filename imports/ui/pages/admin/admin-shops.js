//TOP LEVEL IMPORTS
import React from 'react';
import { Link, browserHistory } from 'react-router';
//APOLLO
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FETCH_SHOPS } from '/imports/ui/apollo/queries'
import { CREATE_SHOP, ADD_ATTACHMENTS } from '/imports/ui/apollo/mutations'

// ANTD
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
// COMPONENTS
import { AddShopForm } from '../../components/common';


// CONSTANTS & DESTRUCTURING
// ==============================
const columns = [
	{
	  title: '_id',
	  dataIndex: '_id',
	  key: '_id',
	  render: _id => <Link to={`/admin/shops/${_id}`}>{_id}</Link>,
	},
	{
	  title: 'title',
	  dataIndex: 'title',
	  key: 'title',
	},
	/*{	
	  title: 'description',
	  dataIndex: 'description',
	  key: 'description'
	},*/
	{	
	  title: 'category',
	  dataIndex: 'category',
	  key: 'category'
	},
];


// INTERNAL COMPONENTS
// ==============================
class AdminShopsTable extends React.Component {
	render(){
		return (
			<Table
				rowKey={record => record._id}
				columns={columns}
				dataSource={this.props.shops}  
			/>
		);
	}
}


// EXPORTED COMPONENT
// ==============================
// EXPORTED COMPONENT
// ==============================
class AdminShopsPage extends React.Component {

	state = { visible: false, loadingSubmit: false, errors: [] }

	handleCancel = () => {
		this.setState({ visible: false });
	}
	showModal = () => {
		this.setState({ visible: true });
	}
	onSuccessfulSubmit = (res, imageList, form) => {
		if (!imageList || imageList.length === 0) {
			this.props.data.refetch();
			form.resetFields();
			return this.setState({ visible: false, loadingSubmit: false, errors: [] });
		}
		let attachmentVariables = {
			shopId: res.data.createShop._id,
			userId: res.data.createShop.owner._id,
			images: imageList
		}
		this.props.addAttachments({ variables: attachmentVariables }).then(()=>{
			this.props.data.refetch();
			form.resetFields();
			return this.setState({ visible: false, loadingSubmit: false, errors: [] });
		});
	}
	onError = (e) => {
		const errors = e && e.graphQLErrors.length > 0 && e.graphQLErrors.map( err => err.message );
		return this.setState({ loadingSubmit: false, errors });
	}
	handleCreate = ({longitude, latitude, image, imageList}) => {
		const form = this.form;
		this.setState({loadingSubmit: true})
		form.validateFields((err, { title, description, mallId, categories, street1, street2, country, state, postal, suburb  }) => {
			if (err) { return this.setState({loadingSubmit: false}); }
			if (!image) { return this.setState({loadingSubmit: false, errors: ['please add a main image!']}); }
			let params = { 
				title, description, categories, image, mallId, location: { street1, street2, country, state, postal, suburb } 
			};
			this.props.createShop({ variables: { params } })
				.then( res => this.onSuccessfulSubmit(res, imageList, form) )
				.catch(e => this.onError(e) );

		});
	}
	saveFormRef = (form) => {
	this.form = form;
	}
	renderContent() {

		const { loading, shops } = this.props.data;

		return (
			<div>
				{/*<Button type="primary" onClick={this.showModal}>+ Add Shop</Button>
				<AddShopForm
					ref={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
					errors={this.state.errors}
					loadingSubmit={this.state.loadingSubmit}
					{...this.props}
				/>*/}
				<Row>
					<AdminShopsTable shops={shops} />
				</Row>
			</div>
		);
	}
	render(){
		const { children, data } = this.props;

		if (data.loading) { return <div>Loading...</div>; }

		return (
			<div>
				{children ? children : this.renderContent()}
			</div>
		);
	}
}

// EXPORT
// ==============================
export default graphql(CREATE_SHOP, { name: 'createShop' })(
	graphql(ADD_ATTACHMENTS, { name: 'addAttachments' })(
		graphql(FETCH_SHOPS)(AdminShopsPage)
	)
);

