import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';



const AddDocument = () => {
	return (
		<div>
			AddDocument
		</div>
	);
}

const DocumentsList = () => {
	return (
		<div>
			Documents List Here
		</div>
	);
}

const DocumentsListPage = () => {
	return (
		<div>
			<AddDocument />
			<DocumentsList />
		</div>
	);
}

const GET_DOCUMENTS_DATA = gql`
  query getDocument {
    document {
      title,
    }
  }
`;


graphql(GET_DOCUMENTS_DATA)(DocumentsListPage)

export { DocumentsListPage };