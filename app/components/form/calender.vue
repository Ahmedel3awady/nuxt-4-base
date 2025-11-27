<script setup lang="ts">
import { getLocalTimeZone, parseDate } from '@internationalized/date';

const emit = defineEmits(['update:modelValue']);

interface Props {
  name: string;
  modelValue?: any;
}

const props = defineProps<Props>();

// Custom validation logic using useCustomField
const { value, errors, setValue } = useCustomField<any>(props.name);

// Format date to Y-m-d H:i:s
const formatToDateTime = (date: any) => {
  if (!date) return null;
  const jsDate = date.toDate(getLocalTimeZone());
  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, '0');
  const day = String(jsDate.getDate()).padStart(2, '0');
  const hours = String(jsDate.getHours()).padStart(2, '0');
  const minutes = String(jsDate.getMinutes()).padStart(2, '0');
  const seconds = String(jsDate.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Helper to normalize date (add time if missing)
const normalizeDate = (dateString: string) => {
  if (!dateString) return dateString;
  // If date doesn't have time, add 00:00:00
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return `${dateString} 00:00:00`;
  }
  return dateString;
};

// Internal calendar value (CalendarDate object for the calendar component)
const calendarValue = ref<any>(null);

// Sync calendarValue with form value
watch(
  () => value.value,
  newValue => {
    if (newValue && typeof newValue === 'string') {
      try {
        const normalizedDate = normalizeDate(newValue);

        // Update the form value if it was normalized
        if (normalizedDate !== newValue) {
          nextTick(() => {
            setValue(normalizedDate);
          });
        }

        const date = new Date(normalizedDate);
        if (!isNaN(date.getTime())) {
          const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            '0'
          )}-${String(date.getDate()).padStart(2, '0')}`;
          calendarValue.value = parseDate(dateStr);
        }
      } catch (e) {
        console.error('Error parsing date:', e);
      }
    } else if (!newValue) {
      calendarValue.value = null;
    }
  },
  { immediate: true }
);

// Watch modelValue from parent and sync with internal value
watch(
  () => props.modelValue,
  newValue => {
    if (newValue !== value.value) {
      const normalized = typeof newValue === 'string' ? normalizeDate(newValue) : newValue;
      setValue(normalized);
    }
  },
  { immediate: true }
);

// Handle date change from calendar
const handleDateChange = (newValue: any) => {
  const formattedDate = formatToDateTime(newValue);
  setValue(formattedDate);
  emit('update:modelValue', formattedDate);
};
</script>

<template>
  <UCalendar v-model="calendarValue" @update:model-value="handleDateChange" />
</template>
