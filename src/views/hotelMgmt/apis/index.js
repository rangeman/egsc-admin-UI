import Axios from '@/assets/js/AxiosPlugin'

// 查询房间信息
export const listRoom = () => {
  return Axios.get('/hotelMgmt/roomMgmt/listRoom').then(res => res.data)
}

// 新增房间信息
export const insertRoom = params => {
  return Axios.post('/hotelMgmt/roomMgmt/insertRoom', params).then(res => res.data)
}

// 修改房间信息
export const updateRoom = params => {
  return Axios.post('/hotelMgmt/roomMgmt/updateRoom', params).then(res => res.data)
}

// 删除房间信息
export const deleteRoom = params => {
  return Axios.get('/hotelMgmt/roomMgmt/deleteRoom?roomNumber=' + params).then(res => res.data)
}

// 房间是否存在
export const isRoomNoExists = params => {
  return Axios.get('/hotelMgmt/roomMgmt/isRoomNumberExists?roomNumber=' + params).then(res => res.data)
}

// 查询开房记录信息
export const listCheckIn = params => {
  return Axios.get('/hotelMgmt/checkInMgmt/listCheckIn').then(res => res.data)
}

// 保存开房信息
export const saveCustomer = params => {
  return Axios.post('/hotelMgmt/checkInMgmt/insertCustomer', params).then(res => res.data)
}

// 获取空闲房间
export const getFreeRoom = params => {
  return Axios.get('/hotelMgmt/checkInMgmt/getFreeRoom').then(res => res.data)
}

// 退房
export const deleteCheckIn = params => {
  return Axios.get('/hotelMgmt/checkInMgmt/deleteCheckIn?roomNumber=' + params).then(res => res.data)
}

// 换房
export const changRoom = (from, to) => {
  return Axios.get('/hotelMgmt/checkInMgmt/changeRoom?from=' + from + '&to=' + to).then(res => res.data)
}

// 历史记录查询
export const listHistoryRecords = params => {
  return Axios.post('/hotelMgmt/historyRecordMgmt/listHistoryRecords', params).then(res => res.data)
}

// 每月收入汇总
export const getIncome = () => {
  return Axios.get('/hotelMgmt/incomeStatistics/getIncome').then(res => res.data)
}
