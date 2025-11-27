<template>
  <section class="space-y-10">
    <filter-select
      :label="$t('label.ticket_status')"
      filterName="status"
      :items="statuses"
      valueKey="value"
      :selectProps="{
        placeholder: $t('label.choose_ticket_status'),
        labelKey: 'label',
      }"
    />
    <filter-select
      :label="$t('label.ticket_type')"
      filterName="ticket_type_id"
      :items="ticketTypes"
      valueKey="id"
      :selectProps="{
        placeholder: $t('label.choose_ticket_type'),
        labelKey: 'name',
      }"
    />
  </section>
</template>

<script setup lang="ts">
import type { ITicketType } from '~/types/ticket';

const { t } = useI18n();
const { $http } = useNuxtApp();
const statuses = computed(() => [
  { value: 'follow', label: t('status.follow_up') },
  { value: 'closed', label: t('status.ticket_closed') },
  { value: 'replied', label: t('status.ticket_replied') },
]);
const { data: ticketTypes, pending: loadingTicketTypes } = useAsyncData(
  'ticket-types',
  () => $http.tickets.getAllTicketTypes(),
  {
    transform: (res: { data: ITicketType[] }) => res?.data,
  }
);
</script>
