/**
 * 所有接口地址定义
 */
var apiConfig = linxins.app.admin.ISMOCK ? {
  // mock or dev
  // 管理员
  'accountAdmin': '/api/admin',
  'accountAdminItem': '/api/adminItem',
  // 角色
  'accountRole': '/api/role',
  // 用户
  'accountUser': '/api/user',
  'accountUserItem': '/api/userItem',
  // 类别
  'bbsCategory': '/api/category',
  // 设备管理
  'deviceDevices': '/api/devices',
  'deviceDevicesItem': '/api/devicesItem',
  // 系统设置
  'systemModifyPassword': '/api/modifyPassword',
  // 获取token
  'appAuthToken': '/oauth/token',
  'appAdminCheck': '/admin/check',
  'appLogout': '/api/logout',
  'appUerInfo': '/api/userInfo',
  // 仪表
  'dashboard': '/api/dashboard',
  // 其他
  'getMyCity': 'http://www.zuimeitianqi.com/zuimei/myCity',
  'queryWeather': 'http://www.zuimeitianqi.com/zuimei/queryWeather',
} : {
  // 生产环境
  // 管理员
  'accountAdmin': '/api/admin',
  'accountAdminItem': '/api/adminItem',
  // 角色
  'accountRole': '/api/role',
  // 用户
  'accountUser': '/api/user',
  'accountUserItem': '/api/userItem',
  // 类别
  'bbsCategory': '/api/category',
  // 设备管理
  'deviceDevices': '/api/devices',
  'deviceDevicesItem': '/api/devicesItem',
  // 系统设置
  'systemModifyPassword': '/api/modifyPassword',
  // 获取token
  'appAuthToken': '/oauth/token',
  'appAdminCheck': '/admin/check',
  'appLogout': '/api/logout',
  'appUerInfo': '/api/userInfo',
  // 仪表
  'dashboard': '/api/dashboard',
  // 其他
  'getMyCity': 'http://www.zuimeitianqi.com/zuimei/myCity',
  'queryWeather': 'http://www.zuimeitianqi.com/zuimei/queryWeather',

}

export {
  apiConfig
}