import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserAuth = defineStore('userauth', () => {
  const user = ref({toke: '', isAuthenticated: false})


  const initializeUser = () => {
    if (localStorage.getItem('token')) {
      user.value.token = localStorage.getItem('token')
      user.value.isAuthenticated = true
    }else{
      user.value.token = ''
      user.value.isAuthenticated = false
    }
  }

  const setToken = (token) => {
    user.value.token = token
    user.value.isAuthenticated = true
    //localStorage.setItem('token', JSON.stringify(user.value.token))
  }

  const removeToken = () => {
    user.value.token = ''
    user.value.isAuthenticated = false
  }

  return { 
    initializeUser,
    user,
  }
})