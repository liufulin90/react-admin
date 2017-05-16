import { request, apiConfig } from '../../utils'

export async function update (params) {
  return request(apiConfig.systemModifyPassword, {
    method: 'put',
    data: params
  })
}
