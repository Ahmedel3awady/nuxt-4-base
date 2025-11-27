# Upload File Component

A robust, VeeValidate-integrated file upload component with image cropping capabilities.

## Features

- ✅ **VeeValidate Integration** - Automatic validation with `useField`
- ✅ **Image Cropping** - Built-in Cropper.js integration
- ✅ **File Validation** - Size and format validation
- ✅ **Multiple Upload** - Support for single or multiple files
- ✅ **SVG Support** - Direct upload for SVG files (no cropping)
- ✅ **Preview** - Image preview with delete functionality
- ✅ **TypeScript** - Full TypeScript support
- ✅ **Responsive** - Mobile-friendly design

## Basic Usage

### Single File Upload

```vue
<template>
  <UForm :state="formState" :schema="schema" @submit="onSubmit">
    <FormUploadFile
      name="avatar"
      label="صورة الملف الشخصي"
      :required="true"
      help="اختر صورة بحجم أقل من 5MB"
    />

    <UButton type="submit">حفظ</UButton>
  </UForm>
</template>

<script setup lang="ts">
import { object } from 'yup';

const schema = object({
  avatar: mixed().required('الصورة مطلوبة'),
});

const formState = ref({
  avatar: null,
});

const onSubmit = (values: any) => {
  console.log('File:', values.avatar);
  // Upload to server
};
</script>
```

### Multiple File Upload

```vue
<template>
  <UForm :state="formState" :schema="schema" @submit="onSubmit">
    <FormUploadFile
      name="gallery"
      label="معرض الصور"
      :multiple="true"
      :required="false"
      help="يمكنك اختيار عدة صور"
    />

    <UButton type="submit">حفظ</UButton>
  </UForm>
</template>

<script setup lang="ts">
import { object, array, mixed } from 'yup';

const schema = object({
  gallery: array().of(mixed()).min(1, 'اختر صورة واحدة على الأقل'),
});

const formState = ref({
  gallery: [],
});

const onSubmit = (values: any) => {
  console.log('Files:', values.gallery);
  // Upload to server
};
</script>
```

### With Existing Images

```vue
<template>
  <FormUploadFile
    name="product_image"
    label="صورة المنتج"
    :img-url="existingImageUrl"
    :hide-delete="false"
  />
</template>

<script setup lang="ts">
const existingImageUrl = ref('https://example.com/image.jpg');
// or for multiple images
const existingImageUrls = ref(['https://example.com/image1.jpg', 'https://example.com/image2.jpg']);
</script>
```

## Props

| Prop              | Type                 | Default                                                                   | Description                    |
| ----------------- | -------------------- | ------------------------------------------------------------------------- | ------------------------------ |
| `name`            | `string`             | **required**                                                              | Field name for VeeValidate     |
| `label`           | `string`             | `''`                                                                      | Label text                     |
| `description`     | `string`             | `''`                                                                      | Description text below label   |
| `help`            | `string`             | `''`                                                                      | Help text                      |
| `hint`            | `string`             | `''`                                                                      | Hint text                      |
| `required`        | `boolean`            | `false`                                                                   | Show required indicator        |
| `multiple`        | `boolean`            | `false`                                                                   | Allow multiple file selection  |
| `hideDelete`      | `boolean`            | `false`                                                                   | Hide delete button on previews |
| `imgUrl`          | `string \| string[]` | `[]`                                                                      | Existing image URL(s)          |
| `maxSize`         | `number`             | `5`                                                                       | Maximum file size in MB        |
| `acceptedFormats` | `string[]`           | `['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml']` | Accepted MIME types            |

## Validation Examples

### With Yup

```typescript
import { object, mixed, array } from 'yup';

// Single file, required
const schema = object({
  avatar: mixed()
    .required('الصورة مطلوبة')
    .test('fileSize', 'حجم الملف كبير جداً', value => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'نوع الملف غير مدعوم', value => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
    }),
});

// Multiple files, optional
const schema = object({
  gallery: array().of(mixed()).min(1, 'اختر صورة واحدة على الأقل').max(5, 'الحد الأقصى 5 صور'),
});
```

### With Zod

```typescript
import { z } from 'zod';

const schema = z.object({
  avatar: z
    .instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, {
      message: 'حجم الملف كبير جداً',
    })
    .refine(file => ['image/jpeg', 'image/png'].includes(file.type), {
      message: 'نوع الملف غير مدعوم',
    }),
});
```

## Advanced Usage

### Custom File Validation

```vue
<FormUploadFile
  name="logo"
  label="الشعار"
  :max-size="2"
  :accepted-formats="['image/png', 'image/svg+xml']"
/>
```

### Handling Form Submission with Files

```typescript
const onSubmit = async (values: any) => {
  const formData = new FormData();

  // Single file
  if (values.avatar instanceof File) {
    formData.append('avatar', values.avatar);
  }

  // Multiple files
  if (Array.isArray(values.gallery)) {
    values.gallery.forEach((file: File, index: number) => {
      formData.append(`gallery[${index}]`, file);
    });
  }

  // Other form fields
  formData.append('name', values.name);
  formData.append('email', values.email);

  // Upload to server
  await $fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
};
```

## Styling

The component uses Nuxt UI's UFormField wrapper and follows the same styling pattern as other form components.

### Custom Styling

You can customize the appearance using Tailwind classes or Nuxt UI configuration:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ui: {
    formField: {
      label: 'text-secondary font-medium',
      error: 'text-red-500 text-sm',
    },
  },
});
```

## Image Cropping

The component automatically opens a cropping modal for non-SVG images:

- **Aspect Ratio Toggle**: Switch between 1:1 and free-form cropping
- **High Quality**: Images are cropped at 800x800px with high quality
- **Format Preservation**: Original image format is preserved (JPEG/PNG)
- **Cancel Support**: Users can cancel cropping and select a different image

## Browser Support

- Modern browsers with File API support
- Blob URL support for preview
- Canvas API for image cropping

## Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Focus management in modal

## Performance

- Lazy-loaded Cropper.js (via plugin)
- Automatic cleanup of blob URLs
- Optimized re-renders with Vue 3 Composition API
