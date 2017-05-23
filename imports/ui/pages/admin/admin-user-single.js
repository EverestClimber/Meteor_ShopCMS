// TOP LEVEL IMPORTS
import React from 'react';
import { browserHistory } from 'react-router';
// APOLLO
import { graphql } from 'react-apollo';
import { GET_USER } from '../../apollo/queries';
// ANTD
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';
import Tabs from 'antd/lib/tabs';
import Row from 'antd/lib/row';
// COMPONENTS
import AdminEditUserForm from '/imports/ui/components/admin/AdminEditUserForm'



// CONSTANTS & DESTRUCTURING
// ===================================
const TabPane = Tabs.TabPane;


// STYLES
// ===================================
const styles = {
  rowContainer: { width: 850, maxWidth: '90%', margin: 'auto', marginTop: 15 }
}

// EXPORTED COMPONENT
// ===================================
class AdminUsersSinglePage extends React.Component {

  render() {
    const { data } = this.props;

    if (data.loading) { return <Spin /> }

    return (
      <div>
        <Row gutter={10} type="flex" justify="center" align="middle" style={styles.rowContainer}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Profile" key="1">
              <div style={styles.rowContainer}>
                <h1>{data.getUserById._id}</h1>
              </div>
            </TabPane>
            <TabPane tab="Edit User" key="2">
              <div style={styles.rowContainer}>
                <AdminEditUserForm 
                  user={data.getUserById} 
                  {...this.props} 
                />
              </div>
            </TabPane>
          </Tabs>
        </Row>
      </div>
    );
  }
}



// EXPORT
// ===================================
export default graphql(GET_USER, {
  options: (props) => {
    let variables = { _id: props.params._id };
    return { variables } 
  }
})(AdminUsersSinglePage);