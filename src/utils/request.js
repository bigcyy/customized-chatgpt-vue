import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 30000
})
export default service