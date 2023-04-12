<script setup>
   import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue';
  import axios from 'axios'

  const route = useRoute()
  const course = ref([])

  const getCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/courses/${route.params.slug}`)
      course.value = response.data
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
            <h2>Table of contents</h2>

            <ul>
              <li><a href="#">Introduction</a></li>
              <li><a href="#">Get started</a></li>
              <li><a href="#">Part 1</a></li>
              <li><a href="#">Part 2</a></li>
              <li><a href="#">Summary</a></li>
            </ul>
          </div>

          <div class="column is-10">
            <p>{{ course.long_description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>