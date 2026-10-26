<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { RouterLink } from 'vue-router'
  import { projectFilters, useProjectsStore } from '@/stores/projects'
  import AnimatedHeading from '@/components/AnimatedHeading.vue'

  const projectsStore = useProjectsStore()
  const { activeFilter, filteredProjects } = storeToRefs(projectsStore)
  const { t } = useI18n()
</script>

<template>
  <section class="section projects-section">
    <div class="container">
      <div class="section-heading">
        <span class="section-heading__eyebrow">{{ t('projects.eyebrow') }}</span>
        <AnimatedHeading
          class="section-heading__title"
          tag="h1"
          :lines="[
            [{ text: t('projects.titleStart') }],
            [{ text: t('projects.titleAccent'), accent: true }],
          ]"
        />
        <p class="section-heading__description">{{ t('projects.description') }}</p>
      </div>

      <div class="project-filters" role="group" :aria-label="t('projects.filterLabel')">
        <button
          v-for="filter in projectFilters"
          :key="filter.value"
          class="project-filters__button"
          :class="{ 'project-filters__button--active': activeFilter === filter.value }"
          type="button"
          :aria-pressed="activeFilter === filter.value"
          @click="projectsStore.setFilter(filter.value)"
        >
          {{ t(`common.${filter.labelKey}`) }}
        </button>
      </div>

      <div class="projects-grid" aria-live="polite">
        <article v-for="project in filteredProjects" :key="project.id" class="project-card scroll-reveal">
          <div class="project-card__art" aria-hidden="true">
            <svg v-if="project.icon === 'tree' || project.icon === 'leaf'" class="project-card__art-icon" width="66" height="66" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M32 54V28m0 12c-1-12-8-17-21-18 1 13 8 20 21 20Zm0-9c1-11 8-16 20-17-1 12-7 18-20 19Z" />
              <path d="M14 54h36" />
            </svg>
            <svg v-else-if="project.icon === 'solar' || project.icon === 'energy'" class="project-card__art-icon" width="66" height="66" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="m35 7-21 29h15l-3 21 24-32H34l1-18Z" />
            </svg>
            <svg v-else-if="project.icon === 'water'" class="project-card__art-icon" width="66" height="66" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M32 8S17 27 17 38a15 15 0 0 0 30 0C47 27 32 8 32 8Z" />
              <path d="M25 40c0 4 3 7 7 7" />
            </svg>
            <svg v-else class="project-card__art-icon" width="66" height="66" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="32" cy="32" r="5" />
              <path d="M32 14v8m0 20v8M14 32h8m20 0h8M19.3 19.3l5.7 5.7m14 14 5.7 5.7m0-25.4L39 25m-14 14-5.7 5.7" />
              <circle cx="32" cy="32" r="19" opacity=".35" />
            </svg>
          </div>
          <div class="project-card__body">
            <span class="project-card__category">{{ t(`projects.${project.categoryKey}`) }}</span>
            <AnimatedHeading class="project-card__title" tag="h2" :lines="[[{ text: t(`projects.${project.titleKey}`) }]]" />
            <p class="project-card__description">{{ t(`projects.${project.descriptionKey}`) }}</p>
            <span class="project-card__result">{{ t(`projects.${project.resultKey}`) }}</span>
          </div>
        </article>
      </div>

      <section class="project-approach section">
        <div class="section-heading">
          <span class="section-heading__eyebrow">{{ t('projects.approachEyebrow') }}</span>
          <AnimatedHeading
            class="section-heading__title"
            tag="h2"
            :lines="[[{ text: t('projects.approachTitle') }, { text: t('projects.approachTitleAccent'), accent: true }]]"
          />
          <p class="section-heading__description">{{ t('projects.approachDescription') }}</p>
        </div>
        <div class="approach-grid">
          <article
            v-for="step in 3"
            :key="step"
            class="approach-card card-reveal"
            :style="{ '--card-reveal-delay': `${(step - 1) * 180}ms` }"
          >
            <span class="approach-card__number">0{{ step }}</span>
            <AnimatedHeading class="approach-card__title" tag="h3" :lines="[[{ text: t(`projects.approach${step}Title`) }]]" />
            <p class="approach-card__description">{{ t(`projects.approach${step}Description`) }}</p>
          </article>
        </div>
        <div class="project-approach__cta">
          <p class="project-approach__note">{{ t('projects.approachCtaNote') }}</p>
          <RouterLink class="button" to="/contacts">{{ t('common.contactUs') }} <span aria-hidden="true">→</span></RouterLink>
        </div>
      </section>
    </div>
  </section>
</template>
