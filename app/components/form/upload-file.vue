<template>
  <UFormField
    :name="name"
    :label="label"
    :required="required"
    :description="description"
    :help="help"
    :hint="hint"
    :error="errors[0]"
    :ui="formFieldUi"
  >
    <main
      class="flex flex-wrap md:flex-nowrap items-center relative gap-3 w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
    >
      <!-- Upload Area -->
      <div class="flex flex-col">
        <section
          @click="handleClickUpload"
          :class="[
            errors.length ? 'border-red-500' : 'border-primary',
            'min-w-[208px] w-[208px] h-[208px] cursor-pointer rounded-[4px] border-2 border-dashed relative overflow-hidden flex items-center justify-center shrink-0 hover:border-primary/70 transition-colors',
          ]"
        >
          <input
            :multiple="multiple"
            @change="onSelectImage"
            type="file"
            accept="image/*"
            hidden
            ref="inputRef"
          />
          <div class="flex flex-col items-center justify-center gap-[15px]">
            <button
              type="button"
              class="bg-[#EBF1FA] cursor-pointer py-[6px] px-[12px] text-center text-secondary rounded-[6px] text-[14px] font-medium hover:bg-[#d9e7f5] transition-colors"
            >
              اختر الصورة
            </button>
          </div>
        </section>
      </div>

      <!-- Cropper Modal -->
      <ui-dialog
        v-model:open="showCropper"
        :options="{
          ui: {
            content: 'sm:max-w-[800px]',
            footer: 'flex items-center justify-between',
          },
        }"
      >
        <template #header>
          <h2 class="text-secondary font-medium text-2xl">
            يمكنك قص الصوره من الابعاد والاحداثيات التي امامك
          </h2>
        </template>
        <template #body>
          <div
            class="relative h-[60vh] bg-gray-100 rounded-lg overflow-hidden"
            @click.stop
            @mousedown.stop
            @mouseup.stop
          >
            <img ref="cropperImageRef" :src="cropImageUrl" class="max-h-full" alt="Image to crop" />
          </div>
        </template>
        <template #footer>
          <UButton
            type="button"
            @click.stop.prevent="toggleAspectRatio"
            @mousedown.stop.prevent
            variant="soft"
            color="neutral"
          >
            {{ freeMode ? 'تثبيت المربع' : 'الصوره بكامل الابعاد' }}
          </UButton>
          <div class="flex gap-3">
            <UButton
              size="xl"
              type="button"
              @click.stop.prevent="cancelCrop"
              @mousedown.stop.prevent
              variant="outline"
            >
              الغاء
            </UButton>
            <UButton
              type="button"
              @click.stop.prevent="confirmCrop"
              @mousedown.stop.prevent
              variant="primary"
            >
              حفظ الصورة
            </UButton>
          </div>
        </template>
      </ui-dialog>

      <!-- Preview Images -->
      <section
        v-if="previewUrls.length > 0"
        class="flex flex-nowrap gap-3 grow overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        <div
          v-for="(url, index) in previewUrls"
          :key="`${url}-${index}`"
          class="min-w-[208px] w-[208px] h-[208px] rounded-[4px] shrink-0 relative overflow-hidden snap-start group"
        >
          <img :src="url" alt="Selected Image" class="w-full h-full object-cover" />
          <div
            v-if="!hideDelete"
            class="absolute inset-0 z-999 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40"
          >
            <button
              @click="onRemoveImage(index)"
              type="button"
              class="bg-[#ffc8cb] cursor-pointer py-[6px] px-[12px] text-center text-secondary rounded-[6px] text-[14px] font-medium hover:bg-[#ffb3b7] transition-colors"
            >
              احذف الصورة
            </button>
          </div>
        </div>
      </section>
    </main>
  </UFormField>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

interface Props {
  name: string;
  label?: string;
  description?: string;
  help?: string;
  hint?: string;
  required?: boolean;
  multiple?: boolean;
  hideDelete?: boolean;
  imgUrl?: string | string[];
  maxSize?: number; // in MB
  acceptedFormats?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  help: '',
  hint: '',
  required: false,
  multiple: false,
  hideDelete: false,
  imgUrl: () => [],
  maxSize: 5, // 5MB default
  acceptedFormats: () => ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml'],
});

// VeeValidate integration
const { value, errors, setErrors } = useCustomField<File | File[] | null>(props.name);

// Composables
const { $Cropper } = useNuxtApp();

// Template refs
const inputRef = ref<HTMLInputElement | null>(null);
const cropperImageRef = ref<HTMLImageElement | null>(null);

// Reactive state
const previewUrls = ref<string[]>([]);
const showCropper = ref(false);
const cropImageUrl = ref('');
const cropper = ref<any>(null);
const currentFile = ref<File | null>(null);
const freeMode = ref(false);

// Custom form field styling
const formFieldUi = computed(() => ({
  label: 'text-secondary font-medium',
  error: 'text-red-500 text-sm',
  help: 'text-gray-500 text-sm',
}));

// Validation helpers
const validateFile = (file: File): string | null => {
  // Check file size
  const maxSizeInBytes = props.maxSize * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    setErrors(`حجم الملف يجب أن يكون أقل من ${props.maxSize}MB`);
    return null;
  }

  // Check file format
  if (!props.acceptedFormats.includes(file.type)) {
    setErrors('نوع الملف غير مدعوم');
    return null;
  }

  return null;
};

// Methods
const handleClickUpload = () => {
  inputRef.value?.click();
};

