<template>
  <UFormField
    :name="name"
    :label="label"
    :error="errors[0]"
    :required="required"
    :ui="{
      label: '!text-gray font-medium mb-2 block',
      error: 'text-error text-sm mt-2',
    }"
  >
    <!-- Upload Area (when no file) -->
    <div
      v-if="!value"
      @click="triggerFileInput"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      class="relative cursor-pointer border-2 border-dashed rounded-xl p-12 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary/5 hover:shadow-lg"
      :class="[
        isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : '',
        errors.length ? 'border-error bg-error/5' : 'border-gray-300 bg-gray-50/50',
      ]"
    >
      <input
        ref="fileInputRef"
        type="file"
        :accept="accept"
        class="hidden"
        @change="handleFileSelect"
      />

      <div class="flex flex-col items-center gap-5">
        <!-- Icon -->
        <div class="relative">
          <div class="absolute inset-0 bg-yellow-500/10 rounded-full blur-xl animate-pulse"></div>
          <div
            class="relative bg-linear-to-br from-yellow-400 to-yellow-600 p-4 rounded-2xl shadow-lg"
          >
            <UIcon name="i-heroicons-arrow-up-tray" class="w-10 h-10 text-white" />
          </div>
        </div>

        <!-- Text -->
        <div class="flex flex-col items-center gap-2">
          <span class="text-gray-900 text-lg font-semibold">{{ uploadText }}</span>
          <span class="text-gray-600 text-sm text-center max-w-md leading-relaxed">
            {{ helpText }}
          </span>
          <div v-if="showBadges" class="flex items-center gap-2 mt-2">
            <UBadge
              v-for="ext in acceptedExtensions"
              :key="ext"
              color="primary"
              variant="soft"
              size="sm"
            >
              {{ ext.toUpperCase() }}
            </UBadge>
            <span class="text-gray-400 text-xs">• Max {{ formatFileSize(maxSize) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- File Preview (when file uploaded) -->
    <div
      v-else
      class="relative border-2 border-solid border-primary/30 bg-primary/5 rounded-xl p-6 transition-all"
    >
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-4 flex-1">
          <!-- File Icon -->
          <div class="bg-green-600 p-3 rounded-lg shrink-0">
            <UIcon name="i-heroicons-document-check" class="w-8 h-8 text-white" />
          </div>

          <!-- File Details -->
          <div class="flex flex-col gap-1 flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-gray-900 font-semibold truncate">{{ value.name }}</span>
              <UBadge color="success" variant="soft" size="xs">
                <UIcon name="i-heroicons-check-circle" class="w-3 h-3" />
                تم الرفع
              </UBadge>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <span>{{ formatFileSize(value.size) }}</span>
              <span v-if="value.type">• {{ value.type }}</span>
            </div>
          </div>
        </div>

        <!-- Remove Button -->
        <UButton
          color="error"
          variant="soft"
          size="sm"
          icon="i-heroicons-trash"
          @click="removeFile"
        >
          حذف
        </UButton>
      </div>
    </div>
  </UFormField>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  label?: string;
  accept?: string;
  maxSize?: number; // in bytes
  required?: boolean;
  uploadText?: string;
  helpText?: string;
  showBadges?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  accept: '*',
  maxSize: 10 * 1024 * 1024, // 10MB default
  required: false,
  uploadText: 'انقر او اسحب الملف هنا',
  helpText: 'اختر ملف للرفع',
  showBadges: true,
});

const { value: fieldValue, errors } = useCustomField(props.name);
const fileInputRef = ref<HTMLInputElement>();
const isDragging = ref(false);

const value = computed({
  get: () => fieldValue.value as unknown as File | null,
  set: val => {
    fieldValue.value = val as unknown as string;
  },
});

// Get accepted extensions from accept prop
const acceptedExtensions = computed(() => {
  if (props.accept === '*') return [];
  return props.accept.split(',').map(ext => ext.trim().replace('.', ''));
});

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

// Validate file
const validateFile = (file: File): boolean => {
  // Validate file type
  if (props.accept !== '*') {
    const extensions = acceptedExtensions.value;
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !extensions.includes(fileExt)) {
      useToast().add({
        title: 'خطأ',
        description: `يجب أن يكون الملف من نوع: ${extensions.join(', ')}`,
        color: 'error',
        duration: 3000,
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
      duration: 3000,
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
  }
};

// Handle drag and drop
const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const file = e.dataTransfer?.files?.[0];

  if (file && validateFile(file)) {
    value.value = file;
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
