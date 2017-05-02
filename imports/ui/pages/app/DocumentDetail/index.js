import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';

class DocumentDetailPage extends React.Component {
  render() {
    const { documentById, loading } = this.props.data;

    if (loading) { return <div>Loading....</div> }
    
    return (
      <div>
        <Card title={documentById.title}>
        </Card>
      </div>
    );
  }
}



const GET_DOCUMENT_DATA = gql`
  query getDocumentById ($_id: ID!){
    documentById(_id: $_id) {
        title,
        _id
      }
  }
`;


export default graphql(GET_DOCUMENT_DATA, {
  options: (props) => { return { variables: { _id: props.params._id } } }
})(DocumentDetailPage);
