<script setup lang="ts">
const headline = 'Welcome to the Squad Up Landing Page!'
const tagline = 'Coming soon to iOS/Android.'
const purpose_h = 'Our Purpose'
const purpose_p =
  'Finding people to do the things you love shouldn’t be difficult.\nSquad Up connects you locally with people who share your interests and hobbies, making it simple to get together.'
const ctaLabel = 'Learn More'
const scrollTargetId = 'features'

function handleCtaClick() {
  document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <h1>{{ headline }}</h1>
    <p>{{ tagline }}</p>
    <h2 class="purpose-heading">{{ purpose_h }}</h2>
    <p class="purpose-body">{{ purpose_p }}</p>
    <button type="button" class="cta" @click="handleCtaClick">
      {{ ctaLabel }}
    </button>
  </section>
</template>

<style scoped>
.hero {
  padding: 2rem;
  text-align: center;
}

.purpose-heading {
  font-size: 1.5rem;
  font-weight: 600;
}

.purpose-body {
  margin: 0 auto;
  line-height: 1.5;
  white-space: pre-line;
}

.cta {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #d418d4;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}
</style>
