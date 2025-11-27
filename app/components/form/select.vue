<template>
  <UFormField
    :name="name"
    :label="label"
    :required="required"
    :description="description"
    :help="help"
    :hint="hint"
    :size="size"
    :error="!withoutErrorMessage ? errors[0] : false"
    :ui="formFieldUi"
    v-bind="$attrs"
  >
    <template #hint>
      <slot name="hint" />
    </template>

    <USelectMenu
      v-model="value"
      v-bind="$attrs"
      :items="displayedItems"
      :color="errors.length ? 'error' : color"
      :value-key="valueKey"
      :highlight="!!errors.length"
      @update:model-value="handleValueChange"
      @update:search-term="searchQuery = $event"
      :multiple="multiple"
    >
      <template #content-top>
        <div
          v-if="multiple && items?.length"
          class="flex items-center gap-2 px-3 py-2.5 mb-1 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 transition-all rounded-md border-b border-gray-200 dark:border-gray-700"
          @click="toggleSelectAll"
        >
          <UCheckbox :model-value="isAllSelected" class="shrink-0" />
          <span class="text-sm font-semibold text-primary">{{ $t('label.select_all') }}</span>
          <UBadge
            v-if="Array.isArray(value) && value.length > 0"
            size="xs"
            color="primary"
            variant="solid"
            class="ml-auto"
          >
            {{ value.length }}/{{ items?.length || 0 }}
          </UBadge>
        </div>
      </template>
      <!-- Pass through all slots -->
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>

      <template v-if="$slots.default" #default>
        <slot />
      </template>

      <template #trailing>
        <div class="flex items-center gap-1">
          <UIcon
            v-if="value !== null && value !== undefined && value !== '' && !withoutClear"
            name="i-lucide-x"
            class="cursor-pointer text-gray-200 hover:text-red-500 transition-colors size-3"
            @click.stop="clearValue"
            @mousedown.stop.prevent
          />
          <slot v-if="$slots.trailing" name="trailing" />
          <UIcon name="i-heroicons-chevron-down-20-solid" class="size-5 text-gray-400" />
        </div>
      </template>
    </USelectMenu>
  </UFormField>
</template>

<script setup lang="ts">
import type { SelectMenuProps } from '@nuxt/ui';

const emit = defineEmits(['update:modelValue']);

defineOptions({
  inheritAttrs: false,
});

// Extend SelectMenuProps and add our custom form field props
interface Props
  extends /* @vue-ignore */ Omit<
    Partial<SelectMenuProps>,
    'color' | 'size' | 'valueKey' | 'multiple'
  > {
  name: string;
  label?: string;
  description?: string;
  help?: string;
  withoutClear?: boolean;
  hint?: string;
  required?: boolean;
  color?: 'primary' | 'error' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  valueKey?: string;
  withoutErrorMessage?: boolean;
  defaultValue?: any;
  modelValue?: any;
  multiple?: boolean;
  items?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  help: '',
  hint: '',
  required: false,
  color: 'primary',
  size: 'md',
  items: () => [],
});

// Custom validation logic
const { value, errors, setValue } = useCustomField(props?.name);

// Custom form field styling
const formFieldUi = computed(() => ({
  label: 'text-secondary font-medium',
  error: 'text-error text-sm',
  help: 'text-gray-500 text-sm',
}));

// Handle value change
const handleValueChange = (newValue: any) => {
  emit('update:modelValue', newValue);
};

// Clear value function
const clearValue = () => {
  const clearedValue = props.defaultValue !== undefined ? props.defaultValue : null;
  setValue(clearedValue);
  emit('update:modelValue', clearedValue);
};

// Select All functionality for multiple mode
const isAllSelected = computed(() => {
  if (!props.multiple || !props.items?.length || !Array.isArray(value.value)) {
    return false;
  }
  return value.value.length === props.items.length;
});

const toggleSelectAll = () => {
  if (!props.multiple || !props.items?.length) return;

  const newValue = isAllSelected.value
    ? []
    : props.items.map(item => (props.valueKey ? item[props.valueKey] : item));

  setValue(newValue as any);
  emit('update:modelValue', newValue);
};

// Watch modelValue from parent and sync with internal value
watch(
  () => props.modelValue,
  newValue => {
    if (newValue !== value.value) {
      setValue(newValue);
    }
  },
  { immediate: true }
);

// Use lazy load composable for virtual scrolling with search
const itemsRef = computed(() => props.items);
const { displayedItems, reset, setupScrollListener, destroy, searchQuery } = useLazyLoad(
  itemsRef,
  15,
  value,
  props.valueKey
);

// Setup scroll listener on mount and cleanup
let cleanupScrollListener: (() => void) | null = null;

onMounted(() => {
  nextTick(() => {
    cleanupScrollListener = setupScrollListener();
  });
});

onBeforeUnmount(() => {
  if (cleanupScrollListener) {
    cleanupScrollListener();
  }
  destroy();
});
</script>
