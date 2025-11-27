<template>
  <section class="space-y-10">
    <filter-select
      :label="$t('doctor')"
      filterName="doctor_id"
      :items="filterData.doctors"
      valueKey="id"
      :selectProps="{
        placeholder: $t('doctor'),
        labelKey: 'name',
      }"
    />
    <filter-select
      :label="$t('patient')"
      filterName="patient_id"
      :items="filterData.patients"
      valueKey="id"
      :selectProps="{
        placeholder: $t('patient'),
        labelKey: 'name',
      }"
    />
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
    <filter-select
      :label="$t('appointment')"
      filterName="day"
      :items="days"
      :selectProps="{
        placeholder: $t('appointment'),
        labelKey: 'label',
      }"
    />
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { IBranch, IDoctor, IPatient } from '~/types/reservations';

withDefaults(
  defineProps<{
    filterData: {
      doctors: Ref<IDoctor[] | undefined>;
      patients: Ref<IPatient[] | undefined>;
      branches: Ref<IBranch[] | undefined>;
    };
  }>(),
  {
    filterData: () => ({
      doctors: ref([]),
      patients: ref([]),
      branches: ref([]),
    }),
  }
);
const days = computed(() => [
  { value: 'saturday', label: 'السبت' },
  { value: 'sunday', label: 'الأحد' },
  { value: 'monday', label: 'الإثنين' },
  { value: 'tuesday', label: 'الثلاثاء' },
  { value: 'wednesday', label: 'الأربعاء' },
  { value: 'thursday', label: 'الخميس' },
  { value: 'friday', label: 'الجمعة' },
]);
</script>
