import React, {PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import GroupList from './List'
import GroupSearch from './Search'
import GroupModal from './ModalForm'
import {checkPower} from '../../../utils'
import {ADD, UPDATE, DELETE} from '../../../constants/options'

function Group({location, curPowers, dispatch, deviceGroup, modal, loading}) {

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const {field, keyword} = location.query

  const searchProps = {
    field,
    keyword,
    addPower,
    onAdd() {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  }

  const listProps = {
    deviceGroup,
    loading,
    updatePower,
    deletePower,
    location,
    onDeleteItem(id) {
      dispatch({type: 'deviceGroup/delete', payload: {id}})
    },
    onEditItem(item) {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'update',
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
          ? 'deviceGroup/update'
          : 'deviceGroup/create',
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
      <GroupSearch {...searchProps}/>
      <GroupList {...listProps}/>
      <GroupModal {...modalProps}/>
    </div>
  )
}

Group.propTypes = {
  deviceGroup: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ deviceGroup, modal, loading }) {
  return { deviceGroup, modal, loading: loading.models.deviceGroup }
}

export default connect(mapStateToProps)(Group)
