<template>
  <UModal
    v-model:open="open"
    :ui="{
      footer: `grid grid-cols-2 gap-4 `,
      content: 'sm:max-w-[800px]',
    }"
    :data-allow-mismatch="true"
    v-bind="options"
  >
    <template #title>
      <slot name="title" />
    </template>
    <template #description>
      <slot name="description" />
    </template>
    <template #header>
      <slot name="header" />
    </template>

    <template #body>
      <slot name="body" />
    </template>
    <template #footer="{ close }">
      <slot name="footer" :close />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { ModalProps } from '@nuxt/ui';
const { resetErrors } = useErrorsStore();
const emit = defineEmits(['onClose']);
const open = defineModel<boolean>('open');
const { title = 'sr-only', description = 'sr-only' } = defineProps<{
  title?: string;
  description?: string;
  options?: ModalProps;
}>();

onUnmounted(() => {
  resetErrors();
  emit('onClose');
});
watch(open, newVal => {
  if (!newVal) {
    emit('onClose');
  }
});
</script>
