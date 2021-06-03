import axios from 'axios'
import https from 'https'

export const API = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorisation: 'Bearer {token}'
  },
})

export default API