const onRemoveImage = (index: number) => {
  previewUrls.value.splice(index, 1);
  setErrors('');
  if (inputRef.value) {
    inputRef.value.value = '';
  }

  // Update value based on multiple mode
  if (props.multiple) {
    const files = Array.from(inputRef.value?.files || []);
    files.splice(index, 1);
    value.value = files.length > 0 ? files : null;
  } else {
    value.value = null;
  }
};

const handleSvgFile = (file: File | undefined, isMultiple = true) => {
  if (!file) return;

  const validationError = validateFile(file);
  if (validationError) {
    console.error(validationError);
    return;
  }

  const svgUrl = URL.createObjectURL(file);

  if (isMultiple) {
    previewUrls.value.push(svgUrl);
  } else {
    // Clean up old URLs
    previewUrls.value.forEach(url => URL.revokeObjectURL(url));
    previewUrls.value = [svgUrl];
  }

  updateValue(file, isMultiple);
};

const onSelectImage = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const selectedFiles = Array.from(target.files || []);

  if (selectedFiles.length === 0) return;

  if (props.multiple) {
    selectedFiles.forEach(file => {
      const validationError = validateFile(file);
      if (validationError) {
        console.error(validationError);
        return;
      }

      if (file.type === 'image/svg+xml') {
        handleSvgFile(file);
      } else {
        prepareCrop(file);
      }
    });
  } else {
    const file = selectedFiles[0];
    if (!file) return;

    const validationError = validateFile(file);

    if (validationError) {
      console.error(validationError);
      return;
    }

    if (file.type === 'image/svg+xml') {
      handleSvgFile(file, false);
    } else {
      prepareCrop(file);
    }
  }
};

const prepareCrop = (file: File) => {
  if (!file) return;

  cropImageUrl.value = URL.createObjectURL(file);
  currentFile.value = file;
  showCropper.value = true;

  nextTick(() => {
    const img = cropperImageRef.value;
    if (!img) return;

    img.onload = () => {
      if (cropper.value) {
        cropper.value.destroy();
      }

      cropper.value = new $Cropper(img, {
        aspectRatio: 1,
        viewMode: 2,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: true,
      });
    };

    img.onerror = () => {
      console.error('Failed to load image for cropping');
      cancelCrop();
    };
  });
};

const cancelCrop = () => {
  showCropper.value = false;

  if (cropImageUrl.value) {
    URL.revokeObjectURL(cropImageUrl.value);
    cropImageUrl.value = '';
  }

  currentFile.value = null;

  if (cropper.value) {
    cropper.value.destroy();
    cropper.value = null;
  }
};

const confirmCrop = () => {
  if (!cropper.value || !currentFile.value) return;

  const canvas = cropper.value.getCroppedCanvas({
    width: 800,
    height: 800,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high',
  });

  if (!canvas) {
    console.error('Failed to get cropped canvas');
    return;
  }

  const mimeType = currentFile.value.type || 'image/jpeg';
  const quality = mimeType === 'image/png' ? 1 : 0.9;

  canvas.toBlob(
    (blob: Blob | null) => {
      if (!blob || !currentFile.value) {
        console.error('Failed to create blob from canvas');
        return;
      }

      const croppedFile = new File([blob], currentFile.value.name, {
        type: mimeType,
        lastModified: Date.now(),
      });

      const croppedUrl = URL.createObjectURL(croppedFile);

      if (props.multiple) {
        previewUrls.value.push(croppedUrl);
      } else {
        // Clean up old URLs
        previewUrls.value.forEach(url => URL.revokeObjectURL(url));
        previewUrls.value = [croppedUrl];
      }

      updateValue(croppedFile, props.multiple);
      cancelCrop();
    },
    mimeType,
    quality
  );
};

const toggleAspectRatio = () => {
  if (!cropper.value) return;
  freeMode.value = !freeMode.value;
  cropper.value.setAspectRatio(freeMode.value ? NaN : 1);
};

const updateValue = (file: File, isMultiple: boolean) => {
  if (isMultiple) {
    const currentFiles = Array.isArray(value.value) ? value.value : [];
    value.value = [...currentFiles, file];
  } else {
    value.value = file;
  }
};

// Watch for external imgUrl changes
watch(
  () => props.imgUrl,
  newValue => {
    if (Array.isArray(newValue)) {
      previewUrls.value = newValue;
    } else if (newValue && typeof newValue === 'string') {
      previewUrls.value = [newValue];
    } else {
      previewUrls.value = [];
    }
  },
  { immediate: true }
);

// Watch for value changes (handles edit case with string URLs and new file uploads)
watch(
  value,
  newValue => {
    // Handle string URL (edit mode with existing image)
    if (typeof newValue === 'string' && newValue) {
      // Only show URL if we don't already have file previews
      const hasFilePreviews = previewUrls.value.some(url => url.startsWith('blob:'));
      if (!hasFilePreviews && !previewUrls.value.includes(newValue)) {
        previewUrls.value = [newValue];
      }
    }
    // Handle File object (new upload) - preview already created by onSelectImage
    else if (newValue instanceof File) {
      // Preview is already handled in handleSvgFile or confirmCrop
    }
    // Handle null/empty (image removed)
    else if (!newValue) {
      previewUrls.value = [];
    }
  },
  { immediate: true }
);

// Cleanup on unmount
onBeforeUnmount(() => {
  if (cropper.value) {
    cropper.value.destroy();
    cropper.value = null;
  }

  if (cropImageUrl.value) {
    URL.revokeObjectURL(cropImageUrl.value);
  }

  // Clean up preview URLs
  previewUrls.value.forEach(url => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
});
</script>
