import axios from 'axios'
import Vue from 'vue'
// axios.defaults.withCredentials = true
axios.defaults.timeout = 20*1000
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response.data || true
}, function (error) {
  console.log(error.toString())
})