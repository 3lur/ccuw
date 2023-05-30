import axios from "axios";

export const ajax = axios.create({
  baseURL: 'http://localhost:8090/api/user',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

ajax.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('pocketbase_auth') as any) || ''
  config.headers = config.headers || {}
  if (token) { config.headers.Authorization = token }
  return config
})
