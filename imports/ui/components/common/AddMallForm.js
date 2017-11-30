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
import { DAYS_OPTIONS, CATEGORY_OPTIONS, selectFilterByLabel } from '/imports/modules/helpers'
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
              <FormItem label="lat">
                {getFieldDecorator('lat')(<Input placeholder="lat...." />)}
              </FormItem>
            </Col>
            
            <Col xs={12}>
              <FormItem label="lng">
                {getFieldDecorator('lng')(<Input placeholder="lng...." />)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="open days">
            {getFieldDecorator('openDays', {
              rules: [{ required: true, message: 'Please input your open days!' }],
            })(
              <Select 
                  mode='multiple' 
                  optionFilterProp="children" 
                  filterOption={selectFilterByLabel}
                  showSearch 
                  style={{ width: '100%' }} 
                  placeholder="Please select open days"
              >
                {DAYS_OPTIONS.map( item => <Option key={item.value} value={item.value}> {item.label} </Option>)}
              </Select>
            )}
          </FormItem>
          {!this.props.data.loading && this.props.data.shops && (
              <FormItem label="Shops">
              {getFieldDecorator('shopIds', {
                rules: [{ required: true, message: 'Please select shops related to this mall!' }],
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
          )}
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