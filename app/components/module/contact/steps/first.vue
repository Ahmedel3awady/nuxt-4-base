<template>
  <div class="step-one-container">
    <form-radio-group
      name="industry"
      :items="
        items.map(item => ({
          label: $t(`labels.${item.value}`),
          value: item.value.toString(),
          icon: `/imgs/contact/${item.value}.svg`,
        }))
      "
    />
    <div class="flex justify-center">
      <core-button
        type="button"
        :loading="loading"
        class="mt-12 mx-auto"
        @click="$emit('nextStep')"
      >
        {{ $t('buttons.next') }}
      </core-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: { value: string }[];
  loading: boolean;
}>();
</script>

<style lang="scss" scoped></style>
