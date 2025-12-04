<template>
  <div key="step2" class="step-two-container">
    <form-radio-group name="fleet_size" :items="items" class="big-radio-group" />

    <div class="flex justify-center">
      <core-button :loading="loading" class="mt-12 mx-auto" @click="$emit('nextStep')">
        {{ $t('buttons.next') }}
      </core-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ items: { value: string }[]; loading: boolean }>();
</script>

<style lang="scss" scoped></style>
