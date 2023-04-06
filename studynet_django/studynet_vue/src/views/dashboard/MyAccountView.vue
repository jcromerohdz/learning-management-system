<script setup>
  import axios from 'axios'
  import { useRoute, useRouter } from "vue-router"
  import { useUserAuth } from '@/stores/userAuth'

  const useAuth = useUserAuth()
  const { removeToken } = useAuth
  const router = useRouter();

  const logout = () => {
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
        <h1 class="title">Ny Account</h1>
      </div>
    </div>

    <section class="section">
      <button @click="logout()" class="button is-danger">Log out</button>
    </section>
  </div>
</template>