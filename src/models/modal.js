
export default {
  namespace: 'modal',
  state: {
    visible: false,
    boardModalVisible: false,
    type: 'create',
    curItem: {}
  },
  effects: {
    *changeStateAction({payload}, {put}){
      yield put({type: 'changeState', payload})
    }
  },
  reducers: {
    showModal (state, action) {
      return { ...state, visible: true, ...action.payload }
    },
    hideModal (state) {
      return { ...state, visible: false, curItem: {} }
    },
    changeState (state, action) {
      return { ...state, ...action.payload}
    },
    setItem (state, action) {
      const { curItem } = action.payload
      return { ...state, curItem }
    }
  }
}
