import { request, apiConfig } from '../../utils'

export async function query (params) {
  return request(apiConfig.accountUser, {
    method: 'get',
    data: params
  })
}

export async function get (params) {
  return request(apiConfig.accountUserItem, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(apiConfig.accountUser, {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(apiConfig.accountUser, {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request(apiConfig.accountUser, {
    method: 'put',
    data: params
  })
}
