import axios from 'axios'
// 注入拦截器
import './axios.config'
const BASE_URL = 'https://cnodejs.org/api/v1';

export const getTopicByType = (params) => {
  return axios.get(`${BASE_URL}/topics`, {params: {...params}})
}

export const getTopicDetail = (id, params) => {
  return axios.get(`${BASE_URL}/topic/${id}`, {params: {...params}})
}

export const getUser = (id, params = {}) => {
  return axios.get(`${BASE_URL}/user/${id}`, {params: {...params}})
}

export const getUserMsg = (accesstoken) => {
  return axios.post(`${BASE_URL}/accesstoken`, {accesstoken})
}

export const getMsgNum = accesstoken => {
  return axios.get(`${BASE_URL}/message/count`, {params: {accesstoken}})
}

export const getAllMsg = params => {
  return axios.get(`${BASE_URL}/messages`, {params: {...params}})
}