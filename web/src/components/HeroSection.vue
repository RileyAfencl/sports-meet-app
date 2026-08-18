<script setup lang="ts">
import logoUrl from '@assets/Logo_transparent.png'

const tagline = 'Coming to iOS & Android in Q4'
const purpose_h = 'Our Purpose'
const purpose_p =
  'Finding people to do the things you love shouldn’t be difficult.\nSquad Up connects you locally with people who share your interests and hobbies, making it simple to get together.'
</script>

<template>
  <section class="hero">
    <img
      class="logo"
      :src="logoUrl"
      alt="Squad Up"
    >
    <p class="tagline">{{ tagline }}</p>
    <h2 class="purpose-heading">{{ purpose_h }}</h2>
    <p class="purpose-body">{{ purpose_p }}</p>
  </section>
</template>

<style scoped>
.hero {
  padding: 2rem;
  text-align: center;
}

.logo {
  display: block;
  width: 20rem;
  margin: 0 auto 1.5rem;
}

.tagline {
  margin: 0 0 1.5rem;
  color: #fff;
  font-family: 'Coiny', system-ui, sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.2;
  -webkit-text-stroke: 1px rgb(200 245 214 / 0.3);
}

.purpose-heading {
  margin: 0;
  padding-top: 2rem;
  color: #fff;
  font-family: 'Coiny', system-ui, sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.2;
  -webkit-text-stroke: 1px rgb(200 245 214 / 0.3);
}

.purpose-body {
  margin: 0 auto;
  color: #fff;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.5;
  white-space: pre-line;
  -webkit-text-stroke: 0.1px rgb(0 0 0 / 0.5);
}
</style>
