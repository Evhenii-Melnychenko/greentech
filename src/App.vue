<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import SiteHeader from '@/components/SiteHeader.vue'
  import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
