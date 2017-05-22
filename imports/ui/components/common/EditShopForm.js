import React from 'react';
import { Random } from 'meteor/random'
//antd
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Card from 'antd/lib/card';
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
class EditShop extends React.Component {

  state = { 
    location: null, 
    image: null,
    imageList: this.props.shop.attachments || [],
    errors: [],
    loading: false
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    setTimeout(()=>{
      this.setState({loading: false});
    }, 3000)
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
    const { image, imageList, errors } = this.state;
    const { loadingSubmit, data, shop, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Card style={{width: 550, margin: 'auto', maxWidth: '90%'}}>
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <h3>Main Image</h3>
        <SingleImageUpload 
          defaultImage={shop.image} 
          onSuccessfulUpload={(image) => this.setState({ image })} 
        />
        <h3>General Info</h3>
          <FormItem label="title">
            {getFieldDecorator('title', {
              initialValue: shop && shop.title || null
            })(<Input placeholder="title of this shop...." />)}
          </FormItem>
          <FormItem label="description">
            {getFieldDecorator('description', {
              initialValue: shop && shop.description || null
            })(<Input type="textarea" rows={4}  placeholder="about this shop..." />)}
          </FormItem>
            <FormItem label="Categories">
            {getFieldDecorator('categories', {
              rules: [{ required: true, message: 'Please input your categories!' }],
              initialValue: shop && shop.categories || []
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
          <FormItem label='Mall'>
          {getFieldDecorator('mallId', {
            initialValue: shop && shop.mallId || null
          })(
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
          <FormItem>
            <Button loading={this.state.loading} htmlType="submit" type='primary'>
              SAVE CHANGES
            </Button>
          </FormItem>
        </Form>
        </Card>
    );
  }
}

// WRAP IN HOC FORM CREATOR
// ========================================
const EditShopForm = Form.create()(
  graphql(FETCH_MALLS)(EditShop)
);


// EXPORT
// ========================================
export default EditShopForm;

