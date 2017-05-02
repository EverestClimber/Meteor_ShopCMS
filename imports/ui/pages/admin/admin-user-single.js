import React from 'react';
import { browserHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Card from 'antd/lib/card';

class AdminUsersSinglePage extends React.Component {
  renderDocumentsList = () => {
    const { loading, getUserById } = this.props.data;

    if (loading) { return }

    if (getUserById.documents && getUserById.documents.length > 0) { 
      return getUserById.documents.map(doc => {
        return (
          <Card key={doc._id} title={doc.title}>
          </Card>
        );
      })
    }

  }
  render() {
    if (this.props.data.loading) { return <Spin /> }
    return (
      <div>
        <h1>{this.props.data.getUserById._id}</h1>
        <div style={{width: 400, margin: '20px auto', maxWidth: '90%'}}>
          <h1>User Documents:</h1>
          {this.renderDocumentsList()}
        </div>
      </div>
    );
  }
}



const GET_USER = gql`
query getUserById($_id: ID!) {
    getUserById(_id: $_id) {
      _id
      emails { address, verified }
      documents {
        _id
        title
        content
      }
    }
  }
`;



export default graphql(GET_USER, {
  options: (props) => { return { variables: { _id: props.params._id } } }
})(AdminUsersSinglePage);