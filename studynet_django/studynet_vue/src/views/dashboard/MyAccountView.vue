<script setup>
  import axios from 'axios'
  import { useRoute, useRouter } from "vue-router"
  import { useUserAuth } from '@/stores/userAuth'

  const useAuth = useUserAuth()
  const { removeToken } = useAuth
  const router = useRouter();

    document.title = 'My Account | StudyNet'

  const logout = async () => {
    try {
      const response = await axios.post('/api/v1/token/logout/')
      if(response){
        console.log('Logged out')
      }
    } catch (error) {
      console.log(error)
    }

    axios.defaults.headers.common['Authorization'] = ""
    localStorage.removeItem('token')
    removeToken()
    router.push('/')
  }

</script>
<template>
  <div class="about">

    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">My Account</h1>
      </div>
    </div>

    <section class="section">
      <button @click="logout()" class="button is-danger">Log out</button>
    </section>
  </div>
</template>