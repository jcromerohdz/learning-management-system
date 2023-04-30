<script setup>
  import { ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import axios from 'axios'

  const username = ref('')
  const password = ref('')
  const password2 = ref('')
  const errors = ref([])


  document.title = 'Sign up | StudyNet'

  const router = useRouter();

  const submitForm = () => {
    errors.value = []

    if (username.value === ''){
      errors.value.push('The username is missing!')
    }
    if (password.value === ''){
      errors.value.push('The password is missing!')
    }
    if (password.value !== password2.value){
      errors.value.push('The passwords are not matching!')
    }
    if (!errors.value.length){
      const formData = {
        username: username.value,
        password: password.value
      }
      const registerUser = async () => {
        try {
          const response = await axios.post('/api/v1/users/', formData)
          if (response){
            console.log(response)
            router.push('/login')
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
  <div class="signup">

    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Sign Up</h1>
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
              <div class="field">
                <label for="password2">Repeat Password</label>
                <div class="control">
                  <input type="password" class="input" v-model="password2">
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
                  <button class="button is-dark">Sign Up</button>
                </div>
              </div>
            </form>


            <hr>

            Or <router-link to="/login">clik here </router-link> to log in! 
          </div>
        </div>
      </div>
    </section>
  </div>
</template>