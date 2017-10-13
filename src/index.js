// import "babel-polyfill" // 如果需要支持ie 9+，请解注此行即可。
import './index.html'
import 'nprogress/nprogress.css'
import dva from 'dva'
import { browserHistory, hashHistory } from 'dva/router'
import createLoading from 'dva-loading'

// 1. Initialize
const app = dva({
  history: hashHistory,
  onError(error) {
    console.error("app onError -- ", error)
  }
})

// 2. Plugins
app.use(createLoading({
  effects: true,
}))

// 3. Model
app.model(require('./models/app'))
app.model(require('./models/modal'))

if(linxins.app.admin.IS_DYNAMIC_LOAD) {
  // 4. Router for browserHistory dynamic load
  app.router(require('./router-dynamic'))
} else {
  app.model(require('./models/dashboard'))

  app.model(require('./models/account/admin'))
  app.model(require('./models/account/user'))
  app.model(require('./models/account/role'))

  app.model(require('./models/system/modifyPassword'))

  app.model(require('./models/bbs/category'))

  // 4. Router for browserHistory
  app.router(require('./router'))
}

// 5. Start
app.start('#root')

