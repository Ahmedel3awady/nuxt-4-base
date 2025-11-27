<template>
  <USwitch v-bind="{ ...props, ...$attrs }">
    <template #label>
      <slot name="label" />
    </template>
    <template #input>
      <slot name="input" />
    </template>
    <template v-if="$slots.leading" #leading>
      <slot name="leading" />
    </template>
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.trailing" #trailing>
      <slot name="trailing" />
    </template>
  </USwitch>
</template>

<script setup lang="ts">
import type { SwitchProps } from '@nuxt/ui';
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<SwitchProps>();
</script>
