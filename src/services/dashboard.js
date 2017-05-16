import { request, apiConfig } from '../utils'

export async function myCity (params) {
  return request(apiConfig.getMyCity, {
    method: 'get',
    cross: true,
    data: params
  })
}

export async function queryWeather (params) {
  return request(apiConfig.queryWeather, {
    method: 'get',
    cross: true,
    data: params
  })
}

export async function query (params) {
  return request(apiConfig.dashboard, {
    method: 'get',
    data: params
  })
}
