<script setup>
  import { ref } from "vue"

  const props = defineProps(['quiz'])

  const selectedAnswer = ref('')
  const quizResult = ref(null)


  const submitQuiz = () => {
    console.log('Submit Quiz')
    quizResult.value = null

    if(selectedAnswer){

      if(selectedAnswer.value == props.quiz.answer){
        quizResult.value = 'correct'
      } else {
        quizResult.value = 'incorrect'
      }
    }else{
      alert('Select answer first')
    }
  }

</script>

<template>
  <div>
    <h3>{{ props.quiz.question }}</h3>
    <div class="control">
      <label class="radio">
        <input type="radio" :value="props.quiz.op1" v-model="selectedAnswer"> {{ props.quiz.op1 }}
      </label>
    </div>
    <div class="control">
      <label class="radio">
        <input type="radio" :value="props.quiz.op2" v-model="selectedAnswer"> {{ props.quiz.op2 }}
      </label>
    </div>
    <div class="control">
      <label class="radio">
        <input type="radio" :value="props.quiz.op3" v-model="selectedAnswer"> {{ props.quiz.op3 }}
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
  </div>
</template>