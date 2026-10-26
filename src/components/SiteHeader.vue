<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { RouterLink } from 'vue-router'
  import { setLocale, type AppLocale } from '@/i18n'

  const links = [
    { labelKey: 'common.home', to: '/' },
    { labelKey: 'common.about', to: '/about' },
    { labelKey: 'common.projects', to: '/projects' },
    { labelKey: 'common.contacts', to: '/contacts' },
  ]

  const { t, locale } = useI18n()
  const locales: { value: AppLocale; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'pl', label: 'PL' },
  ]
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <RouterLink class="brand" to="/" :aria-label="`Urban GreenTech — ${t('common.home')}`">
        <span class="brand__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M20 4c-8 0-13 3.6-13 9.1A5.9 5.9 0 0 0 13 19c5.4 0 7-7 7-15Z" />
            <path d="M4 21c2-4 5-7 10-10" />
          </svg>
        </span>
        <span>urban<span class="brand__suffix">green</span></span>
      </RouterLink>
      <nav class="site-nav" :aria-label="t('common.navigation')">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          class="site-nav__link"
          :to="link.to"
          active-class="site-nav__link--active"
          :exact-active-class="link.to === '/' ? 'site-nav__link--active' : ''"
        >
          {{ t(link.labelKey) }}
        </RouterLink>
      </nav>
      <div class="site-header__actions">
        <div class="language-switcher" role="group" aria-label="Language / Język">
          <button
            v-for="option in locales"
            :key="option.value"
            class="language-switcher__button"
            :class="{ 'language-switcher__button--active': locale === option.value }"
            type="button"
            :aria-pressed="locale === option.value"
            :aria-label="option.value === 'en' ? 'English' : 'Polski'"
            @click="setLocale(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
        <RouterLink class="button site-header__cta" to="/contacts" :aria-label="t('common.discuss')">{{ t('common.discuss') }} <span aria-hidden="true">↗</span></RouterLink>
      </div>
    </div>
  </header>
</template>
