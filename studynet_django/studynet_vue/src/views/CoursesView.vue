<script setup>
  import { useRoute, useRouter } from "vue-router"
  import { ref } from 'vue';
  import axios from 'axios'

  import CourseItem from '@/components/CourseItem.vue'

  const courses = ref([])
  const categories = ref([])
  const activeCategory = ref(null)

  document.title = 'Courses | StudyNet'
  
  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/courses/get_categories/')
      categories.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getCategories()

  const getCourses = async () => {
    let url = 'http://localhost:8000/api/v1/courses/'

    if (activeCategory.value){
      url += '?category_id=' + activeCategory.value.id
    }

    try {
      const response = await axios.get(url)
      courses.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getCourses()

  const setActiveCategory = (category) => {
    activeCategory.value = category
    
    getCourses()
  }
 
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
                <li>
                  <a 
                    :class="{'is-active has-background-dark': !activeCategory}"
                    @click="setActiveCategory(null)"
                  >
                    All courses
                  </a>
                </li>
                <li
                  v-for="category in categories"
                  :key="category.id"
                  @click="setActiveCategory(category)"
                >
                  <a>{{ category.title }}</a>
                </li>
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
                
                <CourseItem 
                  :course="course"
                />

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

<style>
.menu-list a {
    color: #b8babb;
}
</style>