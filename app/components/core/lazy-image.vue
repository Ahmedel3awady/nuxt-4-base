<template>
  <div
    ref="container"
    class="core-lazy-image relative overflow-hidden"
    :style="{ minHeight: minHeight + 'px' }"
  >
    <!-- Placeholder -->
    <transition name="fade-blur">
      <img
        v-if="!loaded"
        :src="placeholderSrc"
        :alt="'placeholder-' + alt"
        class="placeholder-image w-full h-auto object-cover absolute top-0 left-0"
        key="placeholder"
        loading="lazy"
      />
    </transition>

    <!-- Main Image -->
    <transition name="fade-blur">
      <img
        v-if="inView"
        :src="src"
        :alt="alt"
        class="original-image w-full h-auto object-cover relative"
        key="main"
        @load="onLoad"
        loading="lazy"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  src: string;
  alt?: string;
  minHeight?: number;
  placeholderSrc: string;
}

const props = defineProps<Props>();

const container = ref<HTMLElement | null>(null);
const loaded = ref(false);
const inView = ref(false);

const onLoad = () => {
  loaded.value = true;
};

onMounted(() => {
  if ("IntersectionObserver" in window && container.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inView.value = true;
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px" }
    );
    observer.observe(container.value);
  } else {
    inView.value = true;
  }
});
</script>

<style scoped>
.core-lazy-image img {
  display: block;
  width: 100%;
  height: auto;
}

/* transition for v-if/v-else */
.fade-blur-enter-active,
.fade-blur-leave-active {
  transition: opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease;
}

.fade-blur-enter-from,
.fade-blur-leave-to {
  opacity: 0;
  filter: blur(40px);
  transform: scale(0.95);
}

.fade-blur-enter-to,
.fade-blur-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: scale(1);
}
</style>
