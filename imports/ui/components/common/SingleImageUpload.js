//top-level imports
import React from 'react';
import { browserHistory } from 'react-router';
//antd
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import Col from 'antd/lib/col';
//modules
import { handleFileUpload } from '../../../modules/helpers'
import { graphql } from 'react-apollo';


export class SingleImageUpload extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        imageUrl: this.props.defaultImage || false, 
        loading: false
      };
      this.normFile = this.normFile.bind(this);
      this.handleUpload = this.handleUpload.bind(this);
      this.onSuccessfulUpload = this.onSuccessfulUpload.bind(this);
      this.getContent = this.getContent.bind(this);
  }
  normFile(e){
    if (Array.isArray(e)) { return e; }
    return e && e.fileList;
  }
  onSuccessfulUpload(response){
     this.setState({imageUrl: response, loading: false});
     this.props.onSuccessfulUpload(response);
  }
  handleUpload(e) {
    let _this = this;
    _this.setState({loading: true});
    if (Array.isArray(e)) { return console.log(e); }
    if (e.file.status !== "uploading") { return console.log(e); }
    handleFileUpload(e.file.originFileObj, "UsersAvatar", function(error, response){
      if (error) { _this.setState({loading: false}); return console.log('error'); }
      _this.onSuccessfulUpload(response);
    });
    return e && e.fileList;
  }
  getContent(){

    if (this.state.loading) {
      return <Icon type="loading" className="avatar-uploader-trigger"  />
    }

    if (this.state.imageUrl) {
      return <img src={this.state.imageUrl} alt="" className="avatar" /> 
    }

    return <Icon type="plus" className="avatar-uploader-trigger" />;

  }
  render(){

    return (
      <div style={{marginBottom: 15, marginTop: 15}}>
        <Upload onChange={this.handleUpload} className="avatar-uploader" name="avatar" showUploadList={false}>
          {this.getContent()}
        </Upload>
      </div>
    );
  }
}
