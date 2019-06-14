/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import axios from 'axios'

const Axios = axios.create({
  timeout: 10000
})

// 设置全局的init
/*

const init = function () {
  // Add a response interceptor

  Axios.interceptors.response.use(function (response) {
    const {status, data} = response

    if (status === 200) {
      // 如果不出现错误，直接向回调函数内输出 data
      if (data.code === 'success') {
        return data.data
      } else {
        return data
      }
    } else {
      return response
    }
  }, function (error) {
    const {response} = error

    // 这里处理错误的 http code
    if (response.status === 404) {
      console.log('404 error %o' + error)
    }

    // Do something with response error
    return Promise.reject(error)
  })
}

*/

Axios.install = (Vue) => {
  Vue.prototype.$http = Axios
}

export default Axios
