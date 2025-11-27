<template>
  <UButton
    class="min-w-[50px]"
    size="xl"
    variant="outline"
    icon="i-lucide-download"
    :loading
    @click="exportFile"
  >
    {{ loadingText }}
  </UButton>
</template>

<script setup lang="ts">
const props = defineProps<{
  url: string;
}>();
const loading = ref(false);
const route = useRoute();
const { t } = useI18n();
const { $http } = useNuxtApp();
const { state } = useQueryStore();
const exportFile = async () => {
  loading.value = true;
  const res = await $http.shared.exportFile(props.url, {
    ...state.value.query,
    ...route.query,
  });
  window.open(res.file_link);
  loading.value = false;
};

const loadingText = computed(() => {
  return loading.value ? t('button.downloading_file') : '';
});
</script>
