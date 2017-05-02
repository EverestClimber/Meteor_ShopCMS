import React from 'react';
import { browserHistory } from 'react-router';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { AddDocumentForm, DocumentsList } from '../../../components/common';
import Button from 'antd/lib/button';

class DocumentsListPagePage extends React.Component {
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    console.log(this.props);
    form.validateFields((err, { title, content }) => {
      if (err) { return; }
      this.props.mutate({ variables: { title, content } })
        .then(() => {
          this.props.data.refetch()
          form.resetFields();
          return this.setState({ visible: false });
        });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>New Collection</Button>
        <AddDocumentForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
		<DocumentsList {...this.props} />
      </div>
    );
  }
}



const GET_DOCUMENTS_DATA = gql`
query getDocuments {
    documents {
      title,
      _id,
      owner { _id, emails {
        address
      } }
    }
  }
`;

const ADD_DOCUMENT = gql`
  mutation getDocument ($title: String!, $content: String!){
      createDocument(title: $title, content: $content) {
        title,
      }
  }
`;

const DocumentsListPage = graphql(GET_DOCUMENTS_DATA)(
  graphql(ADD_DOCUMENT)(DocumentsListPagePage)
);

export { DocumentsListPage };