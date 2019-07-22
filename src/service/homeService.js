import Vue from 'vue'
import http from './http'

function getList(data = {}) {
  return http.get('bt-server/tp/selectByFy', data);
}
