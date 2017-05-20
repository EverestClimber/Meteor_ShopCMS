import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import { states_list, selectFilterByLabel } from '/imports/modules/helpers'

const Option = Select.Option;
const FormItem = Form.Item;

class StateInput extends React.Component {
  render(){
    const { getFieldDecorator } = this.props;
    const stateChildren = states_list.map(({abbreviation, name}) => <Option key={abbreviation} value={abbreviation}>{name}</Option>);
    return (
      <FormItem 
        label='State'>
        {getFieldDecorator('state', {rules: [{ required: false, message: 'Please input your first name!' }]})(
          <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
          {stateChildren}
          </Select>
        )}
      </FormItem>
    );
  }
}

export default StateInput;