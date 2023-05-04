<script setup>
  defineProps(['youtube_id'])

</script>

<template>
  <div class="video-container">
    <iframe 
      :src="`https://www.youtube.com/embed/${youtube_id}`"
      width="100%" 
      height="400" 
      frameborder="0" 
      allow="acelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;" 
      allowfullscreen
    >


    </iframe>
  </div>

</template>