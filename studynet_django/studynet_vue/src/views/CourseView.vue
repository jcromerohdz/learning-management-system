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
  const comment = {
    name:'',
    content:''
  }
  const comments = ref([])
  const errors = ref([])
  const quiz = ref({})
  const selectedAnswer = ref('')
  const quizResult = ref(null)
  const { user } = storeToRefs(userAuth)

  const submitQuiz = () => {
    console.log('Submit Quiz')
    quizResult.value = null

    if(selectedAnswer){

      console.log('Selected Answer')
      console.log('Selected Answer', selectedAnswer.value)
      console.log('quiz', quiz.value.answer)
      if(selectedAnswer.value == quiz.value.answer){
        console.log('Correct')
        quizResult.value = 'correct'
      } else {
        console.log('Incorrect')
        quizResult.value = 'incorrect'
      }
    }else{
      alert('Select answer first')
    }
  }

  const submitComment = async () => {
    console.log('submitComment02')

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
          const courseSlug = course.value.slug
          const activeLessonSlug = activeLesson.value.slug
          const response = await axios.post(`http://localhost:8000/api/v1/courses/${courseSlug}/${activeLessonSlug}/`, comment)
          if(response){
            comment.name = ''
            comment.content = ''

            comments.value.push(response.data)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getComments = async () => {
    try {
      if(course && activeLesson){
        const courseSlug = course.value.slug
        const activeLessonSlug = activeLesson.value.slug
        const response = await axios.get(`http://localhost:8000/api/v1/courses/${courseSlug}/${activeLessonSlug}/get-comments/`)
        if(response){
          console.log(response.data)
          comments.value = response.data
        }
      }
    } catch (error) {
      console.log(error)
    }

  }

  const getQuiz =  async () => {
    try {
      if(course && activeLesson){
        console.log('hola', course.value.slug)
        const courseSlug = course.value.slug
        const activeLessonSlug = activeLesson.value.slug
        const response = await axios.get(`http://localhost:8000/api/v1/courses/${courseSlug}/${activeLessonSlug}/get-quiz/`)
        if(response){
          console.log(response.data)
          quiz.value = response.data
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  const setActiveLesson = (lesson) => {
    activeLesson.value = lesson
    console.log(lesson)

    if(lesson.lesson_type == 'quiz'){
      getQuiz()
    }else {
      getComments()
    }
  }

  const getCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/courses/${route.params.slug}`)
      course.value = response.data.course
      lessons.value = response.data.lessons
      console.log('response getCourse', response.data)
      document.title = `${course.value.title} | StudyNet`
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
                  <a @click="setActiveLesson(lesson)">{{ lesson.title }}</a>
                </li>
              </ul>
            </aside>
          </div>

          <div class="column is-10">
            <template v-if="user.isAuthenticated">
              <template v-if="activeLesson">
                <h2>{{ activeLesson.title }}</h2>
                {{ activeLesson.long_description }}

                <hr>

                <template v-if="activeLesson.lesson_type == 'quiz'">
                  <h3>{{ quiz.question }}</h3>
                  <div class="control">
                    <label class="radio">
                      <input type="radio" :value="quiz.op1" v-model="selectedAnswer"> {{ quiz.op1 }}
                    </label>
                  </div>
                  <div class="control">
                    <label class="radio">
                      <input type="radio" :value="quiz.op2" v-model="selectedAnswer"> {{ quiz.op2 }}
                    </label>
                  </div>
                  <div class="control">
                    <label class="radio">
                      <input type="radio" :value="quiz.op3" v-model="selectedAnswer"> {{ quiz.op3 }}
                    </label>
                  </div>
                  <div class="control mt-4">
                    <button class="button is-info" @click="submitQuiz">Submit</button>
                  </div>

                  <template v-if="quizResult == 'correct'">
                    <div class="notification is-success mt-4">Correct 😃</div>
                  </template>

                  <template v-if="quizResult == 'incorrect'">
                    <div class="notification is-danger mt-4">Wrong 🙃 please try again!</div>
                  </template>
                </template>

                <template v-if="activeLesson.lesson_type=='article'">
                  <h3>comments</h3>
                  <article 
                    v-for="comment in comments"
                    :key="comment.id"
                    class="media box"
                  >
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{{ comment.name }}</strong> {{ comment.created_at }}<br>
                          {{ comment.content }}
                        </p>
                      </div>
                    </div>
                  </article>

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
<style>
  .menu_list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>