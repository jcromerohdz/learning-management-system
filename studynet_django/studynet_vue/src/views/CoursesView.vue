<script setup>
  import { useRoute, useRouter } from "vue-router"
  import { ref } from 'vue';
  import axios from 'axios'

  const courses = ref([])

  const getCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/courses')
      courses.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getCourses()
 
</script>
<template>
  <div class="courses">

    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Courses</h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <aside class="menu">
              <p class="menu-label">Categories</p>

              <ul class="menu-list">
                <li><a href="#" class="is-active has-background-dark">All courses</a></li>
                <li><a href="#">Programming</a></li>
                <li><a href="#">Design</a></li>
                <li><a href="#">UX</a></li>
              </ul>
            </aside>
          </div>

          <div class="column is-10">
            <div class="columns is-multiline">

              <div 
                class="column is-4"
                v-for="course in courses"
                :key="course.id"
                >
                <div class="card">
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img src="https://placehold.co/1280x960" alt="Placeholder Image">
                    </figure>
                  </div>

                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="is-sizes-5">{{ course.title }}</p>
                      </div>
                    </div>

                    <div class="content">
                      <p>{{ course.short_description }}</p>

                      <router-link :to="{name: 'course', params: {slug: course.slug}}">More Info...</router-link>
                    </div>
                  </div>
                </div>
              </div>
 
            </div>

            <div class="column is-12">
              <nav class="pagination">
                <a href="#" class="pagination-previous">Previous</a>
                <a href="#" class="pagination-next">Next</a>
                <ul class="pagination-list">
                  <li>
                    <a href="#" class="pagination-link is-current has-background-dark">1</a>
                  </li>
                  <li>
                    <a href="#" class="pagination-link">2</a>
                  </li>
                  <li>
                    <a href="#" class="pagination-link">3</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>