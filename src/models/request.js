import { routerRedux } from 'dva/router'
import { query } from '../services/account/user'
import { getCurPowers } from '../utils'

export default {
  namespace: 'request',
  state: {
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const pathname = location.pathname
        if (pathname === '/request') {
          const curPowers = getCurPowers(pathname)
          if(curPowers) {
            dispatch({ type: 'app/changeCurPowers', payload: { curPowers } })
            dispatch({ type: 'query' })
          } else {
            dispatch(routerRedux.push({ pathname: '/no-power' }))
          }
        }
      })
    }
  },
  effects: {
    *query ({ payload }, { select, call, put }) {
      const pathQuery = yield select(({ routing }) => routing.locationBeforeTransitions.query)
      const data = yield call(query, pathQuery)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.list
          }
        })
      }
    },
  },
  reducers: {
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    }
  }
}