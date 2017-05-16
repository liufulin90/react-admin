import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import DevicesList from './List'
import DevicesSearch from './Search'
import DevicesModal from './ModalForm'
import BoardModal from './BoardForm'
import {checkPower} from '../../../utils'
import {ADD, UPDATE, DELETE, DETAIL} from '../../../constants/options'

function Devices({location, curPowers, dispatch, deviceList, modal, loading}) {

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)
  const boardPower = checkPower(DETAIL, curPowers)

  const {field, keyword} = location.query

  const searchProps = {
    field,
    keyword,
    addPower,
    onSearch(fieldsValue) {
      const {pathname} = location
      !!fieldsValue.keyword.length
        ? dispatch(routerRedux.push({
          pathname: pathname,
          query: {
            ...fieldsValue
          }
        }))
        : dispatch(routerRedux.push({pathname: pathname}))
    },
    onAdd() {
      dispatch({
        type: 'deviceList/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  }
  let boardModalVisible = false
  const listProps = {
    deviceList,
    loading,
    updatePower,
    deletePower,
    boardPower,
    location,
    onDeleteItem(id) {
      dispatch({type: 'deviceList/delete', payload: {id}})
    },
    onEditItem(item) {
      dispatch({
        type: 'deviceList/showModal',
        payload: {
          type: 'update',
          curItem: item
        }
      })
    },
    onBoardItem(item) {
      dispatch({
        type: 'modal/changeState',
        payload: {
          boardModalVisible: true
        }
      })
    },
    onStatusItem(item) {
      dispatch({
        type: 'deviceList/updateStatus',
        payload: {
          curItem: item
        }
      })
    }
  }

  // 编辑设备信息
  const modalProps = {
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: !!data.id
          ? 'deviceList/update'
          : 'deviceList/create',
        payload: {
          curItem: data
        }
      })
    },
    onCancel() {
      dispatch({type: 'modal/hideModal'})
    }
  }
  // 查看设备实时状态
  const boardModalProps = {
    modal,
    loading,
    onCancel() {
      dispatch({
        type: 'modal/changeState',
        payload: {
          boardModalVisible: false
        }
      })
    }
  }
  return (
    <div className='content-inner'>
      <DevicesSearch {...searchProps}/>
      <DevicesList {...listProps}/>
      <DevicesModal {...modalProps}/>
      <BoardModal {...boardModalProps}/>
    </div>
  )
}

function mapStateToProps({ deviceList, modal, loading }) {
  return { deviceList, modal, loading: loading.models.deviceList }
}

export default connect(mapStateToProps)(Devices)
