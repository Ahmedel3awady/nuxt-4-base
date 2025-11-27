<template>
  <ui-dialog
    v-model:open="open"
    v-bind="$attrs"
    :dismissible="type !== 'success' ? false : true"
    :title="title || $t(`dialog.${type}_title`)"
    :description="dialogDescription"
    :ui="{
      title: 'sr-only',
      header: 'sr-only',
      description: 'sr-only',
      footer: footerClasses,
    }"
  >
    <template #body>
      <div class="flex flex-col items-center justify-center gap-4 py-10">
        <core-image
          v-if="!hideIcon"
          :src="`/imgs/form/${type}.svg`"
          class="w-16 h-16 object-fill mb-5"
          :alt="$t(`app.title`)"
        />

        <div class="text-dark font-bold text-center">
          <slot />
        </div>
      </div>
    </template>
    <template #footer="{ close }">
      <UButton
        type="button"
        :label="$t('button.ok')"
        variant="primary"
        @click="emit('onConfirm')"
        :loading="loading"
      />
      <UButton type="button" :label="$t('button.cancel')" variant="outline" @click="close" />
    </template>
  </ui-dialog>
</template>

<script setup lang="ts">
type TType = 'success' | 'delete' | 'warning' | 'subscribed';
const open = defineModel<boolean>('open');
const {
  type = 'success',
  loading = false,
  title,
  hideFooter = true,
  description,
} = defineProps<{
  type?: TType;
  loading?: boolean;
  title?: string;
  description?: string;
  hideIcon?: boolean;
  hideFooter?: boolean;
}>();

const emit = defineEmits(['onConfirm']);

const { t } = useI18n();

const dialogDescription = computed(() => description || t(`dialog.${type}_description`));
const footerClasses = computed(() =>
  hideFooter && type !== 'delete' ? 'hidden' : 'grid grid-cols-2 gap-4'
);
</script>
