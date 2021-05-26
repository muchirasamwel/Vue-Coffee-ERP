import axios from 'axios'

export const API = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Authorization: 'Bearer {token}'
  }
})
