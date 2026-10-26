<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <RouterLink class="brand" to="/">
        <span class="brand__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M20 4c-8 0-13 3.6-13 9.1A5.9 5.9 0 0 0 13 19c5.4 0 7-7 7-15Z" />
            <path d="M4 21c2-4 5-7 10-10" />
          </svg>
        </span>
        <span>urban<span class="brand__suffix">green</span></span>
      </RouterLink>
      <p class="site-footer__note">&copy; {{ currentYear }} {{ t('footer.note') }}</p>
    </div>
  </footer>
</template>
