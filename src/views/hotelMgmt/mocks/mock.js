
import Mock from 'mockjs'

Mock.mock('http://localhost:8088/user/list', function () {
  console.log('mock getTree')
  return {
    'id': 1,
    'parentId': '0',
    'name': 'root'
  }
})

Mock.mock('http://localhost:8088/user/list?page=1&pageSize=10&name=&address=', function () {
  console.log('mock http://localhost:8088/user/list?page=1&pageSize=10&name=&address=')
  return {'status': true, 'code': 200, 'message': null, 'data': {'total': 19, 'pageSize': 1000, 'list': [{'id': 1, 'name': '王小虎21_1', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 2, 'name': '王小虎21_2', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 3, 'name': '王小虎21_3', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 4, 'name': '王小虎21_4', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 5, 'name': '王小虎21_5', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 6, 'name': '王小虎21_6', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 7, 'name': '王小虎21_7', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 8, 'name': '王小虎21_8', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 9, 'name': '王小虎21_9', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 10, 'name': '王小虎21_10', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}], 'currentPage': 1}}
})

// 添加用户
Mock.mock('/demo/user/create', function () {
  console.log('mock getTree')
  return {
  }
})
// 删除用户
Mock.mock('/demo/user/delete', function () {
  console.log('mock getTree')
  return {
    code: '',
    data: '',
    message: ''
  }
})
// 修改用户
Mock.mock('/demo/user/update', function () {
  console.log('mock getTree')
  return {
  }
})
