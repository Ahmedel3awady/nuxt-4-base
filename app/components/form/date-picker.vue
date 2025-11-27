<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date';

const emit = defineEmits(['update:modelValue']);

defineOptions({
  inheritAttrs: false,
});

interface Props {
  name: string;
  label?: string;
  description?: string;
  help?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  modelValue?: any;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  help: '',
  hint: '',
  required: false,
  placeholder: '',
});

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
});

// Date formatter for API (YYYY-MM-DD)
const apiDateFormatter = new DateFormatter('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

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

// Custom validation logic using useCustomField
const { value, errors, setValue } = useCustomField<any>(props.name);

// Internal calendar value (CalendarDate object for the calendar component)
const calendarValue = ref<any>(null);

// Initialize with current date
const todayDate = today(getLocalTimeZone());

// Convert string date back to Date object for display
const displayDate = computed(() => {
  if (value.value && typeof value.value === 'string') {
    try {
      const normalizedDate = normalizeDate(value.value);
      return new Date(normalizedDate);
    } catch (e) {
      return null;
    }
  }
  return null;
});

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
    }
  },
  { immediate: true }
);

// Custom form field styling
const formFieldUi = computed(() => ({
  label: 'text-secondary font-medium',
  error: 'text-error text-sm',
  help: 'text-gray-500 text-sm',
}));

// Function to set date for N days in the future
const setDateFromToday = (days: number) => {
  const currentDate = today(getLocalTimeZone());
  const newDate = currentDate.add({ days });
  const formatted = formatToDateTime(newDate);
  setValue(formatted);
  emit('update:modelValue', formatted);
};

// Function to set date for N months in the future
const setDateFromTodayMonths = (months: number) => {
  const currentDate = today(getLocalTimeZone());
  const newDate = currentDate.add({ months });
  const formatted = formatToDateTime(newDate);
  setValue(formatted);
  emit('update:modelValue', formatted);
};

// Function to reset to current date
const resetToToday = () => {
  setValue(null);
  emit('update:modelValue', null);
};

// Handle date change from calendar
const handleDateChange = (newValue: any) => {
  const formattedDate = formatToDateTime(newValue);
  setValue(formattedDate);
  emit('update:modelValue', formattedDate);
};

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
</script>

<template>
  <UFormField
    :name="name"
    :label="label"
    :required="required"
    :description="description"
    :help="help"
    :hint="hint"
    :error="errors[0]"
    :ui="formFieldUi"
  >
    <UPopover>
      <UButton
        :color="errors.length ? 'error' : 'neutral'"
        variant="outline"
        block
        :ui="{ base: 'justify-start' }"
        icon="i-lucide-calendar"
        :highlight="!!errors.length"
      >
        <span v-if="displayDate">
          {{ df.format(displayDate) }}
        </span>
        <span v-else class="text-dimmed font-normal">{{ $t('labels.choose_date') }}</span>

        <template #trailing>
          <UIcon
            v-if="displayDate"
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
            <UButton color="primary" size="sm" @click="setDateFromToday(3)"> بعد 3 أيام </UButton>
            <UButton color="primary" size="sm" @click="setDateFromToday(7)"> بعد أسبوع </UButton>
            <UButton color="primary" size="sm" @click="setDateFromTodayMonths(1)">
              بعد شهر
            </UButton>
          </div>
          <UCalendar v-model="calendarValue" @update:model-value="handleDateChange" />
        </div>
      </template>
    </UPopover>
  </UFormField>
</template>
