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
  >
    <UInputTags
      v-model="value"
      v-bind="$attrs"
      :color="errors.length ? 'error' : color"
      :highlight="!!errors.length"
      @input="handleInput"
    >
      <!-- Pass through all slots -->
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>

      <template v-if="$slots.default" #default>
        <slot />
      </template>

      <template v-if="$slots.trailing || showEnterIcon" #trailing>
        <slot name="trailing">
          <UButton
            v-if="showEnterIcon"
            variant="ghost"
            color="neutral"
            size="xs"
            :padded="false"
            class="pointer-events-none"
          >
            <UKbd>Enter</UKbd>
          </UButton>
        </slot>
      </template>
    </UInputTags>
  </UFormField>
</template>

<script setup lang="ts">
import type { InputTagsProps } from '@nuxt/ui';

defineOptions({
  inheritAttrs: false,
});

// Extend InputProps and add our custom form field props
interface Props extends /* @vue-ignore */ Partial<InputTagsProps> {
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
const { value, errors } = useCustomField<string[]>(props.name);

// Track if user is typing
const inputValue = ref('');
const showEnterIcon = computed(() => inputValue.value.trim().length > 0);

// Handle input event to track typing
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value || '';
};

// Reset input value when a tag is added
watch(value, () => {
  inputValue.value = '';
});

// Computed values for size and color with defaults
const size = computed(() => props.size ?? 'md');
const color = computed(() => props.color ?? 'primary');

// Default help text with hint about pressing Enter

// Custom form field styling
const formFieldUi = computed(() => ({
  label: 'text-secondary font-medium',
  error: 'text-error text-sm',
  help: 'text-gray-500 text-sm',
}));
</script>
