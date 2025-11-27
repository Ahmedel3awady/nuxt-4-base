<template>
  <UFormField
    :name="name"
    :label="label"
    :required="required"
    :description="description"
    :help="help"
    :hint="hint"
    :size="size"
    :error="errors[0]"
    :ui="formFieldUi"
    v-bind="$attrs"
  >
    <UTextarea
      :rows="12"
      v-model="value"
      v-bind="$attrs"
      :color="errors.length ? 'error' : color"
      :highlight="!!errors.length"
    >
      <!-- Pass through all slots -->
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>

      <template v-if="$slots.default" #default>
        <slot />
      </template>

      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </UTextarea>
  </UFormField>
</template>

<script setup lang="ts">
import type { TextareaProps } from '@nuxt/ui';

defineOptions({
  inheritAttrs: false,
});

// Extend InputProps and add our custom form field props
interface Props extends /* @vue-ignore */ Partial<TextareaProps> {
  name: string;
  label?: string;
  description?: string;
  help?: string;
  hint?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  help: '',
  hint: '',
  required: false,
});

// Custom validation logic
const { value, errors } = useCustomField(props.name);

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
