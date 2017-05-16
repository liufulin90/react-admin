const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../../src/utils/mockStorge'
import { getBody } from '../utils'

let dataKey = mockStorge('DeviceGroupList', Mock.mock({
  'data|3': [
    {
      'id|+1': 1,
      'groupName|+1': ["GROUP1", "GROUP2", "GROUP3"],
      'des': '@cparagraph'
    }
  ],
  page: {
    total: 3,
    current: 1
  }
}))

let groupListData = global[dataKey]
module.exports = {

  'GET /api/group' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = groupListData.data.concat()

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length
      }
    } else {
      data = groupListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      groupListData.page.current = currentPage * 1
      newPage = groupListData.page
    }
    res.json({success: true, list: data, page: {...newPage, pageSize: Number(pageSize)}})
  },

  'POST /api/group' (req, res) {
    const curItem = getBody(req)

    if(curItem.id) {
      groupListData.data = groupListData.data.map(function (item) {
        if (item.id === curItem.id) {
          return {...curItem}
        }
        return item
      })

    } else {
      curItem.id = groupListData.data.length + 1
      groupListData.data.push({...curItem})

      groupListData.page.total = groupListData.data.length
      groupListData.page.current = 1
    }

    global[dataKey] = groupListData

    res.json({success: true, data: groupListData.data, page: groupListData.page})
  },

  'DELETE /api/group' (req, res) {
    const deleteItem = getBody(req)

    groupListData.data = groupListData.data.filter(function (item) {
      return item.id !== deleteItem.id
    })

    groupListData.page.total = groupListData.data.length

    global[dataKey] = groupListData

    res.json({success: true, data: groupListData.data, page: groupListData.page})
  },

}
