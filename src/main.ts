import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { watch } from 'vue'
import App from './App.vue'
import { i18n, type AppLocale } from './i18n'
import router from './router'

type PageTitleKey = 'home' | 'about' | 'projects' | 'contacts'

const pageTitles: Record<AppLocale, Record<PageTitleKey, string>> = {
  en: {
    home: 'Home',
    about: 'About us',
    projects: 'Projects',
    contacts: 'Contact',
  },
  pl: {
    home: 'Start',
    about: 'O nas',
    projects: 'Projekty',
    contacts: 'Kontakt',
  },
}

watch(
  [
    () => router.currentRoute.value.meta.titleKey,
    () => i18n.global.locale.value,
  ],
  ([titleKey, locale]) => {
    document.documentElement.lang = locale
    const currentTitleKey = titleKey ?? 'home'
    document.title = `${pageTitles[locale][currentTitleKey]} | Urban GreenTech`
  },
  { immediate: true },
)

createApp(App).use(createPinia()).use(i18n).use(router).mount('#app')
