import React from 'react';
//antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Radio from 'antd/lib/radio';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';

const FormItem = Form.Item;

const AddDocumentForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('content')(<Input type="textarea" />)}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export { AddDocumentForm };