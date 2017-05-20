import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import { country_list, states_list, selectFilterByLabel } from '/imports/modules/helpers'

const Option = Select.Option;
const FormItem = Form.Item;

class CountryInput extends React.Component {
  render(){
    const { getFieldDecorator } = this.props;
    const countryChildren = country_list.map(item => <Option key={item} value={item}>{item}</Option>);
    return (
      <FormItem 
        label='Country'>
        {getFieldDecorator('country', {rules: [{ required: true, message: 'Please input your first name!' }]})(
          <Select showSearch optionFilterProp="children" filterOption={selectFilterByLabel}>
          {countryChildren}
          </Select>
        )}
      </FormItem>
    );
  }
}

export default CountryInput;