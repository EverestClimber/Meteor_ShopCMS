import React from 'react';
import { browserHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import { FETCH_SHOP } from '../../apollo/queries';


class AdminShopSinglePage extends React.Component {
  render() {

    const { shopById, loading } = this.props.data;

    if (loading) { return <Spin /> } //show spinner while data is loading

    return (
      <div style={{width: 400, margin: '20px auto', maxWidth: '90%'}}>

        <Card title='General Info:' style={{marginTop: 10}}>
          <h2>{shopById.title || ''}</h2>
          <h2>{shopById.description || ''}</h2>
          <h2>{shopById.category || ''}</h2>
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
})(AdminShopSinglePage);