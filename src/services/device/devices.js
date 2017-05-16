import { request, apiConfig } from '../../utils'

export async function query (params) {
  return request(apiConfig.deviceDevices, {
    method: 'get',
    data: params
  })
}

export async function get (params) {
  return request(apiConfig.deviceDevicesItem, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(apiConfig.deviceDevices, {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(apiConfig.deviceDevices, {
    method: 'delete',
    data: params
  })
}

export async function update (params) {
  return request(apiConfig.deviceDevices, {
    method: 'put',
    data: params
  })
}
