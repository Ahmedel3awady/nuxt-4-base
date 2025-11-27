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
    class="cursor-pointer"
  >
    <!-- Hidden file input -->
    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      class="hidden"
      @change="handleFileSelect"
    />

    <!-- Using UInput like regular input.vue -->
    <div @click="triggerFileInput" class="cursor-pointer">
      <UInput
        :model-value="displayValue"
        readonly
        :placeholder="placeholder"
        :color="errors.length ? 'error' : color"
        :highlight="!!errors.length"
        :size="size"
        v-bind="$attrs"
      >
        <!-- Leading slot for file icon -->
        <template #leading>
          <UIcon
            :name="value ? 'i-heroicons-document-check' : icon"
            class="w-5 h-5"
            :class="value ? 'text-primary-500' : 'text-gray-400'"
          />
        </template>

        <!-- Trailing slot for remove button -->
        <template v-if="value" #trailing>
          <UButton
            color="error"
            variant="ghost"
            size="xs"
            icon="i-heroicons-x-circle"
            @click.stop="removeFile"
            :padded="false"
          />
        </template>
      </UInput>
    </div>

    <!-- File size info (when file is selected) -->
    <div v-if="value && showFileSize" class="mt-1.5 text-xs text-gray-500">
      {{ formatFileSize(value.size) }}
    </div>
  </UFormField>
</template>

<script setup lang="ts">
import type { InputProps } from '@nuxt/ui';

defineOptions({
  inheritAttrs: false,
});

// Extend InputProps and add our custom form field props
interface Props extends /* @vue-ignore */ Partial<InputProps> {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  help?: string;
  hint?: string;
  accept?: string;
  maxSize?: number; // in bytes
  required?: boolean;
  icon?: string;
  showFileSize?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'أرفق صورة',
  description: '',
  help: '',
  hint: '',
  accept: 'image/png,image/jpg,application/pdf',
  maxSize: 5 * 1024 * 1024, // 5MB default
  required: false,
  icon: 'i-lucide-image-up',
  showFileSize: true,
});

// Custom validation logic
const { value: fieldValue, errors } = useCustomField(props.name);
const fileInputRef = ref<HTMLInputElement>();

const value = computed({
  get: () => fieldValue.value as unknown as File | null,
  set: val => {
    fieldValue.value = val as unknown as string;
  },
});

// Display value for the input field
const displayValue = computed(() => {
  if (value.value) {
    return value.value.name;
  }
  return '';
});

// Computed values for size and color with defaults
const size = computed(() => props.size ?? 'md');
const color = computed(() => props.color ?? 'primary');

// Custom form field styling to match regular inputs
const formFieldUi = computed(() => ({
  label: 'text-secondary font-medium',
  error: 'text-error text-sm',
  help: 'text-gray-500 text-sm',
}));

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

// Get accepted extensions from accept prop
const acceptedExtensions = computed(() => {
  if (props.accept === '*') return [];
  return props.accept
    .split(',')
    .map(ext => {
      if (ext.includes('/')) {
        return ext.split('/')[1];
      }
      return ext.trim().replace('.', '');
    })
    .filter(Boolean);
});

// Validate file
const validateFile = (file: File): boolean => {
  // Validate file type
  if (props.accept !== '*') {
    const fileType = file.type;
    const fileName = file.name;
    const fileExt = fileName.split('.').pop()?.toLowerCase();

    const acceptedTypes = props.accept.split(',').map(t => t.trim());
    const isValidType = acceptedTypes.some(type => {
      if (type.includes('/')) {
        return fileType === type;
      }
      return fileName.endsWith(type) || fileExt === type.replace('.', '');
    });

    if (!isValidType) {
      useToast().add({
        title: 'خطأ',
        description: `يجب أن يكون الملف من نوع: ${acceptedExtensions.value
          .join(', ')
          .toUpperCase()}`,
        color: 'error',
      });
      return false;
    }
  }

  // Validate file size
  if (file.size > props.maxSize) {
    useToast().add({
      title: 'خطأ',
      description: `حجم الملف يجب أن يكون أقل من ${formatFileSize(props.maxSize)}`,
      color: 'error',
    });
    return false;
  }

  return true;
};

// Trigger file input
const triggerFileInput = () => {
  fileInputRef.value?.click();
};

// Handle file selection
const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file && validateFile(file)) {
    value.value = file;
  } else {
    // Reset input if validation fails
    if (fileInputRef.value) {
      fileInputRef.value.value = '';
    }
  }
};

// Remove file
const removeFile = () => {
  value.value = null;
  fieldValue.value = '' as any;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};
</script>
