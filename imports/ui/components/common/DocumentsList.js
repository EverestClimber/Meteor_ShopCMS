import React from 'react';
import { browserHistory } from 'react-router';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const DocumentItem = ({ item }) => {
	return (
		<Card title={item.title} onClick={() => browserHistory.push(`/documents/${item._id}`)} >
			<p>ownerId: {item.owner._id}</p>
		</Card>
	);
}

class DocumentsList extends React.Component {

	renderDocuments = () => {
		const { documents } = this.props.data;

		if (documents && documents.length > 0) {
			return documents.map( doc => {
				return (
					<Col key={doc._id}>
						<DocumentItem item={doc} />
					</Col>
				);
			})
		}

	}
	render(){
		const { data } = this.props;

		if (data.loading) { return null; }

		return (
			<Row gutter={30} type='flex' justify='center' align='middle' style={{ padding: 30 }}>
				{this.renderDocuments()}
			</Row>
		); 
	}
}

export { DocumentsList };