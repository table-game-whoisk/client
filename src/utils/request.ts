import axios, { AxiosRequestConfig } from "axios"

const baseURL = "http://192.168.3.8:4000"

export const request = axios.create({
  baseURL
})

request.interceptors.response.use(function (response) {
  const { status, data } = response
  if (status === 200) {
    return data.data
  } else {
    return Promise.reject(data.msg)
  }

}, function (error) {
  return Promise.reject(error)
})

export const apis: Record<string, AxiosRequestConfig<any>> = {

}

request({})