import { request, apiConfig } from '../../utils'

export async function query (params) {
  return request(apiConfig.accountAdmin, {
    method: 'get',
    data: params
  })
}

export async function get (params) {
  return request(apiConfig.accountAdminItem, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(apiConfig.accountAdmin, {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(apiConfig.accountAdmin, {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request(apiConfig.accountAdmin, {
    method: 'put',
    data: params
  })
}
