import axios, { AxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: `${import.meta.env.VUE_APP_BASE_API}/api`,
  withCredentials: false
}) as AxiosRequestConfig

export default service
