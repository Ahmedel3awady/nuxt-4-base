<template>
  <form-input
    icon="i-lucide-lock"
    :placeholder
    :type="show ? 'text' : 'password'"
    :name
    :label
    v-bind="$attrs"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :aria-pressed="show"
        aria-controls="password"
        @click="show = !show"
      />
    </template>
  </form-input>
</template>

<script setup lang="ts">
const show = ref(false);
defineProps<{ name: string; label?: string; placeholder?: string }>();
</script>
