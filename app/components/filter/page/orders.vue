<template>
  <section class="space-y-10">
    <filter-select
      :label="$t('responsible_employee')"
      filterName="employee"
      :items="filterData?.employees"
      :selectProps="{
        placeholder: $t('all_teams'),
        labelKey: 'name',
      }"
    />
    <filter-select
      :label="$t('branch')"
      filterName="branch"
      :items="filterData?.branches"
      :selectProps="{
        placeholder: $t('all_branches'),
        labelKey: 'name',
      }"
    />
    <filter-select
      :label="$t('category')"
      filterName="category"
      :items="filterData?.categories"
      :selectProps="{
        placeholder: $t('all_categories'),
        labelKey: 'name',
      }"
    />
    <filter-select
      :label="$t('source')"
      filterName="source"
      :items="filterData?.sources"
      :selectProps="{
        placeholder: $t('all_sources'),
        labelKey: 'name',
      }"
    />
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';

withDefaults(
  defineProps<{
    filterData?: {
      employees: Ref<any[] | undefined>;
      branches: Ref<any[] | undefined>;
      categories: Ref<any[] | undefined>;
      sources: Ref<any[] | undefined>;
    };
  }>(),
  {
    filterData: () => ({
      employees: ref([]),
      branches: ref([]),
      categories: ref([]),
      sources: ref([]),
    }),
  }
);
</script>
