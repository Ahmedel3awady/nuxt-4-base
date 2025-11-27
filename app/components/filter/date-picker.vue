<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date';

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
});

// Date formatter for API (YYYY-MM-DD)
const apiDateFormatter = new DateFormatter('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

// Query store
const { setQuery, removeQuery } = useQueryStore();

// Initialize with current date
const todayDate = today(getLocalTimeZone());
const modelValue = shallowRef({
  start: todayDate,
  end: todayDate,
});

// Prevent future dates from being selected
const isDateDisabled = (date: DateValue) => {
  return date.compare(todayDate) > 0;
};

// Handle filter - update query store when date range changes
const handleFilter = () => {
  if (modelValue.value.start && modelValue.value.end) {
    const startDate = apiDateFormatter.format(modelValue.value.start.toDate(getLocalTimeZone()));
    const endDate = apiDateFormatter.format(modelValue.value.end.toDate(getLocalTimeZone()));

    setQuery({
      start_date: startDate,
      end_date: endDate,
    });
  }
};

// Function to set date range for last N days
const setLastDays = (days: number) => {
  const currentDate = today(getLocalTimeZone());
  const pastDate = currentDate.subtract({ days });
  modelValue.value = { start: pastDate, end: currentDate };
  handleFilter();
};

// Function to set date range for last N months
const setLastMonths = (months: number) => {
  const currentDate = today(getLocalTimeZone());
  const pastDate = currentDate.subtract({ months });
  modelValue.value = { start: pastDate, end: currentDate };
  handleFilter();
};

// Function to set date range for the whole current month
const setWholeMonth = () => {
  const currentDate = today(getLocalTimeZone());
  const firstDayOfMonth = currentDate.set({ day: 1 });
  modelValue.value = { start: firstDayOfMonth, end: currentDate };
  handleFilter();
};

// Function to reset to current date
const resetToToday = () => {
  const currentDate = today(getLocalTimeZone());
  modelValue.value = { start: currentDate, end: currentDate };
  removeQuery('start_date');
  removeQuery('end_date');
};
</script>

<template>
  <UPopover>
    <UButton color="primary" variant="outline" icon="i-lucide-calendar" class="min-w-fit">
      <template v-if="modelValue.end && modelValue.start.toString() !== modelValue.end.toString()">
        {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} -
        {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
      </template>
      <template v-else>
        {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
      </template>

      <template #trailing>
        <UIcon
          v-if="
            modelValue.start.toString() !== todayDate.toString() ||
            modelValue.end.toString() !== todayDate.toString()
          "
          name="i-lucide-x"
          class="cursor-pointer hover:text-red-500 transition-colors"
          @click.stop="resetToToday"
        />
      </template>
    </UButton>

    <template #content>
      <div class="flex gap-4 p-2">
        <!-- Quick date selection buttons -->
        <div class="flex flex-col gap-2">
          <UButton color="primary" size="sm" @click="setLastMonths(6)"> اخر 6 شهور </UButton>
          <UButton color="primary" size="sm" @click="setLastDays(30)"> اخر 30 يوم </UButton>
          <UButton color="primary" size="sm" @click="setLastDays(14)"> اخر 14 يوم </UButton>
          <UButton color="primary" size="sm" @click="setLastDays(7)"> اخر 7 يوم </UButton>
          <UButton color="primary" size="sm" @click="setWholeMonth()"> الشهر الحال </UButton>
        </div>

        <!-- Calendar -->
        <UCalendar
          v-model="modelValue"
          :number-of-months="2"
          :max-value="todayDate"
          :is-date-disabled="isDateDisabled"
          range
          @update:model-value="handleFilter"
        />
      </div>
    </template>
  </UPopover>
</template>
