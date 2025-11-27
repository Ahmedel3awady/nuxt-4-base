<template>
  <section
    class="flex flex-wrap gap-4 items-center justify-between backdrop-blur-3xl mb-4 transition-all duration-300 backdrop:backdrop-blur-3xl"
  >
    <div class="flex gap-3 items-start">
      <slot name="right" />
      <UUser
        :name="name"
        :description="description"
        :ui="{
          name: 'text-2xl font-bold text-secondary',
          description: 'text-[16px] text-gray',
          wrapper: 'space-y-2  w-full',
        }"
        v-bind="$attrs"
      />
    </div>
    <div class="flex items-center gap-3 lg:ms-auto justify-center">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ name?: string; description?: string }>();
</script>
