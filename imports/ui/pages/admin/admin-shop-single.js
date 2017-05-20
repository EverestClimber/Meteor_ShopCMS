import React from 'react';
import { browserHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Tag from 'antd/lib/tag';

import Popconfirm from 'antd/lib/popconfirm';
import { FETCH_SHOP } from '../../apollo/queries';
import { DELETE_SHOP } from '../../apollo/mutations';
import apollo from '../../apollo/ApolloClient';

class AdminShopSinglePage extends React.Component {
  onDelete = () => {
    const { shopById, loading } = this.props.data;

      this.props.mutate({ variables: { shopId: shopById._id } })
        .then(() => {
          return browserHistory.push('/admin/shops');
        })
        .catch(e => {
          const errors = e.graphQLErrors.map( err => err.message );
          return console.log(errors);
      });

  }
  render() {

    const { shopById, loading } = this.props.data;

    if (loading) { return <Spin /> } //show spinner while data is loading

    return (
      <div style={{width: 400, margin: '20px auto', maxWidth: '90%'}}>
        <Popconfirm onConfirm={this.onDelete} title="Are you sure delete this shop?" okText="Yes" cancelText="No">
          <Button type="primary">Delete</Button>
        </Popconfirm>
        <Card title='General Info:' style={{marginTop: 10}}>
          <h2>{shopById.title || ''}</h2>
          <p>{shopById.description || ''}</p>
          <h3>categories:</h3>
          {shopById.category && <Tag color="green">{shopById.category || ''}</Tag>}
        </Card>

        <Card title='Created By:' style={{marginTop: 10}}>
          <h2>{shopById.owner && shopById.owner._id || ''}</h2>
          <h2>{shopById.owner && shopById.owner.emails[0].address || ''}</h2>
          <h2>{shopById.owner && shopById.owner.profile.firstName || ''}</h2>
          <h2>{shopById.owner && shopById.owner.profile.lastName || ''}</h2>
        </Card>
        
      </div>
    );
  }
}




export default graphql(FETCH_SHOP, {
  options: (props) => { return { variables: { _id: props.params._id } } }
})(
  graphql(DELETE_SHOP)(AdminShopSinglePage)
);