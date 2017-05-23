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
import Alert from 'antd/lib/alert';
//APOLLO
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FETCH_MALLS } from '/imports/ui/apollo/queries'
// COMPONENTS
import { SingleImageUpload } from './SingleImageUpload'
import CountryInput from './CountryInput'
import StateInput from './StateInput'
import { MultipleImageUpload } from './MultipleImageUpload'
// NPM
import Geosuggest from 'react-geosuggest';
// MODULES
import { CATEGORY_OPTIONS, selectFilterByLabel } from '/imports/modules/helpers'



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
  getMallOptions(){
    const { loading,  malls } = this.props.data;
    if (!loading && malls && malls.length > 0) {
      return malls.map(item => <Option key={item._id} value={item._id}>{item.title}</Option> )
    }
  }
  render(){
    const { latitude, longitude, image, imageList } = this.state;
    const { visible, onCancel, onCreate, form, loadingSubmit, data, errors } = this.props;
    const { getFieldDecorator } = form;
      
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
            <FormItem label="Categories">
            {getFieldDecorator('categories', {
              rules: [{ required: true, message: 'Please input your categories!' }],
            })(
              <Select 
                  mode='multiple' 
                  optionFilterProp="children" 
                  filterOption={selectFilterByLabel}
                  showSearch 
                  style={{ width: '100%' }} 
                  placeholder="Please select a Report Type"
              >
                {CATEGORY_OPTIONS.map( item => <Option key={item.value} value={item.value}> {item.label} </Option>)}
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
          <FormItem label='Mall'>
          {getFieldDecorator('mallId', {})(
            <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
              {this.getMallOptions()}
            </Select>
          )}
        </FormItem>
          <MultipleImageUpload 
            imageList={this.state.imageList}
            onSuccessfulImgUpload={this.onSuccessfulImgUpload}
            onRemoveImg={this.onRemoveImg}
          />
          {errors && errors.length > 0 && errors.map( item => <Alert key={item} message={item} type="error" />)}
        </Form>
      </Modal>
    );
  }
}

// WRAP IN HOC FORM CREATOR
// ========================================
const AddShopForm = Form.create()(
  graphql(FETCH_MALLS)(AddShop)
);


// EXPORT
// ========================================
export { AddShopForm };

