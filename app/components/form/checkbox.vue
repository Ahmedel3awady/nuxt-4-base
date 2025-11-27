<template>
  <UCheckbox
    size="xl"
    :model-value="internalValue"
    :ui="{ label: 'text-secondary font-medium cursor-pointer' }"
    :label="label"
    v-bind="$attrs"
    @update:model-value="handleUpdate"
  >
    <template #label>
      <slot name="label" />
    </template>
    <template #description>
      <slot name="description" />
    </template>
  </UCheckbox>
</template>

<script setup lang="ts">
import type { CheckboxProps } from '@nuxt/ui';

defineOptions({
  inheritAttrs: false,
});

interface Props extends Partial<CheckboxProps> {
  name: string;
  label?: string;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<{
  'update:modelValue': [value: boolean | 'indeterminate'];
}>();

// Custom validation logic
const { value } = useCustomField<boolean>(props.name);

const internalValue = computed(() => props.modelValue ?? value.value);

const handleUpdate = (newValue: boolean | 'indeterminate') => {
  value.value = newValue as boolean;
  emit('update:modelValue', newValue);
};
</script>
