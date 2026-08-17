<script setup lang="ts">
import { computed, ref } from 'vue'

const heading = 'How it works'

const slides = [
  {
    title: 'Create a Profile!',
    body: 'Tell everyone your hobbies, and a little bit about yourself.',
  },
  {
    title: 'Discover people who share your passion.',
    body: 'Tailor your search criteria to find the perfect partner for an activity!',
  },
  {
    title: 'Browse or create a posting.',
    body: 'Search for active upcoming events posted by other users, or create one yourself!',
  },
  {
    title: 'Connect and squad up!',
    body: 'Message, coordinate, and meet up for the activity.',
  },
]

const activeIndex = ref(0)

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIndex.value * 100}%)`,
}))

function showPreviousSlide() {
  if (activeIndex.value > 0) {
    activeIndex.value -= 1
  }
}

function showNextSlide() {
  if (activeIndex.value < slides.length - 1) {
    activeIndex.value += 1
  }
}
</script>

<template>
  <section id="features" class="features">
    <h2>{{ heading }}</h2>

    <div class="carousel-window">
      <div class="carousel-track" :style="trackStyle">
        <article
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-slide"
        >
          <h3>{{ slide.title }}</h3>
          <p>{{ slide.body }}</p>
        </article>
      </div>
    </div>

    <div class="carousel-controls">
      <button
        type="button"
        class="control-button"
        :disabled="activeIndex === 0"
        @click="showPreviousSlide"
      >
        Previous
      </button>
      <button
        type="button"
        class="control-button"
        :disabled="activeIndex === slides.length - 1"
        @click="showNextSlide"
      >
        Next
      </button>
    </div>
  </section>
</template>

<style scoped>
.features {
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.carousel-window {
  max-width: 32rem;
  margin: 2rem auto 0;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.carousel-track {
  display: flex;
  width: 100%;
  transition: transform 0.3s ease;
}

.carousel-slide {
  box-sizing: border-box;
  flex: 0 0 100%;
  padding: 2rem 1.5rem;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.control-button {
  padding: 0.5rem 1rem;
  border: 1px solid #555;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
}

.control-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
