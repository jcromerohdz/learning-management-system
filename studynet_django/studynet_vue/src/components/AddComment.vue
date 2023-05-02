<script setup>
  import axios from 'axios'
  import { ref } from 'vue'
  
  const props = defineProps(['course', 'activeLesson'])
  const emit = defineEmits(['submitComment'])
  
  const comment = {
    name:'',
    content:''
  }
  const errors = ref([])
  const course = props.course 
  const activeLesson = props.activeLesson 


  const submitComment = async () => {
    console.log('submit Comment on AddComment.vue')

    errors.value = []

    if(comment.name == ''){
      errors.value.push('The name must be filled out')
    }
    if(comment.content == ''){
      errors.value.push('The content must be filled out')
    }

    if(!errors.value.length){
      try {
        if(course && activeLesson){
          const courseSlug = course.slug
          const activeLessonSlug = activeLesson.slug
          const response = await axios.post(`http://localhost:8000/api/v1/courses/${courseSlug}/${activeLessonSlug}/`, comment)
          if(response){
            comment.name = ''
            comment.content = ''

            // comments.value.push(response.data)
            emit('submitComment', response.data)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  
</script>
<template>
  <form v-on:submit.prevent="submitComment()">
    <div class="field">
      <label for="" class="label">Name</label>
      <div class="control">
        <input type="text" class="input" v-model="comment.name">
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Content</label>
      <div class="control">
        <textarea class="textarea" v-model="comment.content">
        </textarea>
      </div>
    </div>

    <div 
      class="notification is-danger"
      v-for="error in errors"
      :key="error"
    >
      {{ error }}
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-link">
          Submit
        </button>
      </div>
    </div>
  </form>
</template>