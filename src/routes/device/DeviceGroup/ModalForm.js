import React, { PropTypes } from 'react'
import { Form, Input, Modal, Icon } from 'antd'
import styles from './ModalForm.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const ModalForm = ({
  modal: { curItem, type, visible },
  loading,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields
  },
  onOk,
  onCancel
}) => {

  function handleOk () {
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        ...values,
        id: curItem.id
      }
      onOk(data)
    })
  }
  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建分组</div> : <div><Icon type="edit" /> 修改分组</div>,
    visible,
    wrapClassName: 'vertical-center-modal',
    className: styles.modalWidth,
    confirmLoading: loading,
    onOk: handleOk,
    onCancel,
    afterClose() {
      resetFields() //必须项，编辑后如未确认保存，关闭时必须重置数据
    }
  }

  return (
    <Modal {...modalFormOpts}>
      <Form>
        <FormItem label='分组名称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('groupName', {
            initialValue: curItem.groupName,
            rules: [
              {
                required: true,
                message: '分组名称不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='描述'  {...formItemLayout}>
          {getFieldDecorator('des', {
            initialValue: curItem.des
          })(<Input type="textarea"/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

ModalForm.propTypes = {
  modal: PropTypes.object,
  form: PropTypes.object
}

export default Form.create()(ModalForm)
