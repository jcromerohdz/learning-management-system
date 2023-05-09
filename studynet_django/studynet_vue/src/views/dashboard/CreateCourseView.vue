<script setup>
import axios from 'axios'
import { ref } from "vue"

  const form = ref({
    title: '', 
    short_description: '',
    long_description: '',
    categories: []
  })
  const categories = ref([])

  const submitForm = async () => {
    console.log('SubmintForm')
    console.log('form', form)
    try {
      const response = await axios.post('http://localhost:8000/api/v1/courses/create_course/', form)
      console.log(response.data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/courses/get_categories/')
      categories.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getCategories()
</script>

<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Create Course</h1>
      </div>
    </div>

      <section class="section">
        <form action="" v-on:submit.prevent="submitForm">
          <div class="field">
            <div class="field">
              <label for="title">Title</label>
              <input class="input" type="text" v-model="form.title" />
            </div>
            <div class="field">
              <label for="shortDescription">Short Description</label>
              <textarea class="textarea" type="text" v-model="form.short_description" />
            </div>
            <div class="field">
              <label for="longDescription">Long Description</label>
              <textarea class="textarea" type="text" v-model="form.long_description" />
            </div>
            <div class="field">
              <div class="select is-multiple">
                <select multiple size="10" v-model="form.categories">
                  <option 
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.title }}
                  </option>
                </select>
              </div>
            </div>
            <button class="button is-success">
              Submit
            </button>
          </div>
        </form>

      </section>
  </div>
</template>