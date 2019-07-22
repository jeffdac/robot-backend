import axios from 'axios';
import vm from '../main'

axios.defaults.baseURL = 'http://auth.51godream.com/api/';
axios.defaults.timeout = 30000;

// 拦截请求
axios.interceptors.request.use(config => {
  if (!checkAuth()) logout();
  config.headers = {'Content-Type': 'application/json'};
  const token = localStorage.getItem('token');
  if (token) Object.assign(config.headers, {Authorization: token});
  return config;

}, error => Promise.reject(error));

// 拦截响应
axios.interceptors.response.use(res => res.data, error => {
  handleError(error);
});

// 验证登录
function checkAuth() {
  return localStorage.getItem('token') && localStorage.getItem('expires_in') > new Date().getTime()
}

// 退出登录
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('expires_in');
  vm.$router.push('login');
}

// 错误处理
function handleError(err) {
  console.log(err, 'errrrrrrrr');
}

class Http {
  get(url, params) {
    return axios.get(url, {params: params})
  }

  put = axios.put;

  post = axios.post;

  delete = axios.delete
}

export const http = new Http();
