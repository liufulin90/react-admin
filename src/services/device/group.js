import { request, apiConfig } from '../../utils'

export async function query (params) {
  return request(apiConfig.deviceGroup, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(apiConfig.deviceGroup, {
    method: 'post',
    data: params
  })
}

export async function update (params) {
  return request(apiConfig.deviceGroup, {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(apiConfig.deviceGroup, {
    method: 'delete',
    data: params
  })
}
