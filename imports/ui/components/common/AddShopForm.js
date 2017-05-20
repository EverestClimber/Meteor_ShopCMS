import React from 'react';
import { Random } from 'meteor/random'
//antd
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
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
import CountryInput from './CountryInput'
import StateInput from './StateInput'

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
      const { latitude, longitude, image, imageList } = this.state;
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
        <h3>Main Image</h3>
        <SingleImageUpload onSuccessfulUpload={(image) => this.setState({ image })} />
        <h3>General Info</h3>
          <FormItem label="title">
            {getFieldDecorator('title')(<Input placeholder="title of this shop...." />)}
          </FormItem>
          <FormItem label="description">
            {getFieldDecorator('description')(<Input type="textarea" rows={4}  placeholder="about this shop..." />)}
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
          <h3>Location</h3>
          <Row gutter={15}>
             <Col xs={12}>
              <FormItem label="street1">
                {getFieldDecorator('street1')(<Input placeholder="street 1...." />)}
              </FormItem>
            </Col>
            <Col xs={12}>
              <FormItem label="street2">
                {getFieldDecorator('street2')(<Input placeholder="street2...." />)}
              </FormItem>
            </Col>
            <Col xs={12}>
              <FormItem label="suburb">
                {getFieldDecorator('suburb')(<Input placeholder="suburb...." />)}
              </FormItem>
            </Col>
            <Col xs={12}>
              <StateInput getFieldDecorator={getFieldDecorator} />
            </Col>
            <Col xs={12}>
              <FormItem label="postal code">
                {getFieldDecorator('postal')(<Input placeholder="postal code...." />)}
              </FormItem>
            </Col>
            <Col xs={12}>
              <CountryInput getFieldDecorator={getFieldDecorator} />
            </Col>
          </Row>
          
          
          
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