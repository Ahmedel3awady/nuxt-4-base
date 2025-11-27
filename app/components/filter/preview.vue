<template>
  <transition name="page">
    <section v-if="hasFilter" class="flex items-center gap-2 flex-wrap my-4">
      <template v-for="filterName in filterNames" :key="filterName">
        <UBadge
          v-if="query[filterName]"
          :label="query[filterName] as string"
          color="primary"
          variant="outline"
          size="sm"
          class="cursor-pointer hover:bg-primary/10 hover:text-primary"
        >
          <template #trailing>
            <UIcon
              name="i-lucide-x"
              class="cursor-pointer text-error"
              size="sm"
              @click="removeFilter(filterName)"
            />
          </template>
        </UBadge>
      </template>
    </section>
  </transition>
</template>

<script setup lang="ts">
import { UIcon } from '#components';

const { state: queryState, removeQuery } = useQueryStore();
const route = useRoute();
const router = useRouter();
const props = defineProps<{
  filterNames: string[];
}>();
const query = computed(() => {
  return { ...route.query, ...queryState.value.query };
});
const removeFilter = (filterName: string) => {
  removeQuery(filterName);
  delete query.value[filterName];
  delete query.value['page'];
  router.push({ name: route.name, query: { ...query.value } });
};
const hasFilter = computed(() => {
  return props.filterNames.some(filterName => query.value[filterName]);
});
</script>
