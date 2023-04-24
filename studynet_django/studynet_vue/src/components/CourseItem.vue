<script setup>
  defineProps(['course'])
</script>

<template>
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
</template>