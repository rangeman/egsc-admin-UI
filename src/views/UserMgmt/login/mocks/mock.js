
import config from './config'
import Mock from 'mockjs'

Mock.mock(config.url('userlogin'), function () {
  console.log('mock userlogin')
  return { 'status': true,
    'code': 200,
    'message': null,
    'data': { 'meuns': [
      { 'icon': 'el-icon-setting', 'index': '/home', 'title': '首页', 'subs': null },
      { 'icon': 'el-icon-menu', 'index': '2', 'title': '用户管理', 'subs': [{ 'icon': null, 'index': '/users', 'title': '用户列表', 'subs': null }, { 'icon': null, 'index': '/user/info', 'title': '新增用户', 'subs': null }] }],
      'routers': '/home_/users',
      'token': 'eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIxMDAxIiwiZXhwIjoxNTEyMTMyODM3fQ.DOcT-EMPJr80w3kvLbpImAFjHJ-tB_KYa5IkE5Vm0SizKfhGf36Dn1cI3AiwOybMiCiDK00CjwC3-IsARimcL4Q5QLISOPWg0-4Rm0CMgHg8T-25QWOLKiOxDVAGJ_QWfFAaR7tMLrDOm5DsWvN8i7cj5Wra8zfoxeF7vUcCxts' } }
})

Mock.mock(config.url('homeloadData'), function () {
  console.log('mock homeloadData')
  return {'status': true, 'code': 200, 'message': null, 'data': 'hello'}
})

Mock.mock(config.url('userlist'), function () {
  console.log('mock userlist')
  return {'status': true, 'code': 200, 'message': null, 'data': {'total': 19, 'pageSize': 1000, 'list': [{'id': 1, 'name': '王小虎21_1', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 2, 'name': '王小虎21_2', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 3, 'name': '王小虎21_3', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 4, 'name': '王小虎21_4', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 5, 'name': '王小虎21_5', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 6, 'name': '王小虎21_6', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 7, 'name': '王小虎21_7', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 8, 'name': '王小虎21_8', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 9, 'name': '王小虎21_9', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}, {'id': 10, 'name': '王小虎21_10', 'address': '上海市普陀区金沙江路 1518 弄', 'date': '2016-05-02'}], 'currentPage': 1}}
})

/*
Mock.mock(config.url('test'), function () {
  console.log('mock homeloadData')
  return { 'status': true, 'code': 200, 'message': null, 'data': 'hello' }
})
*/
