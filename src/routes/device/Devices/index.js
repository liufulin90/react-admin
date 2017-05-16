import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import AdminList from './List'
import AdminSearch from './Search'
import AdminModal from './ModalForm'
import {checkPower} from '../../../utils'
import {ADD, UPDATE, DELETE} from '../../../constants/options'

function Devices({location, curPowers, dispatch, deviceList, modal, loading}) {

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

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

  const listProps = {
    deviceList,
    loading,
    updatePower,
    deletePower,
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
    onStatusItem(item) {
      dispatch({
        type: 'deviceList/updateStatus',
        payload: {
          curItem: item
        }
      })
    }
  }

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

  return (
    <div className='content-inner'>
      <AdminSearch {...searchProps}/>
      <AdminList {...listProps}/>
      <AdminModal {...modalProps}/>
    </div>
  )
}

function mapStateToProps({ deviceList, modal, loading }) {
  return { deviceList, modal, loading: loading.models.deviceList }
}

export default connect(mapStateToProps)(Devices)
