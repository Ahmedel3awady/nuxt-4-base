<template>
  <div>
    <ui-page-title>
      <UButton type="submit" form="myForm" variant="primary" class="min-w-46" :loading>
        {{ isEdit() ? $t('button.edit') : $t('button.add') }}
      </UButton>
      <UButton variant="outline" class="min-w-46" @click="handleCancel">
        {{ $t('button.cancel') }}
      </UButton>
    </ui-page-title>
    <UCard variant="solid">
      <form @submit.prevent="onSubmit" id="myForm" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form-input
          :placeholder="$t('placeholder.category_name')"
          name="ar_name"
          :label="$t('label.ar_name')"
        />
        <form-input
          :placeholder="$t('placeholder.category_name')"
          name="en_name"
          :label="$t('label.en_name')"
        />
        <form-text-area
          :placeholder="$t('placeholder.description')"
          name="ar_description"
          :label="$t('label.ar_description')"
        />
        <form-text-area
          :placeholder="$t('placeholder.description')"
          name="en_description"
          :label="$t('label.en_description')"
        />
      </form>
    </UCard>
    <ui-dialog-alert v-model:open="showModel">
      {{ isEdit() ? $t('edit_category_success') : $t('add_new_category_success') }}
    </ui-dialog-alert>
  </div>
</template>

<script setup lang="ts">
import { object, string } from 'yup';
const { redirect = true } = defineProps<{
  redirect?: boolean;
}>();
const { $http } = useNuxtApp();
const loading = ref(false);
const showModel = ref(false);
const route = useRoute();

const router = useRouter();
const id = computed(() =>
  route.path.toString().includes('sub-categories')
    ? (route.params.sub_id as string)
    : (route.params.id as string)
);
const emit = defineEmits(['onCancel', 'onSuccessSubmit']);
const { handleSubmit, values, setValues } = useForm<{ [key: string]: any }>({
  validationSchema: toTypedSchema(
    object({
      ar_name: string().required(),
      ar_description: string().required(),
      en_name: string().required(),
      en_description: string().required(),
    })
  ),
});
const generateData = () => {
  const formData = new FormData();
  for (const key in values) {
    if (key.includes('_')) {
      const [lang, value] = key.split('_');
      formData.append(`${lang}[${value}]`, values[key]);
    } else {
      formData.append(key, values[key]);
    }
  }
  if (route.path.toString().includes('sub-categories')) {
    formData.append('parent_id', route.params.id as string);
  }
  return formData;
};
const onSubmit = handleSubmit(async () => {
  try {
    loading.value = true;
    if (isEdit()) {
      await $http.categories.updateCategory(Number(id.value), generateData());
    } else {
      await $http.categories.storeCategory(generateData());
    }
    loading.value = false;
    showModel.value = true;
    if (redirect) {
      setTimeout(() => {
        router.push(
          route.path.toString().includes('sub-categories')
            ? `/categories/${route.params.id}/sub-categories`
            : '/categories'
        );
      }, 1500);
    } else {
      emit('onSuccessSubmit');
    }
    refreshNuxtData('categories');
  } finally {
    loading.value = false;
  }
});
const handleCancel = () => {
  if (!redirect) {
    emit('onCancel');
    return;
  }
  router.push(
    route.path.toString().includes('sub-categories')
      ? `/categories/${route.params.id}/sub-categories`
      : '/categories'
  );
};
const handleShow = async () => {
  const { data } = await $http.categories.showCategory(id.value);
  const { translations } = data;
  setValues({
    ar_name: translations?.['ar']?.name,
    ar_description: translations?.['ar']?.description,
    en_name: translations?.['en']?.name,
    en_description: translations?.['en']?.description,
  });
};
watchEffect(() => {
  if (isEdit()) {
    handleShow();
  }
});
</script>
