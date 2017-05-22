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
//APOLLO
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FETCH_SHOPS } from '/imports/ui/apollo/queries'

//Option
//import { getWatchgroupOptions, PRIORITY_LEVEL, REPORT_TYPE } from '../../../modules/helpers'
import { SingleImageUpload } from './SingleImageUpload'
import Geosuggest from 'react-geosuggest';
import { CATEGORY_OPTIONS, selectFilterByLabel } from '/imports/modules/helpers'
import { MultipleImageUpload } from './MultipleImageUpload'
import CountryInput from './CountryInput'
import StateInput from './StateInput'

// CONSTANTS & DESCTRUCTURING
// ========================================
const FormItem = Form.Item;
const Option = Select.Option;


// EXPORTED COMPONENT
// ========================================
class AddMall extends React.Component {

  render(){
      const { visible, onCancel, onCreate, form, loadingSubmit } = this.props;
      const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Add a Mall"
        onCancel={onCancel}
        footer={(
          <div>
            <Button 
              loading={loadingSubmit} 
              onClick={()=>onCreate()} 
              type="primary"
            >
              + Add Mall
            </Button>
          </div>
        )}
      >
        <Form layout="vertical">
        <h3>General Info</h3>
          <FormItem label="title">
            {getFieldDecorator('title')(<Input placeholder="title of this shop...." />)}
          </FormItem>
          <FormItem label="description">
            {getFieldDecorator('description')(<Input type="textarea" rows={4}  placeholder="about this mall..." />)}
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
          {/*!this.props.data.loading && this.props.data.shops && (
              <FormItem label="Shops">
              {getFieldDecorator('shopIds', {
                rules: [{ required: true, message: 'Please input your mall!' }],
              })(
                <Select 
                  showSearch 
                  optionFilterProp="children" 
                  filterOption={selectFilterByLabel}
                  mode='multiple' 
                  style={{ width: '100%' }} 
                  placeholder="Please select shops related to this mall"
                >
                  {this.props.data.shops.map( item => <Option key={item._id} value={item._id}> {item.title} </Option>)}
                </Select>
              )}
            </FormItem>
          )*/}
        </Form>
      </Modal>
    );
  }
}

// WRAP IN HOC FORM CREATOR
// ========================================
const ComponentWithData = graphql(FETCH_SHOPS)(AddMall)
const AddMallForm = Form.create()(ComponentWithData);

// EXPORT
// ========================================
export { AddMallForm };