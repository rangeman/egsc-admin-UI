// 引用pages
// import demoindex from '@/views/demo/index'
import demoindex from '@/views/demo/index'
import index2 from '@/views/demo/index2'

// 定义路由路径数组列表
export default[
  {
    path: '/viewdemo/index',
    name: 'index',
    component: demoindex
  },
  {
    path: '/viewdemo/index2',
    name: 'index2',
    component: index2
  }

]
