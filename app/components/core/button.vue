<template>
  <UButton class="core-button" :class="btnClass" v-bind="$attrs">
    <slot />
  </UButton>
</template>

<script setup lang="ts">
defineProps<{
  btnClass?: string;
}>();
</script>

<style>
.core-button {
  min-width: 180px;
  border: 1px solid var(--color-primary);
  font-weight: 500;
  font-size: 14px;
  color: var(--color-secondary);
  transition: all 0.3s ease-in-out;
  padding: 0px 20px;
  /* @apply rounded-lg font-medium h-[50px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500; */
}
.core-button::before {
  display: none !important;
}
.core-button:hover {
  background-color: transparent;
  color: var(--color-primary);
}
.core-button.btn-link {
  background-color: transparent;
  color: var(--color-light);
  border: none;
  box-shadow: none !important;
  padding: 0px;
  min-width: auto;
}
.core-button.btn-link:hover {
  background-color: transparent;
  color: var(--color-primary);
}
.custom-navbar.navbar-scrolling .core-button.btn-link {
  color: var(--color-secondary);

}
.custom-navbar.navbar-scrolling .core-button.btn-link:hover {
  color: var(--color-primary);

}
</style>
