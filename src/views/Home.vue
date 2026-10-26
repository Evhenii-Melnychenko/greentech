<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import AnimatedHeading from '@/components/AnimatedHeading.vue'

  const metrics = [
    { value: 2.4, unitKey: 'common.energyUnit', labelKey: 'home.metricEnergy' },
    { value: 18.6, unitKey: 'common.carbonUnit', labelKey: 'home.metricCarbon' },
    { value: 42, unitKey: 'common.cityUnit', labelKey: 'home.metricCities' },
  ]
  const metricValues = ref(metrics.map(() => 0))
  const { t, locale } = useI18n()
  let metricsObserver: IntersectionObserver | undefined
  let animationFrame = 0

  function formatMetric(value: number | undefined): string {
    return new Intl.NumberFormat(locale.value, { maximumFractionDigits: 1 }).format(value ?? 0)
  }

  onMounted(() => {
    const metricsElement = document.querySelector('.metrics')
    
    if (!metricsElement || !('IntersectionObserver' in window)) {
      metricValues.value = metrics.map((metric) => metric.value)
      return
    }

    metricsObserver = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return

      metricsObserver?.disconnect()
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) {
        metricValues.value = metrics.map((metric) => metric.value)
        return
      }

      const startedAt = performance.now()
      const duration = 1400
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const easedProgress = 1 - (1 - progress) ** 3
        metricValues.value = metrics.map((metric) => Number((metric.value * easedProgress).toFixed(1)))
        if (progress < 1) animationFrame = requestAnimationFrame(animate)
      }

      animationFrame = requestAnimationFrame(animate)
    }, { threshold: 0.35 })
    metricsObserver.observe(metricsElement)
  })

  onBeforeUnmount(() => {
    metricsObserver?.disconnect()
    cancelAnimationFrame(animationFrame)
  })

  const technologies = [
    {
      number: '01',
      icon: '⌁',
      titleKey: 'home.technology1Title',
      descriptionKey: 'home.technology1Description',
    },
    {
      number: '02',
      icon: '◉',
      titleKey: 'home.technology2Title',
      descriptionKey: 'home.technology2Description',
    },
    {
      number: '03',
      icon: 'ϟ',
      titleKey: 'home.technology3Title',
      descriptionKey: 'home.technology3Description',
    },
  ]

  const citySteps = [
    'home.cityStep1',
    'home.cityStep2',
    'home.cityStep3',
    'home.cityStep4',
    'home.cityStep5',
    'home.cityStep6',
  ]
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero__grid">
        <div class="hero__content">
          <div class="hero__badge"><span class="hero__badge-dot"></span>{{ t('home.badge') }}</div>
          <p class="eyebrow hero__eyebrow">{{ t('home.eyebrow') }}</p>
          <AnimatedHeading
            class="hero__title"
            tag="h1"
            :lines="[
              [{ text: t('home.titleStart') }],
              [{ text: t('home.titleEnd'), accent: true }],
            ]"
          />
          <p class="hero__description">
            {{ t('home.description') }}
          </p>
          <div class="hero__actions">
            <RouterLink class="button" to="/projects">{{ t('common.exploreProjects') }} <span aria-hidden="true">→</span></RouterLink>
            <RouterLink class="button button--secondary" to="/about">{{ t('common.ourMission') }}</RouterLink>
          </div>
        </div>
        <div class="hero__visual" :aria-label="t('home.visualLabel')">
          <div class="orbit-system">
            <div class="orbit-system__ring orbit-system__ring--outer">
              <span class="orbit-system__track orbit-system__track--outer">
                <span class="orbit-system__node orbit-system__node--outer" aria-hidden="true">⌁</span>
              </span>
            </div>
            <div class="orbit-system__ring orbit-system__ring--middle">
              <span class="orbit-system__track orbit-system__track--middle">
                <span class="orbit-system__node orbit-system__node--middle" aria-hidden="true">ϟ</span>
              </span>
            </div>
            <div class="orbit-system__ring orbit-system__ring--inner">
              <span class="orbit-system__track orbit-system__track--inner">
                <span class="orbit-system__node orbit-system__node--inner" aria-hidden="true">◉</span>
              </span>
            </div>
            <span class="orbit-system__core" aria-hidden="true">
              <svg width="58" height="58" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M32 51V27m0 10c-1-11-8-16-20-17 1 12 7 19 20 19Zm0-8c1-10 8-15 19-16-1 11-7 17-19 18Z" />
                <path d="M14 51h36M18 51V39m9 12V34m10 17V38m9 13V34" opacity=".45" />
              </svg>
            </span>
          </div>
          <div class="hero__floating-card">
            <span class="hero__floating-label">{{ t('home.cityIndex') }}</span>
            <span class="hero__floating-value">{{ t('home.indexValue') }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="container" :aria-label="t('home.metricsLabel')">
      <div class="metrics">
        <div v-for="(metric, index) in metrics" :key="metric.labelKey" class="metric">
          <span class="metric__value">{{ formatMetric(metricValues[index]) }} <span class="metric__value-accent">{{ t(metric.unitKey) }}</span></span>
          <span class="metric__label">{{ t(metric.labelKey) }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <span class="section-heading__eyebrow">{{ t('home.technologyEyebrow') }}</span>
          <AnimatedHeading
            class="section-heading__title"
            tag="h2"
            :lines="[
              [{ text: t('home.technologyTitle') }],
              [{ text: t('home.technologyTitleAccent'), accent: true }],
            ]"
          />
          <p class="section-heading__description">{{ t('home.technologyDescription') }}</p>
        </div>
        <div class="technology-grid">
          <article v-for="technology in technologies" :key="technology.number" class="tech-card scroll-reveal">
            <div class="tech-card__icon" aria-hidden="true">{{ technology.icon }}</div>
            <span class="eyebrow tech-card__number">{{ technology.number }} / 03</span>
            <AnimatedHeading class="tech-card__title" tag="h3" :lines="[[{ text: t(technology.titleKey) }]]" />
            <p class="tech-card__description">{{ t(technology.descriptionKey) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <span class="section-heading__eyebrow">{{ t('home.processEyebrow') }}</span>
          <AnimatedHeading
            class="section-heading__title"
            tag="h2"
            :lines="[[{ text: t('home.processTitle') }, { text: t('home.processTitleAccent'), accent: true }]]"
          />
          <p class="section-heading__description">{{ t('home.processDescription') }}</p>
        </div>
        <div class="process-grid">
          <article v-for="(stepKey, index) in citySteps" :key="stepKey" class="process-card">
            <span class="process-card__number">0{{ index + 1 }}</span>
            <AnimatedHeading class="process-card__title" tag="h3" :lines="[[{ text: t(`${stepKey}Title`) }]]" />
            <p class="process-card__description">{{ t(`${stepKey}Description`) }}</p>
          </article>
        </div>
      </div>
    </section>

  </div>
</template>
