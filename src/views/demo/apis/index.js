import Axios from '@/assets/js/AxiosPlugin'

// 接口地址
// const BASE_PATH = process.env.API_URL

// 获取用户信息
/* eslint-disable no-new */
var param = {
  'header': {
    'businessId': 'buzId',
    'createTimestamp': 1512109614834,
    'charset': 'utf-8',
    'contentType': 'json'
  },
  'data': {
  }
}

var addParam = {
  'header': {
    'businessId': 'buzId',
    'createTimestamp': 1512109614834,
    'charset': 'utf-8',
    'contentType': 'json'
  },
  'data': {
    'id': '0000009',
    'name': 'jack',
    'code': ''
  }
}

export const getUserList = data => {
  param.data = data
  return Axios.post('/demo/user/lists', param
  ).then(res => res.data)
}
export const addUser = data => {
  addParam = data
  return Axios.post('/demo/user/create', addParam
  ).then(res => res.data)
}
export const deleteUser = userId => {
  // deleteParam.data = data
  return Axios.get('/demo/user/delete?userId=' + userId
  // return Axios.post('/demo/user/delete', deleteParam
  ).then(res => res.data)
}
export const updateUser = data => {
  // deleteParam.data = data
  return Axios.post('/demo/user/update', data
  ).then(res => res.data)
}
export const getUserListByPage = (page, pageSize, userID) => {
  return Axios.get('/demo/user/queryPageData?currentPage=' + page + '&pageSize=' + pageSize + '&userId=' + userID
  ).then(res => res.data)
}
