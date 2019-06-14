// 引用pages
import checkInAndOutMgmt from '@/views/hotelMgmt/components/checkInAndOutMgmt'
import roomMgmt from '@/views/hotelMgmt/components/roomMgmt'
import historyRecord from '@/views/hotelMgmt/components/historyRecord'
import incomeStatistics from '@/views/hotelMgmt/components/incomeStatistics'

// 定义路由路径数组列表
export default[
  {
    path: '/hotelMgmt/checkInAndOutMgmt',
    name: 'checkInAndOutMgmt',
    component: checkInAndOutMgmt
  },
  {
    path: '/hotelMgmt/historyRecord',
    name: 'historyRecord',
    component: historyRecord
  },
  {
    path: '/hotelMgmt/incomeStatistics',
    name: 'incomeStatistics',
    component: incomeStatistics
  },
  {
    path: '/hotelMgmt/roomMgmt',
    name: 'roomMgmt',
    component: roomMgmt
  }
]
