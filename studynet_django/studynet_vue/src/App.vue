<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div>

    <header>
      <div class="wrapper">
        <NavBar />
      </div>
    </header>

    <RouterView />

    
    <Footer />
  </div>
</template>

