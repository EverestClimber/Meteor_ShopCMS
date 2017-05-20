import React from 'react';
import { Random } from 'meteor/random'
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
//Option
//import { getWatchgroupOptions, PRIORITY_LEVEL, REPORT_TYPE } from '../../../modules/helpers'
import { SingleImageUpload } from './SingleImageUpload'
import Geosuggest from 'react-geosuggest';
import { CATEGORY_OPTIONS } from '/imports/modules/helpers'
import { MultipleImageUpload } from './MultipleImageUpload'


// CONSTANTS & DESCTRUCTURING
// ========================================
const FormItem = Form.Item;
const Option = Select.Option;


// EXPORTED COMPONENT
// ========================================
class AddShop extends React.Component {

  state = { 
    latitude: null, 
    longitude: null, 
    location: null, 
    image: null,
    imageList: []
  };

  componentWillUnmount(){
    this.geoLoc.clearWatch(this.watchID);
  }
  componentDidMount(){

    let options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    let success = ({ coords }) => this.setState({latitude: coords.latitude, longitude: coords.longitude  });
    let error = (err) => { console.warn('ERROR(' + err.code + '): ' + err.message); };

    this.geoLoc = navigator.geolocation;
    this.watchID = this.geoLoc.watchPosition(success, error, options);

  }
  onSuccessfulUpload = (image) => {
    this.setState({ image });
  }
  onSuccessfulImgUpload = (value) => {
    
    let imageToInsert = {
            uid: Random.id(),
            name: value.name,
            fileType: value.fileType,
            url: value.url,
          }
    let currentImageList = this.state.imageList;
    currentImageList.push(imageToInsert)
    this.setState({imageList: currentImageList});
  }
  onRemoveImg = (uid) => {
    let currentImageList = this.state.imageList;
    currentImageList = currentImageList.filter(item => item.uid !== uid);
    this.setState({imageList: currentImageList});
  }
  render(){
      const { visible, onCancel, onCreate, form, loadingSubmit } = this.props;
      const { getFieldDecorator } = form;
      const { latitude,  longitude, image, imageList } = this.state;
    return (
      <Modal
        visible={visible}
        title="Add a Shop"
        onCancel={onCancel}
        footer={(
          <div>
            <Button 
              loading={loadingSubmit} 
              onClick={()=>onCreate({ latitude, longitude, image, imageList })} 
              type="primary"
            >
              + Add Shop
            </Button>
          </div>
        )}
      >
        <Form layout="vertical">
        <SingleImageUpload onSuccessfulUpload={(image) => this.setState({ image })} />
          <FormItem label="title">
            {getFieldDecorator('title')(<Input type="title" />)}
          </FormItem>
          <Geosuggest 
            onSuggestSelect={({location}) => this.setState({latitude: location.lat, longitude: location.lng})} 
          />
          <FormItem label="description">
            {getFieldDecorator('description')(<Input type="description" />)}
          </FormItem>
            <FormItem label="Category">
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Please input your Report Type!' }],
            })(
              <Select style={{ width: '100%' }} placeholder="Please select a Report Type" >
                {CATEGORY_OPTIONS.map( item => <Option key={item.key} value={item.label}> {item.label} </Option>)}
              </Select>
            )}
          </FormItem>
          <MultipleImageUpload 
            imageList={this.state.imageList}
            onSuccessfulImgUpload={this.onSuccessfulImgUpload}
            onRemoveImg={this.onRemoveImg}
          />
        </Form>
      </Modal>
    );
  }
}

// WRAP IN HOC FORM CREATOR
// ========================================
const AddShopForm = Form.create()(AddShop);

// EXPORT
// ========================================
export { AddShopForm };