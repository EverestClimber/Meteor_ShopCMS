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
//import { FETCH_SHOP } from '../../apollo/queries';
//import { DELETE_SHOP } from '../../apollo/mutations';
import { FETCH_MALL } from '../../apollo/queries';
import { DELETE_MALL } from '../../apollo/mutations';

import apollo from '../../apollo/ApolloClient';
// MODULES
import { getCategoryTag } from '/imports/modules/helpers'
//COMPONENTS
import EditMallForm from '/imports/ui/components/common/EditMallForm'


// CONSTANTS & DESTRUCTURING
// ===================================
const TabPane = Tabs.TabPane;

// STYLES
// ===================================
const styles = {
  rowContainer: { width: 850, maxWidth: '90%', margin: 'auto', marginTop: 15 }
}


class MallSingle extends React.Component {
  onDelete = () => {
    const { mallById, loading } = this.props.data;

      this.props.mutate({ variables: { mallId: mallById._id } })
        .then(() => {
          return browserHistory.push('/admin/malls');
        })
        .catch(e => {
          const errors = e.graphQLErrors.map( err => err.message );
          return console.log(errors);
      });

  }
  render() {

    const { mallById, loading } = this.props.data;

    if (loading) { return <Spin /> } //show spinner while data is loading
    console.log(mallById);
    return (
      <div style={{width: 400, margin: '20px auto', maxWidth: '90%'}}>
        <Popconfirm onConfirm={this.onDelete} title="Are you sure delete this mall?" okText="Yes" cancelText="No">
          <Button type="primary">Delete</Button>
        </Popconfirm>
        <Card title='General Info:' style={{marginTop: 10}}>
          <h2>{mallById.title || ''}</h2>
          <p>{mallById.description || ''}</p>
          <h3>open days:</h3>
          {mallById.openDays && mallById.openDays.length > 0 
            && mallById.openDays.map(item => <Tag color="green" key={item}>{item}</Tag>)
          }
        </Card>
        
        <Card title='Created By:' style={{marginTop: 10}}>
          <h2>{mallById.owner && mallById.owner._id || ''}</h2>
          <h2>{mallById.owner && mallById.owner.emails[0].address || ''}</h2>
          <h2>{mallById.owner && mallById.owner.profile.name.first || ''}</h2>
          <h2>{mallById.owner && mallById.owner.profile.name.last || ''}</h2>
        </Card>
      </div>
    );
  }
}

// EXPORTED COMPONENT
// ===================================
class AdminMallSinglePage extends React.Component {
  
  render() {
    const { data } = this.props;

    if (data.loading) { return <Spin /> }
    //console.log("admin-mall-single");
    return (
      <div>
        <Row gutter={10} type="flex" justify="center" align="middle" style={styles.rowContainer}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Mall" key="1">
              <div style={styles.rowContainer}>
                <MallSingle {...this.props}/>
              </div>
            </TabPane>
            <TabPane tab="Edit Mall" key="2">
              <div style={styles.rowContainer}>
                <EditMallForm mall={data.mallById} />
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


export default graphql(FETCH_MALL, {
  options: (props) => { return { variables: { _id: props.params._id  } } }
})(
  graphql(DELETE_MALL)(AdminMallSinglePage)
);