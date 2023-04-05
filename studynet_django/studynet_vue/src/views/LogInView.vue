<script setup>

  import axios from 'axios'
  import { ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { useUserAuth } from '@/stores/userAuth'


  const username = ref('')
  const password = ref('')
  const errors = ref([])

  const router = useRouter();
  const useAuth = useUserAuth()

  const { setToken } = useAuth

  const submitForm = () => {
    axios.defaults.headers.common['Authorization'] = ''
    
    localStorage.removeItem('token')

    errors.value = []

    if (username.value === ''){
      errors.value.push('The username is missing!')
    }
    if (password.value === ''){
      errors.value.push('The password is missing!')
    }

    if (!errors.value.length){
      const formData = {
        username: username.value,
        password: password.value
      }

      const registerUser = async () => {
        try {
          const response = await axios.post('/api/v1/token/login', formData)
          if (response){
            const token = response.data.auth_token
            console.log(token)
            setToken(token)

            axios.defaults.headers.common['Authorization'] = `Token ${token}`

            localStorage.setItem('token', token)

            router.push('/dashboard/my-account')
          }
        } catch (error) {
          console.log(error)
        }
      }

      registerUser()
    }
  }

</script>

<template>
  <div class="login">

    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Log In</h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <form @submit.prevent="submitForm" action="">
              <div class="field">
                <label for="email">Email</label>
                <div class="control">
                  <input type="email" class="input" v-model="username">
                </div>
              </div>
              <div class="field">
                <label for="password">Password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password">
                </div>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                <p
                  v-for="error in errors"
                  :key="error"
                  class=""
                >
                  {{ error }}
                </p>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button is-dark">Log In</button>
                </div>
              </div>
            </form>

            <hr>

            Or <router-link to="/signup">clik here </router-link> to register! 
          </div>
        </div>
      </div>
    </section>
  </div>
</template>