<script setup lang="ts">
import { computed, ref } from 'vue'
import createProfileUrl from '@assets/create_profile.png'
import discoverPageUrl from '@assets/discover_page.png'
import postingBoardUrl from '@assets/posting_board.png'
import messagesInboxUrl from '@assets/messages_inbox.png'

const heading = 'How It Works'

const slides = [
  {
    title: 'Create a Profile!',
    body: 'Tell everyone your hobbies, and a little bit about yourself.',
    image: createProfileUrl,
  },
  {
    title: 'Discover people who share your passion.',
    body: 'Tailor your search criteria to find the perfect partner for an activity!',
    image: discoverPageUrl,
  },
  {
    title: 'Browse or create a posting.',
    body: 'Search for active upcoming events posted by other users, or create one yourself!',
    image: postingBoardUrl,
  },
  {
    title: 'Connect and squad up!',
    body: 'Message, coordinate, and meet up for the activity.',
    image: messagesInboxUrl,
  },
]

const windowRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const isDragging = ref(false)
const dragOffset = ref(0)
const startX = ref(0)

const trackStyle = computed(() => ({
  transform: `translateX(calc(-${activeIndex.value * 100}% + ${dragOffset.value}px))`,
}))

function onPointerDown(event: PointerEvent) {
  isDragging.value = true
  startX.value = event.clientX
  dragOffset.value = 0
  windowRef.value?.setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging.value) {
    return
  }

  let offset = event.clientX - startX.value
  const atStart = activeIndex.value === 0 && offset > 0
  const atEnd = activeIndex.value === slides.length - 1 && offset < 0

  if (atStart || atEnd) {
    offset *= 0.3
  }

  dragOffset.value = offset
}

function onPointerUp() {
  if (!isDragging.value) {
    return
  }

  const width = windowRef.value?.offsetWidth ?? 1
  const threshold = width * 0.2

  if (dragOffset.value < -threshold && activeIndex.value < slides.length - 1) {
    activeIndex.value += 1
  } else if (dragOffset.value > threshold && activeIndex.value > 0) {
    activeIndex.value -= 1
  }

  isDragging.value = false
  dragOffset.value = 0
}

function goToSlide(index: number) {
  activeIndex.value = index
}

function scrollToFeatures() {
  const target = document.getElementById('features')
  if (!target) {
    return
  }

  const startY = window.scrollY
  const endY = target.getBoundingClientRect().top + window.scrollY
  const distance = endY - startY
  const duration = 1100
  const startTime = performance.now()

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
  }

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
</script>

<template>
  <section id="features" class="features">
    <button type="button" class="features-heading" @click="scrollToFeatures">
      {{ heading }}
    </button>

    <div
      ref="windowRef"
      class="carousel-window"
      :class="{ 'is-dragging': isDragging }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div
        class="carousel-track"
        :class="{ 'is-dragging': isDragging }"
        :style="trackStyle"
      >
        <article
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-slide"
          :class="{ 'has-media': Boolean(slide.image) }"
        >
          <div class="slide-copy">
            <h3>{{ slide.title }}</h3>
            <p>{{ slide.body }}</p>
          </div>
          <div v-if="slide.image" class="slide-media">
            <img :src="slide.image" :alt="slide.title" draggable="false" />
          </div>
        </article>
      </div>
    </div>

    <div class="carousel-dots">
      <button
        v-for="(_, index) in slides"
        :key="index"
        type="button"
        class="dot"
        :class="{ 'is-active': index === activeIndex }"
        :aria-label="`Go to slide ${index + 1}`"
        @click="goToSlide(index)"
      />
    </div>
  </section>
</template>

<style scoped>
.features {
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.features-heading {
  display: block;
  margin: 0 auto;
  padding: 0;
  border: none;
  background: none;
  color: #fff;
  font-family: 'Coiny', system-ui, sans-serif;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.2;
  -webkit-text-stroke: 0.4px rgb(255 122 108 / 0.4);
  cursor: pointer;
}

.carousel-window {
  max-width: 48rem;
  width: 100%;
  height: 40rem;
  margin: 2rem auto 0;
  overflow: hidden;
  border-radius: 8px;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
}

.carousel-window.is-dragging {
  cursor: grabbing;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.carousel-track.is-dragging {
  transition: none;
}

.carousel-slide {
  box-sizing: border-box;
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1.5rem 1.75rem;
  gap: 1.5rem;
}

.carousel-slide.has-media {
  justify-content: space-between;
}

.slide-copy {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.slide-copy h3 {
  margin: 0 0 0.75rem;
  color: #fff;
  font-family: 'Coiny', system-ui, sans-serif;
  font-size: 1.85rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1.2;
  -webkit-text-stroke: 0.4px rgb(255 122 108 / 0.4);
}

.slide-copy p {
  margin: 0;
  color: #fff;
  font-family: 'Fredoka', system-ui, sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.5;
  -webkit-text-stroke: 0.2px rgb(255 122 108 / 0.3);
}

.slide-media {
  display: flex;
  flex: 0 0 42%;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.slide-media img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 1.5rem;
  pointer-events: none;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1rem;
}

.dot {
  width: 0.55rem;
  height: 0.55rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.35);
  cursor: pointer;
}

.dot.is-active {
  background: #fff;
}
</style>
