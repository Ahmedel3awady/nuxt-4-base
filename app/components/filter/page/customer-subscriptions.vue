<template>
  <section class="space-y-10">
    <filter-select
      :label="$t('label.status')"
      filterName="status"
      :items="statuses"
      valueKey="value"
      :selectProps="{
        placeholder: $t('all_statuses'),
        labelKey: 'label',
      }"
    />
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const statuses = computed(() => [
  { value: 'blocked', label: t('status.hold_subscription') },
  { value: 'active', label: t('active') },
  { value: 'expired', label: t('status.expired_subscription') },
  { value: 'trial', label: t('status.trial_subscription') },
]);
</script>
