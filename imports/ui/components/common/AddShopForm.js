import React from 'react';
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
 

const CATEGORY_OPTIONS = [
  { label: 'food', value: 'food'},
  { label: 'clothing', value: 'clothing'},
  { label: 'electronics', value: 'electronics'}
];

/*const buildReport = (args) => {
  let report = {
    watchgroupId: args.watchgroupId,
    messageValue: args.messageValue,
    reportType: args.reportType,
    priorityLevel: args.priorityLevel,
    modelType: args.modelType,
  }
  return report;
}*/

const FormItem = Form.Item;
const Option = Select.Option;


class AddShop extends React.Component {

  state = { latitude: null, longitude: null, location: null, image: null };

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
  render(){
      const { visible, onCancel, onCreate, form, loadingSubmit } = this.props;
      const { getFieldDecorator } = form;
      const { latitude,  longitude, image } = this.state;
    return (
      <Modal
        visible={visible}
        title="Add a Shop"
        onCancel={onCancel}
        footer={(
          <div>
            <Button 
              loading={loadingSubmit} 
              onClick={()=>onCreate({ latitude, longitude, image })} 
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
        </Form>
      </Modal>
    );
  }
}

const AddShopForm = Form.create()(AddShop);

export { AddShopForm };