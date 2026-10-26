# Urban GreenTech

An adaptive SPA showcasing digital solutions for greener, more comfortable cities. The interface is available in English and Polish. Use the language switcher in the header to change languages; the selected language is saved in `localStorage` and restored on your next visit.

## Features

- Home page with interactive environmental impact counters and technology cards.
- An orbital visualization of an urban ecosystem, with rotating satellites and a green core.
- An additional home page section outlining the path from city monitoring to measurable improvements.
- About page featuring the team’s mission, impact areas, and a vertical timeline.
- A catalog of urban projects with Pinia-powered category filtering and an overview of implementation stages.
- Contact form with required-field, email, and minimum message-length validation, plus an overview of collaboration stages. Validation errors and interface text are localized.
- Urban GreenTech office in Kraków, with a Polish address and phone number.
- Typewriter effect for page, section, and card headings.
- Scroll-animated timeline: the line fills and nodes appear as they enter the viewport.
- Scroll-driven CSS animations using `animation-timeline: view()`, fallbacks for unsupported browsers, and `prefers-reduced-motion` support.
- Responsive dark theme and BEM class naming.

## Tech stack

- Vue 3 Composition API (`<script setup>`) and TypeScript.
- Vue Router for page navigation.
- Pinia for project filter state.
- Vue I18n for English (`en`) and Polish (`pl`) locales.
- Vite, CSS custom properties, and CSS animations.
- The browser tab title updates automatically when navigating between pages or changing the language.

## Project structure

```text
src/
├── assets/
│   ├── base.css            # Theme variables and base styles
│   ├── main.css            # Entry point with a stable CSS import order
│   └── styles/
│       ├── foundation.css  # Shared layout, typography, and base effects
│       ├── site-shell.css  # Header, navigation, and footer
│       ├── home.css        # Home page, orbital visualization, and metrics
│       ├── about.css       # Mission and animated timeline
│       ├── shared-cards.css # Shared technology cards and process steps
│       ├── projects.css    # Project filters and cards
│       ├── contacts.css    # Contact information, map, and form
│       ├── cta.css         # Shared call to action
│       └── responsive.css  # Responsive rules and scroll-animation fallbacks
├── components/
│   ├── AnimatedHeading.vue # Reusable typewriter heading
│   ├── SiteHeader.vue      # Navigation and language switcher
│   └── SiteFooter.vue      # Shared footer
├── i18n/
│   └── index.ts            # EN/PL translations and locale persistence
├── router/
│   └── index.ts            # Routes and page title keys
├── stores/
│   └── projects.ts         # Pinia project data and filters
├── types/
│   └── project.ts          # Project types
├── views/
│   ├── Home.vue            # Home page, orbital visualization, metrics, and process
│   ├── About.vue           # Mission, impact areas, and timeline
│   ├── Projects.vue        # Project catalog, filters, and implementation process
│   └── Contacts.vue        # Contact details, validation, and collaboration steps
├── App.vue
└── main.ts                 # Pinia, I18n, and Router setup
```

Styles are organized by shared elements and pages. `src/assets/main.css` imports them in their original order to preserve the cascade and application behavior; BEM classes and CSS rule values were not changed during the split.

## Localization

Interface strings are defined in the `en` and `pl` dictionaries in `src/i18n/index.ts`. To add a translation, add the same key to both dictionaries, then access it with `t('section.key')` via `useI18n()` in a component. Supported locales are restricted by the `AppLocale` type.

Tab titles for `/`, `/about`, `/projects`, and `/contacts` are defined separately for English and Polish in `src/main.ts`. Each route’s title key is specified in its `meta.titleKey` property in `src/router/index.ts`. When adding a page, add its key and translations for both locales to `pageTitles`.

In Vue I18n messages, the `@` character has special meaning. Escape it in email examples as `{'@'}`, for example: `"name{'@'}example.com"`.

## Getting started

Use the Node.js version specified in the `engines` field of `package.json`.

```sh
npm install
npm run dev
```

Run the TypeScript check and create a production build:

```sh
npm run build
```

The contact form currently validates data on the client and displays a localized status. To actually submit enquiries, connect your backend or CRM API in the `handleSubmit` function in `src/views/Contacts.vue`.
