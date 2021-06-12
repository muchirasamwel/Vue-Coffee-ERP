import axios from 'axios'
import https from 'https'

axios.defaults.headers.common.Authorization = localStorage.getItem('api_token')
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const API = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API
