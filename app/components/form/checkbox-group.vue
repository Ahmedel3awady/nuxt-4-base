<template>
  <div>
    <UCheckboxGroup
      v-model="value"
      :items="items"
      size="xl"
      v-bind="{ ...options, ...$attrs }"
      :ui="{
        root: ' p-4',
        base: `${errors.length ? 'border-error' : 'border-gray-300'}`,
        fieldset: 'gap-5',
        label: `font-thin cursor-pointer ${errors.length ? 'text-error' : 'text-secondary'}`,
      }"
    >
      <template #label>
        <slot name="label" />
      </template>
      <template #description>
        <slot name="description" />
      </template>
    </UCheckboxGroup>
    <p v-if="errors.length" class="text-error text-sm mt-2 px-4">{{ errors[0] }}</p>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxGroupItem, CheckboxGroupProps } from '@nuxt/ui';

defineOptions({
  inheritAttrs: false,
});

interface Props {
  name: string;
  items: CheckboxGroupItem[];
  options?: CheckboxGroupProps;
}

const props = withDefaults(defineProps<Props>(), {});

// Custom validation logic
const { value, errors } = useCustomField<any[]>(props.name);
</script>
