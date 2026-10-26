<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import AnimatedHeading from '@/components/AnimatedHeading.vue'

  const { t } = useI18n()

  const values = [
    { icon: '◎', titleKey: 'about.value1Title', descriptionKey: 'about.value1Description' },
    { icon: '✳', titleKey: 'about.value2Title', descriptionKey: 'about.value2Description' },
    { icon: '↗', titleKey: 'about.value3Title', descriptionKey: 'about.value3Description' },
  ]

  const impactAreas = [
    { number: '01', titleKey: 'about.impactAirTitle', descriptionKey: 'about.impactAirDescription' },
    { number: '02', titleKey: 'about.impactEnergyTitle', descriptionKey: 'about.impactEnergyDescription' },
    { number: '03', titleKey: 'about.impactNatureTitle', descriptionKey: 'about.impactNatureDescription' },
  ]

  const milestones = [
    { year: '2018', titleKey: 'about.milestone2018Title', descriptionKey: 'about.milestone2018Description' },
    { year: '2020', titleKey: 'about.milestone2020Title', descriptionKey: 'about.milestone2020Description' },
    { year: '2022', titleKey: 'about.milestone2022Title', descriptionKey: 'about.milestone2022Description' },
    { year: '2024', titleKey: 'about.milestone2024Title', descriptionKey: 'about.milestone2024Description' },
    { year: 'today', titleKey: 'about.milestoneTodayTitle', descriptionKey: 'about.milestoneTodayDescription' },
  ]
</script>

<template>
  <div>
    <section class="section about-intro">
      <div class="container">
        <div class="section-heading">
          <span class="section-heading__eyebrow">{{ t('about.eyebrow') }}</span>
          <AnimatedHeading
            class="section-heading__title"
            tag="h1"
            :lines="[
              [{ text: t('about.titleStart') }],
              [{ text: `${t('about.titleEnd')} ` }, { text: t('about.titleAccent'), accent: true }],
            ]"
          />
          <p class="section-heading__description">{{ t('about.description') }}</p>
        </div>
        <div class="mission-grid">
          <article v-for="value in values" :key="value.titleKey" class="mission-card scroll-reveal">
            <div class="mission-card__icon" aria-hidden="true">{{ value.icon }}</div>
            <AnimatedHeading class="mission-card__title" tag="h2" :lines="[[{ text: t(value.titleKey) }]]" />
            <p class="mission-card__description">{{ t(value.descriptionKey) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--compact-top">
      <div class="container">
        <div class="section-heading">
          <span class="section-heading__eyebrow">{{ t('about.impactEyebrow') }}</span>
          <AnimatedHeading
            class="section-heading__title"
            tag="h2"
            :lines="[[{ text: t('about.impactTitle') }, { text: t('about.impactTitleAccent'), accent: true }]]"
          />
          <p class="section-heading__description">{{ t('about.impactDescription') }}</p>
        </div>
        <div class="impact-grid">
          <article v-for="area in impactAreas" :key="area.number" class="impact-card scroll-reveal">
            <span class="impact-card__number">{{ area.number }}</span>
            <AnimatedHeading class="impact-card__title" tag="h3" :lines="[[{ text: t(area.titleKey) }]]" />
            <p class="impact-card__description">{{ t(area.descriptionKey) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--compact-top">
      <div class="container">
        <div class="section-heading">
          <span class="section-heading__eyebrow">{{ t('about.journeyEyebrow') }}</span>
          <AnimatedHeading
            class="section-heading__title"
            tag="h2"
            :lines="[[
              { text: `${t('about.journeyTitle')} ` },
              { text: t('about.journeyAccent'), accent: true },
            ]]"
          />
          <p class="section-heading__description">{{ t('about.journeyDescription') }}</p>
        </div>
        <div class="timeline">
          <article v-for="milestone in milestones" :key="milestone.titleKey" class="timeline__item">
            <span class="timeline__node" aria-hidden="true"></span>
            <span class="timeline__year">{{ milestone.year === 'today' ? t('about.milestoneTodayYear') : milestone.year }}</span>
            <AnimatedHeading class="timeline__title" tag="h3" :lines="[[{ text: t(milestone.titleKey) }]]" />
            <p class="timeline__description">{{ t(milestone.descriptionKey) }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
