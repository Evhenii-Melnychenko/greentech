<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import AnimatedHeading from '@/components/AnimatedHeading.vue'

  interface ContactForm {
    name: string
    email: string
    message: string
  }

  type FormField = keyof ContactForm
  type FormErrorKey =
    | 'contacts.nameRequired'
    | 'contacts.emailRequired'
    | 'contacts.emailInvalid'
    | 'contacts.messageRequired'
    | 'contacts.messageTooShort'
  type FormErrors = Partial<Record<FormField, FormErrorKey>>

  const { t } = useI18n()
  const form = reactive<ContactForm>({ name: '', email: '', message: '' })
  const errors = ref<FormErrors>({})
  const submitState = ref<'invalid' | 'success' | null>(null)
  const submitted = ref(false)
  const statusMessage = computed(() => {
    if (!submitState.value) return ''
    return t(submitState.value === 'invalid' ? 'contacts.validationSummary' : 'contacts.success')
  })

  function validateForm(values: ContactForm): FormErrors {
    const nextErrors: FormErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'contacts.nameRequired'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'contacts.emailRequired'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'contacts.emailInvalid'
    }

    if (!values.message.trim()) {
      nextErrors.message = 'contacts.messageRequired'
    } else if (values.message.trim().length < 10) {
      nextErrors.message = 'contacts.messageTooShort'
    }

    return nextErrors
  }

  function handleSubmit(): void {
    errors.value = validateForm(form)
    submitted.value = true

    if (Object.keys(errors.value).length > 0) {
      submitState.value = 'invalid'
      return
    }

    submitState.value = 'success'
  }
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <span class="section-heading__eyebrow">{{ t('contacts.eyebrow') }}</span>
        <AnimatedHeading
          class="section-heading__title"
          tag="h1"
          :lines="[
            [{ text: t('contacts.titleStart') }],
            [{ text: t('contacts.titleAccent'), accent: true }],
          ]"
        />
        <p class="section-heading__description">{{ t('contacts.description') }}</p>
      </div>

      <div class="contact-layout">
        <div class="contact-info">
          <article class="contact-card">
            <span class="contact-card__icon" aria-hidden="true">⌖</span>
            <div><span class="contact-card__label">{{ t('contacts.officeLabel') }}</span><span class="contact-card__value">{{ t('contacts.officeAddress') }}<br />{{ t('contacts.officeBuilding') }}</span></div>
          </article>
          <article class="contact-card">
            <span class="contact-card__icon" aria-hidden="true">✉</span>
            <div><span class="contact-card__label">{{ t('contacts.emailLabel') }}</span><a class="contact-card__value" href="mailto:hello@urbangreen.tech">hello@urbangreen.tech</a></div>
          </article>
          <article class="contact-card">
            <span class="contact-card__icon" aria-hidden="true">↗</span>
            <div><span class="contact-card__label">{{ t('contacts.phoneLabel') }}</span><a class="contact-card__value" href="tel:+48123456789">+48 12 345 67 89</a></div>
          </article>
          <figure class="location-card">
            <iframe
              class="location-card__map"
              :title="t('contacts.locationMapTitle')"
              src="https://www.openstreetmap.org/export/embed.html?bbox=19.9250%2C50.0620%2C19.9510%2C50.0780&amp;layer=mapnik&amp;marker=50.0702%2C19.9360"
              loading="lazy"
              referrerpolicy="no-referrer"
            ></iframe>
            <figcaption class="location-card__label">{{ t('contacts.locationLabel') }}</figcaption>
          </figure>
        </div>

        <form class="contact-form" novalidate @submit.prevent="handleSubmit">
          <AnimatedHeading class="contact-form__title" tag="h2" :lines="[[{ text: t('contacts.formTitle') }]]" />
          <p class="contact-form__hint">{{ t('contacts.formHint') }}</p>

          <div class="form-field">
            <label class="form-field__label" for="contact-name">{{ t('contacts.nameLabel') }}</label>
            <input id="contact-name" v-model="form.name" class="form-field__control" :class="{ 'form-field__control--invalid': errors.name }" type="text" name="name" autocomplete="name" :placeholder="t('contacts.namePlaceholder')" :aria-invalid="Boolean(errors.name)" :aria-describedby="errors.name ? 'contact-name-error' : undefined" />
            <span v-if="errors.name" id="contact-name-error" class="form-field__error">{{ t(errors.name) }}</span>
          </div>

          <div class="form-field">
            <label class="form-field__label" for="contact-email">{{ t('contacts.emailFieldLabel') }}</label>
            <input id="contact-email" v-model="form.email" class="form-field__control" :class="{ 'form-field__control--invalid': errors.email }" type="email" name="email" autocomplete="email" :placeholder="t('contacts.emailPlaceholder')" :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'contact-email-error' : undefined" />
            <span v-if="errors.email" id="contact-email-error" class="form-field__error">{{ t(errors.email) }}</span>
          </div>

          <div class="form-field">
            <label class="form-field__label" for="contact-message">{{ t('contacts.messageLabel') }}</label>
            <textarea id="contact-message" v-model="form.message" class="form-field__control form-field__textarea" :class="{ 'form-field__control--invalid': errors.message }" name="message" :placeholder="t('contacts.messagePlaceholder')" :aria-invalid="Boolean(errors.message)" :aria-describedby="errors.message ? 'contact-message-error' : undefined"></textarea>
            <span v-if="errors.message" id="contact-message-error" class="form-field__error">{{ t(errors.message) }}</span>
          </div>

          <button class="button contact-form__submit" type="submit">{{ t('contacts.submit') }} <span aria-hidden="true">→</span></button>
          <p v-if="submitted" class="contact-form__status" :class="{ 'contact-form__status--error': Object.keys(errors).length > 0 }" role="status" aria-live="polite">
            {{ statusMessage }}
          </p>
        </form>
      </div>

      <section class="contact-next-steps">
        <div class="section-heading">
          <span class="section-heading__eyebrow">{{ t('contacts.nextEyebrow') }}</span>
          <AnimatedHeading
            class="section-heading__title"
            tag="h2"
            :lines="[[{ text: t('contacts.nextTitle') }, { text: t('contacts.nextTitleAccent'), accent: true }]]"
          />
          <p class="section-heading__description">{{ t('contacts.nextDescription') }}</p>
        </div>
        <div class="contact-steps">
          <article v-for="step in 3" :key="step" class="contact-step scroll-reveal">
            <span class="contact-step__number">0{{ step }}</span>
            <AnimatedHeading class="contact-step__title" tag="h3" :lines="[[{ text: t(`contacts.step${step}Title`) }]]" />
            <p class="contact-step__description">{{ t(`contacts.step${step}Description`) }}</p>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>
