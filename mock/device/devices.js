const qs = require('qs')
const Mock = require('mockjs')
import mockStorge from '../../src/utils/mockStorge'
import { getBody } from '../utils'

let dataKey = mockStorge('DeviceDevicesList', Mock.mock({
  'data|60': [
    {
      'id|+1': 1,
      name: '@cword(3, 5)',
      phone: /^1[34578]\d{9}$/,
      'age|11-70': 1,
      address: '@province()',
      isOnline: '@boolean',
      email: '@email',
      status: '@boolean',
      'groupId|1': [1, 2, 3],
      'groupName|1': function() {
        return ["GROUP1", "GROUP2", "GROUP3"][this.groupId - 1]
      },
      config: {
        hasTemperature: '@boolean',
        hasLocation: '@boolean',
        hasSpeed: '@boolean',
        hasAlert: '@boolean'
      },
      location: function () {
        return this.config.hasLocation ? {
          lat: Mock.mock('@float(28, 41, 6, 6)'),
          lon: Mock.mock('@float(98, 118, 6, 6)')
        } : null
      },
      temperature: function () {
        return this.config.hasTemperature ? Mock.Random.float(0, 100, 1, 2) : null
      },
      historyTemperature: function () {
        return this.config.hasTemperature ? (function () {
          var timeVale = parseInt(new Date().getTime()/1000 - 10*200)
          var data =  Mock.mock({
            'data|200': [
              {
                temperature: '@float(0, 100, 1, 2)',
                'time|+10': timeVale
              }
            ]
          })
          return data
        })() : null
      },
      speed: function () {
        return this.config.hasSpeed ? Mock.Random.float(0, 150, 1, 2) : null
      },
      createTime: '@datetime',
      realTime: Mock.Random.now('second'),
      avatar: function () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.name.substr(0, 1))
      }
    }
  ],
  page: {
    total: 60,
    current: 1
  }
}))
let DevicesListData = global[dataKey]

module.exports = {

  'GET /api/devicesItem' (req, res) {
    const getItem = qs.parse(req.query)
    const devicesItem = DevicesListData.data.find(function (item) {
      return item.id == +getItem.id
    })
    res.json({success: true, data: devicesItem})
  },

  'GET /api/devices' (req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 10
    const currentPage = page.current || 1

    let data
    let newPage

    let newData = DevicesListData.data.concat()

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
      data = DevicesListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      DevicesListData.page.current = currentPage * 1
      newPage = DevicesListData.page
    }
    res.json({success: true, data, page: {...newPage, pageSize: Number(pageSize)}})
  },

  'POST /api/devices' (req, res) {
    const newData = getBody(req)
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.name.substr(0, 1))

    const groupListData = global['DeviceGroupList'].data
    const groupList = groupListData.map(item => {
      return item.name
    })
    newData.groupName = groupList[newData.groupId - 1]

    newData.id = DevicesListData.data.length + 1
    DevicesListData.data.unshift(newData)

    DevicesListData.page.total = DevicesListData.data.length
    DevicesListData.page.current = 1

    global[dataKey] = DevicesListData

    res.json({success: true, data: DevicesListData.data, page: DevicesListData.page})
  },

  'DELETE /api/devices' (req, res) {
    const deleteItem = getBody(req)
    DevicesListData.data = DevicesListData.data.filter(function (item) {
      if (item.id === deleteItem.id) {
        return false
      }
      return true
    })

    DevicesListData.page.total = DevicesListData.data.length

    global[dataKey] = DevicesListData

    res.json({success: true, data: DevicesListData.data, page: DevicesListData.page})
  },

  'PUT /api/devices' (req, res) {
    const editItem = getBody(req)

    const groupListData = global['DeviceGroupList'].data
    const groupList = groupListData.map(item => {
      return item.groupName
    })

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', editItem.name.substr(0, 1))
    editItem.groupName = groupList[editItem.groupId - 1]

    DevicesListData.data = DevicesListData.data.map(function (item) {
      if (item.id === editItem.id) {
        return editItem
      }
      return item
    })

    global[dataKey] = DevicesListData
    res.json({success: true, data: DevicesListData.data, page: DevicesListData.page})
  }

}
