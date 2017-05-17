import React, { PropTypes } from 'react'
import { Form, Input, Radio, Modal, Icon, Select } from 'antd'
import styles from './ModalForm.less'
import BoardChart from '../../charts/lineChart'

const FormItem = Form.Item

const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const ModalForm = ({
  modal: { curItem, type, boardModalVisible},
  loading,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields
  },
}) => {

  if(!curItem.groupList) {
    curItem.groupList = []
  }

  const handleOk = () => {
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
    title: <div><Icon type="eye" />设备实时状态</div>,
    visible: boardModalVisible,
    wrapClassName: 'vertical-center-modal',
    className: styles.boardModalWidth,
    confirmLoading: loading,
    footer: null, // 当不需要默认底部按钮时
    onCancel,
    afterClose() {
      resetFields() //必须项，编辑后如未确认保存，关闭时必须重置数据
    }
  }

  return (
    <Modal {...modalFormOpts}>
      <BoardChart />
      <Form>
        <FormItem label='设备名称：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: curItem.name,
            rules: [
              {
                required: true,
                message: '设备名称不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='是否离线' hasFeedback {...formItemLayout}>
          {getFieldDecorator('isOnline', {
            initialValue: curItem.isOnline,
            rules: [
              {
                required: true,
                type: 'boolean',
                message: '请选择性别'
              }
            ]
          })(
            <Radio.Group>
              <Radio value>在线</Radio>
              <Radio value={false}>离线</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label='设备编号：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: curItem.phone,
            rules: [
              {
                required: true,
                message: '设备编号不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='分组：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('groupId', {
            initialValue: curItem.groupId && curItem.groupId.toString(),
            rules: [
              {
                required: true,
                message: '分组不能为空'
              }
            ]
          })(<Select placeholder='--请选择分组--'>{curItem.groupList.map(item => <Option key={item.id} value={item.id.toString()}>{item.groupName}</Option>)}</Select>)}
        </FormItem>
        <FormItem label='地区：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: curItem.address,
            rules: [
              {
                required: true,
                message: '地区不能为空'
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

ModalForm.propTypes = {
  modal: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
}

export default Form.create()(ModalForm)
