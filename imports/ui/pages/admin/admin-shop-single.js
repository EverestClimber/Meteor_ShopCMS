import React from 'react';
import { browserHistory } from 'react-router';

import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Tag from 'antd/lib/tag';
import Popconfirm from 'antd/lib/popconfirm';
import Tabs from 'antd/lib/tabs';
import Row from 'antd/lib/row';
// APOLLO
import { graphql } from 'react-apollo';
import { FETCH_SHOP } from '../../apollo/queries';
import { DELETE_SHOP } from '../../apollo/mutations';
import apollo from '../../apollo/ApolloClient';
// MODULES
import { getCategoryTag } from '/imports/modules/helpers'
//COMPONENTS
import EditShopForm from '/imports/ui/components/common/EditShopForm'


// CONSTANTS & DESTRUCTURING
// ===================================
const TabPane = Tabs.TabPane;

// STYLES
// ===================================
const styles = {
  rowContainer: { width: 850, maxWidth: '90%', margin: 'auto', marginTop: 15 }
}


class ShopSingle extends React.Component {
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
          {shopById.categories && shopById.categories.length > 0 
            && shopById.categories.map(item => <Tag color="green" key={item}>{getCategoryTag(item)}</Tag>)
          }
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

// EXPORTED COMPONENT
// ===================================
class AdminShopSinglePage extends React.Component {
  
  render() {
    const { data } = this.props;

    if (data.loading) { return <Spin /> }

    return (
      <div>
        <Row gutter={10} type="flex" justify="center" align="middle" style={styles.rowContainer}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Shop" key="1">
              <div style={styles.rowContainer}>
                <ShopSingle {...this.props}/>
              </div>
            </TabPane>
            <TabPane tab="Edit Shop" key="2">
              <div style={styles.rowContainer}>
                <EditShopForm shop={data.shopById} />
              </div>
            </TabPane>
          </Tabs>
        </Row>
      </div>
    );
  }
}
// EXPORTED COMPONENT
// ===================================





export default graphql(FETCH_SHOP, {
  options: (props) => { return { variables: { _id: props.params._id } } }
})(
  graphql(DELETE_SHOP)(AdminShopSinglePage)
);