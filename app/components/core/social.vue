<template>
  <ul class="social-media-links flex items-center gap-4">
    <li v-for="item in links" :key="item.name">
      <a
        :href="item.link"
        target="_blank"
        rel="noopener"
        class="social-link"
        :title="item.name"
      >
        <img
          :src="`/imgs/social/${item.icon}`"
          :alt="item.name"
          class="social-icon w-6 h-6 secondary-filter"
        />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  links: {
    name: string;
    icon: string;
    link: string;
  }[];
}>();
</script>
<style scoped>
.social-media-links {
  transition: all 0.3s linear;
}

.social-media-links li .social-link {
  position: relative;
  z-index: 9;
  overflow: hidden;
  border: 1px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}
.social-media-links li .social-link img{
  transition: all 0.3s ease-in-out;
}
.social-media-links li .social-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: var(--color-primary);
  transition: all 0.3s linear;
  opacity: 1;
  z-index: -1;
}

.social-media-links li .social-link:hover {
  border: 1px solid var(--color-primary);
}

.social-media-links li .social-link:hover img {
  animation: fadeInRight 0.5s linear;
}

.social-media-links li .social-link:hover::after {
  animation: sideClipReverse 0.5s linear;
  opacity: 0;
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes sideClipReverse {
  0% {
    clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
</style>
