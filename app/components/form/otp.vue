<template>
  <UFormField
    :name="name"
    :label="label"
    :description="description"
    :help="help"
    :hint="hint"
    :size="size"
    :error="errors[0]"
    :ui="formFieldUi"
    v-bind="$attrs"
  >
    <UPinInput
      dir="ltr"
      lang="en"
      :length="parseInt(length || '6')"
      v-model="value"
      v-bind="$attrs"
      :color="errors.length ? 'error' : color"
      :highlight="!!errors.length"
    >
      <!-- Pass through all slots -->
    </UPinInput>
  </UFormField>
</template>

<script setup lang="ts">
import type { PinInputProps } from '@nuxt/ui';

defineOptions({
  inheritAttrs: false,
});

// Extend InputProps and add our custom form field props
interface Props extends /* @vue-ignore */ Partial<PinInputProps> {
  name: string;
  label?: string;
  description?: string;
  help?: string;
  hint?: string;
  length?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  help: '',
  hint: '',
  required: false,
});

// Custom validation logic
const { value: fieldValue, errors } = useCustomField(props.name);

// Convert string to array for UPinInput and vice versa
const value = computed({
  get: () => (fieldValue.value ? fieldValue.value.split('') : []),
  set: (val: string[]) => {
    fieldValue.value = val.join('');
  },
});

// Computed values for size and color with defaults
const size = computed(() => props.size ?? 'md');
const color = computed(() => props.color ?? 'primary');

// Custom form field styling
const formFieldUi = computed(() => ({
  label: 'text-secondary font-medium',
  error: 'text-error text-sm',
  help: 'text-gray-500 text-sm',
}));
</script>
