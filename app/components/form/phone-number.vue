<template>
  <form-input :name="name" type="number" :label :placeholder v-bind="$attrs" icon="i-lucide-phone">
    <template #trailing>
      <form-select
        withoutErrorMessage
        :disabled="disabled"
        :search-input="{
          placeholder: 'البحث عن  الدولة',
          icon: 'i-lucide-search',
        }"
        :ui="{
          base: 'min-w-[140px] h-[40px]',
        }"
        :name="country_code_name"
        class="backdrop-blur-3xl"
        variant="ghost"
        color="neutral"
        size="xl"
        :items="data"
        v-model="selectedCountry"
        :avatar="selectedCountry?.avatar"
        :loading="pending"
      />
    </template>
  </form-input>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  country_code_name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}>();
const { $http } = useNuxtApp();
const { setValue, value } = useCustomField(props.country_code_name);
const selectedCountry = ref();

const { data, pending } = useAsyncData(
  'countries',
  async () => await $http.shared.getAllCountries(),
  {
    transform: (data: { data: any[] }) =>
      (data?.data as any[]).map(item => ({
        label: item.code,
        value: item.code,
        avatar: {
          src: item.image,
          alt: item.name,
        },
      })),
  }
);

// Set Saudi Arabia as default after component is mounted (avoid hydration mismatch)
onMounted(() => {
  watch(
    data,
    newData => {
      if (newData && newData.length > 0 && !selectedCountry.value && !value.value) {
        const saudiArabia = newData.find((item: any) => item.value === '+966');
        if (saudiArabia) {
          selectedCountry.value = saudiArabia;
          setValue(saudiArabia.value);
        }
      }
    },
    { immediate: true }
  );
});

// Update VeeValidate when country changes
watch(selectedCountry, newValue => {
  if (newValue) {
    setValue(newValue.value);
  }
});

// Listen to parent form changes (for edit mode)
watch(
  [value, data],
  ([newValue, countriesData]) => {
    if (newValue && countriesData) {
      const country = countriesData.find((item: any) => item.value === newValue);
      if (country) {
        selectedCountry.value = country;
      }
    }
  },
  { immediate: true }
);
</script>
