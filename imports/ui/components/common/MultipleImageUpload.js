import React from 'react';
import { Link, browserHistory } from 'react-router';
import { handleFileUpload } from '/imports/modules/helpers';
//antd
import Input from 'antd/lib/input';
import Tooltip from 'antd/lib/tooltip';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';



// CONSTANTS AND DESTRUCTURING
// ============================================



// STYLES
// ============================================

const styles = {
	labelStyles: {
		display: 'inline',
		textTransform: 'uppercase',
		marginRight: 4,
		fontSize: 16
	},
	highlightLabelStyles: {
		display: 'inline',
		textTransform: 'uppercase',
		marginRight: 4,
		color: '#d70b52',
		fontSize: 16
	},
	scaleText: {
		fontSize: 8,
		color: '#888'
	}
}

const { labelStyles, scaleText, highlightLabelStyles } = styles;



// INTERNAL COMPONENTS
// ============================================

class PicturesWallContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      loading: false
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSuccessfulUpload = this.onSuccessfulUpload.bind(this);
    this.onRemove = this.onRemove.bind(this);
    
  }

  handleCancel(){
    this.setState({ previewVisible: false });
  } 
  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  onRemove(file){
    this.props.onRemoveImg(file.uid)
  }
  onSuccessfulUpload(data){
      this.setState({loading: false});
      this.props.onSuccessfulImgUpload(data)
  }
  handleChange({ file, fileList, event }){

    const success = (data) => this.onSuccessfulUpload(data);
    const failure = (data) => this.setState({loading: false});

    if(file.status === 'uploading') {
      this.setState({loading: true});
      handleFileUpload(file.originFileObj, "UsersAvatar", function(error, response){
        if (error) { return failure(); }
        let data = { url: response, fileType: file.type, name: file.name };
        success(data);
      });
    }
    
    this.setState({ fileList });
  } 
  render() {
    const { previewVisible, previewImage, fileList, loading,  } = this.state;
    const { imageList, onRemoveImg } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">
        	{ loading ? 'Uploading...' : 'Upload'}
        </div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={imageList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.onRemove}
        >
          {imageList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

class MultipleImageUpload extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		const { imageList, onSuccessfulImgUpload, onRemoveImg } = this.props;
		return (
			<div style={{minHeight: 200}}>
				<hr style={{borderTop: '1px solid #efefef'}}/>
				<h3 style={{marginBottom: 3, marginTop: 25}}>ADDITIONAL IMAGES</h3>
				<h5 style={{color: '#888', marginBottom: 20}}>Upload up to 5 images</h5>
				<PicturesWallContainer 
					onRemoveImg={(uid)=> onRemoveImg(uid)}
					onSuccessfulImgUpload={(value)=>onSuccessfulImgUpload(value)} 
					imageList={imageList} 
				/>
			</div>
		);
	}
}

export { MultipleImageUpload };
