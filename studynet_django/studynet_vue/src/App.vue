<script setup>
import axios from 'axios'

import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

import { useUserAuth } from '@/stores/userAuth'

const useAuth = useUserAuth()

const { user } = storeToRefs(useAuth)
const { initializeUser } = useAuth

initializeUser()

const token = user

if (token) {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`
} else {
  axios.defaults.headers.common['Authorization'] = ''
}

</script>

<template>
  <div>

    <header>
      <div class="wrapper">
        <NavBar />
      </div>
    </header>

    <RouterView />

    
    <Footer />
  </div>
</template>

