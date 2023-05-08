<script setup>
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia'
  import { useUserAuth } from '@/stores/userAuth'

  import CourseComment from "../components/CourseComment.vue"
  import AddComment from "../components/AddComment.vue"
  import Quiz from "../components/Quiz.vue"
  import Video from "../components/Video.vue"
  
  const route = useRoute()
  const userAuth = useUserAuth()
  
  const course = ref({})
  const lessons = ref([])
  const activeLesson = ref(null)
  const comments = ref([])
  const errors = ref([])
  const quiz = ref({})
  const selectedAnswer = ref('')
  const quizResult = ref(null)
  const activity = ref({})
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

  const submitComment = (comment) => {
    console.log('submit Comment on CourseView.vue')
    comments.value.push(comment)
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

  const trackStarted = async() => {
    try {
      if(course && activeLesson){
        console.log('trackStarted', course.value.slug)
        const courseSlug = course.value.slug
        const activeLessonSlug = activeLesson.value.slug
        const response = await axios.post(`http://localhost:8000/api/v1/activities/track_started/${courseSlug}/${activeLessonSlug}/`)
        if(response){
          console.log(response.data)
          activity.value = response.data
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const markAsDone = async() => {
    try {
      if(course && activeLesson){
        console.log('markAsDone', course.value.slug)
        const courseSlug = course.value.slug
        const activeLessonSlug = activeLesson.value.slug
        const response = await axios.post(`http://localhost:8000/api/v1/activities/mark_as_done/${courseSlug}/${activeLessonSlug}/`)
        if(response){
          console.log(response.data)
          activity.value = response.data
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

    trackStarted()
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

                <span 
                  class="tag is-warning" 
                  v-if="activity.status == 'started'"
                  @click="markAsDone"
                >
                  Started (mark as done)
                </span>
                <span class="tag is-success" v-else>Done</span>

                <hr>

                {{ activeLesson.long_description }}

                <hr>

                <template v-if="activeLesson.lesson_type == 'quiz'">
                  <Quiz 
                    :quiz="quiz"
                  />
                </template>

                <template v-if="activeLesson.lesson_type == 'video'">
                  <Video 
                    :youtube_id="activeLesson.youtube_id"
                  />
                </template>

                <template v-if="activeLesson.lesson_type=='article'">
                  <h3>Comments</h3>
                  <CourseComment
                    v-for="comment in comments"
                    :key="comment.id"
                    :comment="comment"
                  />

                  <AddComment 
                    :course="course"
                    :activeLesson="activeLesson"
                    @submitComment="submitComment"
                  />
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