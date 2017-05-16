import { request, apiConfig } from '../utils'

export async function getToken (params) {
  const data = {
    client_id: linxins.app.admin.CLIENT_ID,
    client_secret: linxins.app.admin.CLIENT_SECRET,
    grant_type: linxins.app.admin.GRANT_TYPE
  }
  return request(apiConfig.appAuthToken, {
    method: 'post',
    data: data
  })
}

export async function login (params) {
  return request(apiConfig.appAdminCheck, {
    method: 'post',
    data: params
  })
}

export async function logout (params) {
  return request(apiConfig.appLogout, {
    method: 'post',
    data: params
  })
}

export async function userInfo (params) {
  return request(apiConfig.appUerInfo, {
    method: 'get',
    data: params
  })
}
