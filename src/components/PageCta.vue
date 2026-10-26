<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const route = useRoute()
  const { t } = useI18n()

  const pageKey = computed(() => {
    if (route.path === '/about') return 'about'
    if (route.path === '/projects') return 'projects'
    if (route.path === '/contacts') return 'contacts'
    return 'home'
  })

  const linkTarget = computed(() => (pageKey.value === 'contacts' ? '/projects' : '/contacts'))
</script>

<template>
  <section class="container section section--compact-top">
    <div class="page-cta scroll-reveal">
      <div>
        <h2 class="page-cta__title">{{ t(`pageCta.${pageKey}.title`) }}</h2>
        <p class="page-cta__description">{{ t(`pageCta.${pageKey}.description`) }}</p>
      </div>
      <RouterLink class="button" :to="linkTarget">
        {{ t(`pageCta.${pageKey}.button`) }} <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>
</template>
