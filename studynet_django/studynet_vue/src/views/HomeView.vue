<script setup>
  import axios from 'axios'
  import { ref } from 'vue';
  import CourseItem from '@/components/CourseItem.vue'
  
  const courses = ref([])
  document.title = 'Welcome | StudyNet'

  const getFrontPageCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/courses/get_frontpage_courses/')
      courses.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getFrontPageCourses()

</script>

<template>
  <div>

    <div class="hero is-info is-medium">
      <div class="hero-body has-text-centered">
        <h1 class="title">Welcome to StudyNet</h1>

        <h2 class="subtitle">An online place for learning what you want</h2>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="far fa-clock"></i>
              </span>
            
              <h2 class="is-size-4 mt-4 mb-4">Study at your own pace</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam?</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="far fa-comments"></i>
              </span>
            
              <h2 class="is-size-4 mt-4 mb-4">Study with others</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam?</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="far fa-home"></i>
              </span>
            
              <h2 class="is-size-4 mt-4 mb-4">Study from your home</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam?</p>
            </div>
          </div>

          <div class="column is-12 has-text-centered">
            <a href="#" class="button is-info is-size-3 mt-6 mb-6">Click to get started</a>
          </div>

          <hr>

          <div 
            class="column is-3"
            v-for="course in courses"
            :key="course.id"
            >
            
            <CourseItem 
              :course="course"
            />

          </div>

        </div>
      </div>
    </section>
  </div>
</template>
