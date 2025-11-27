<template>
  <form v-if="showSearch" class="bg-white relative h-full flex-1 z-10" @submit.prevent>
    <UInput
      v-model="searchValue"
      v-bind="$attrs"
      type="text"
      :placeholder="$t('main_search_placeholder')"
      icon="i-lucide-search"
      size="lg"
      color="neutral"
      class="min-w-32 lg:min-w-[500px]"
      :ui="{
        base: 'rounded-full focus-visible:ring-gray-200 focus-visible:ring-1 transition-all duration-300 ease-in-out ',
      }"
    />
  </form>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';

interface Props {
  filterName?: string;
}

const { filterName = 'search' } = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  search: [];
}>();

const route = useRoute();
const queryStore = useQueryStore();

// Show search on specific routes
const showSearch = computed(() => {
  const routes = ['/manage-clients', '/clients', '/employees', '/orders', '/comments', '/doctors'];
  return routes.includes(route.path);
});

// Get query parameter name based on route
const queryName = computed(() => {
  switch (route.path) {
    case '/testimonials':
      return 'user_name';
    case '/blogs':
      return 'title';
    default:
      return filterName || 'search';
  }
});

const searchValue = ref('');

watchEffect(() => {
  searchValue.value = queryStore.state.value.query[queryName.value] || '';
});

// Debounced update to query store
watchDebounced(
  searchValue,
  value => {
    if (value) {
      queryStore.setQuery({ [queryName.value]: value, page: '1' });
    } else {
      queryStore.removeQuery(queryName.value);
      queryStore.setQuery({ page: '1' });
    }
    emit('search');
  },
  { debounce: 300 }
);
</script>
