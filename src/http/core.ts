import axios from 'axios';
import qs from 'qs';
import { Toast } from 'antd-mobile';

let PROXY_PREFIX: string | null = process.env.NODE_ENV === 'development' ? '/xy49' : '/dscagamesclient';

if (window.localStorage.getItem('tapi')) {
  PROXY_PREFIX = window.localStorage.getItem('tapi');
}

function addProxyPrefix(url: string): string {
  if (/^https?:\/\/.+$/.test(url)) return url;
  // if (process && process.env && process.env.NODE_ENV === 'development') {
  //   url = PROXY_PREFIX + url;
  // }
  url = PROXY_PREFIX + url;
  return url;
}

// Add a request interceptor
axios.interceptors.request.use(function(config: any) {
  config.url = addProxyPrefix(config.url);
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, function(error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function(response: any) {
  // Do something with response data
  response = response.data;
  if (response.success === -1) {
    Toast.fail('请重新登录！');
  }
  return response;
}, function(error) {
  // Do something with response error
  return Promise.reject(error);
});

export default axios;
