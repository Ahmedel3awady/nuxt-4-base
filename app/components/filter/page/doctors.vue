<template>
  <section class="space-y-10">
    <filter-select
      :label="$t('branch')"
      filterName="branch_id"
      :items="filterData.branches"
      valueKey="id"
      :selectProps="{
        placeholder: $t('all_branches'),
        labelKey: 'name',
      }"
    />
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { IBranch } from '~/types/reservations';

withDefaults(
  defineProps<{
    filterData: {
      branches: Ref<IBranch[] | undefined>;
    };
  }>(),
  {
    filterData: () => ({
      branches: ref([]),
    }),
  }
);
</script>
