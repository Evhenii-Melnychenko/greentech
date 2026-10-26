<script setup lang="ts">
  import { computed } from 'vue'

  interface HeadingSegment {
    text: string
    accent?: boolean
  }

  const props = defineProps<{
    tag: 'h1' | 'h2' | 'h3'
    lines: readonly (readonly HeadingSegment[])[]
  }>()

  const charactersPerSecond = 36
  const typedLines = computed(() => {
    let characterIndex = 0

    return props.lines.map((line) =>
      line.map((segment) => ({
        accent: segment.accent ?? false,
        characters: Array.from(segment.text).map((character) => ({
          character,
          delay: (characterIndex++ * 1000) / charactersPerSecond,
        })),
      })),
    )
  })

  const accessibleText = computed(() =>
    props.lines.map((line) => line.map((segment) => segment.text).join('')).join(' '),
  )
  
  const cursorDelay = computed(() => {
    const characterCount = props.lines.reduce(
      (total, line) => total + line.reduce((lineTotal, segment) => lineTotal + Array.from(segment.text).length, 0),
      0,
    )

    return `${(characterCount * 1000) / charactersPerSecond}ms`
  })
</script>

<template>
  <component :is="tag" class="animated-heading" :aria-label="accessibleText">
    <span class="animated-heading__visual" aria-hidden="true">
      <span v-for="(line, lineIndex) in typedLines" :key="lineIndex" class="animated-heading__line">
        <span
          v-for="(segment, segmentIndex) in line"
          :key="segmentIndex"
          class="animated-heading__segment"
          :class="{ 'animated-heading__segment--accent': segment.accent }"
        >
          <span
            v-for="(character, characterIndex) in segment.characters"
            :key="characterIndex"
            class="animated-heading__character"
            :style="{ animationDelay: `${character.delay}ms` }"
          >{{ character.character }}</span>
        </span>
        <span v-if="lineIndex === typedLines.length - 1" class="animated-heading__cursor" :style="{ animationDelay: cursorDelay }">|</span>
      </span>
    </span>
  </component>
</template>
