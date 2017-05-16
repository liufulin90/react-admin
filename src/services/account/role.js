import { request, apiConfig } from '../../utils'

export async function query (params) {
  return request(apiConfig.accountRole, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(apiConfig.accountRole, {
    method: 'post',
    data: params
  })
}

export async function update (params) {
  return request(apiConfig.accountRole, {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(apiConfig.accountRole, {
    method: 'delete',
    data: params
  })
}
