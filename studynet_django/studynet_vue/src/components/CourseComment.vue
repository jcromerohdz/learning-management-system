<script setup>
  defineProps(['comment'])
</script>

<template>
  <div>
    <article class="media box">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ comment.name }}</strong> {{ comment.created_at }}<br>
            {{ comment.content }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>