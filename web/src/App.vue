<script setup lang="ts">
import paintStrokeUrl from '@assets/paint_brush_stroke.png'
import FeaturesSection from '@/components/FeaturesSection.vue'
import HeroSection from '@/components/HeroSection.vue'
</script>

<template>
  <div class="page">
    <div
      class="paint-stroke"
      aria-hidden="true"
      :style="{
        maskImage: `url(${paintStrokeUrl})`,
        webkitMaskImage: `url(${paintStrokeUrl})`,
      }"
    ></div>
    <HeroSection />
    <FeaturesSection />
  </div>
</template>

<style scoped>
.page {
  position: relative;
  isolation: isolate;
}

.paint-stroke {
  position: absolute;
  inset: -6%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.77;
  background: linear-gradient(
    to top right,
    #ccfbe3,
    #a8ffae,
    #6aff9c
  );
  mask-repeat: no-repeat;
  mask-position: 46% center;
  mask-size: 120% 125%;
}

.page :deep(section) {
  position: relative;
  z-index: 1;
}
</style>
