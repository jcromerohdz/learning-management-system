<script setup>
  import axios from 'axios'
  import { ref } from 'vue'
  import { useRoute, useRouter } from "vue-router"
  import { useUserAuth } from '@/stores/userAuth'

  import CourseItem from '../../components/CourseItem.vue'

  const useAuth = useUserAuth()
  const { removeToken } = useAuth
  const router = useRouter();

  const courses = ref([])

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

  const getActivities = async() => {
    try {
      const response = await axios.get('/api/v1/activities/get_active_courses')
      console.log(response.data)
      courses.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getActivities()

  

</script>
<template>
  <div class="about">

    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">My Account</h1>
      </div>
    </div>

    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <h2 class="subtitle is-size-3">
            Your active courses
          </h2>
        </div>
        <div 
          class="column is-4"
          v-for="course in courses"
          :key="course.id"
        >
          <CourseItem 
            :course="course"
          />
        </div>

      </div>

      <hr>

      <button @click="logout()" class="button is-danger">Log out</button>
    </section>
  </div>
</template>