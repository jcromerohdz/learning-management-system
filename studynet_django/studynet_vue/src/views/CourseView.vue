<script setup>
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUserAuth } from '@/stores/userAuth'

  const route = useRoute()
  const userAuth = useUserAuth()
  
  const course = ref({})
  const lessons = ref([])
  const activeLesson = ref(null)
  const { user } = storeToRefs(userAuth)

  const getCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/courses/${route.params.slug}`)
      course.value = response.data.course
      lessons.value = response.data.lessons
    } catch (error) {
      console.log(error)
    }
  }

  getCourse()
</script>

<template>
  <div class="courses">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">{{ course.title }}</h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns content">
          <div class="column is-2">
            <aside class="menu">
              <p class="menu-label">Course Lessons</p>
              <ul class="menu-list" >
                <li 
                  v-for="lesson in lessons"
                  :key="lesson.id"
                >
                  <a @click="activeLesson = lesson">{{ lesson.title }}</a>
                </li>
              </ul>
            </aside>
          </div>

          <div class="column is-10">
            <template v-if="user.isAuthenticated">
              <template v-if="activeLesson">
                <h2>{{ activeLesson.title }}</h2>
                {{ activeLesson.long_description }}
              </template>
              <template v-else>
                <p>{{ course.long_description }}</p>
              </template>
            </template>
            <template v-else>
              <h2>Restricted access</h2>
              <p>You need to have an account to continue!</p>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>