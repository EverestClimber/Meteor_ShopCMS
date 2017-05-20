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
class AdminShopsPage extends React.Component {

	state = { visible: false, loadingSubmit: false, errors: [] }

	handleCancel = () => {
		this.setState({ visible: false });
	}
	showModal = () => {
		this.setState({ visible: true });
	}
	handleCreate = ({longitude, latitude, image, imageList}) => {
		const form = this.form;
		this.setState({loadingSubmit: true})
		form.validateFields((err, { title, description, category }) => {
			if (err) { return this.setState({loadingSubmit: false}); }
			let variables = { title, description, category, image, latitude, longitude };

			this.props.createShop({ variables })
				.then((res) => {
					if (!imageList || imageList.length === 0) {
						this.props.data.refetch();
						form.resetFields();
						return this.setState({ visible: false, loadingSubmit: false });
					}
					let attachmentVariables = {
						shopId: res.data.createShop._id,
						userId: res.data.createShop.owner._id,
						images: imageList
					}
					this.props.addAttachments({ variables: attachmentVariables }).then(()=>{
						this.props.data.refetch();
						form.resetFields();
						return this.setState({ visible: false, loadingSubmit: false });
					});
				})
				.catch(e => {
					const errors = e.graphQLErrors.map( err => err.message );
					this.setState({ visible: false, loadingSubmit: false, errors });
					return console.log(errors);
			});

		});
	}
	saveFormRef = (form) => {
	this.form = form;
	}
	renderContent() {

		const { loading, shops } = this.props.data;

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

