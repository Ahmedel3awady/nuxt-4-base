<template>
  <div class="contact-us-page-content-inner">
    <!-- START:: CONTACT US FORM HEADER -->
    <ui-page-title class="contact-form-header text-center" v-if="!successMessage">
      <h3 class="text-light font-normal lg:text-lg text-base mb-6 relative">
        <div v-if="currentStep !== 1" class="lg:absolute lg:top-0 lg:right-0 lg:mb-0 mb-4">
          <core-button
            type="button"
            class="mt-12 mx-auto btn-link text-light gap-2 !mt-0 !h-auto"
            @click="currentStep--"
          >
            <img
              src="/imgs/icons/arrow-right.svg"
              alt="arrow-right"
              class="w-6 h-6 light-filter icon-image"
            />
            {{ $t('buttons.previous') }}
          </core-button>
        </div>
        الخطوة رقم {{ currentStep }} من {{ totalSteps }}
      </h3>
      <h1 class="text-light font-bold lg:text-3xl text-xl lg:mb-14 mb-10 relative">
        <transition name="fade-up" mode="out-in">
          <div v-if="currentStep === 1">ما هو مجالك الصناعي؟</div>
          <div v-else-if="currentStep === 2">كم عدد المركبات أو الأسطول التي تديرها؟</div>
          <div v-else-if="currentStep === 3">كيف يمكننا التواصل معك؟</div>
        </transition>
      </h1>
    </ui-page-title>
    <!-- END:: CONTACT US FORM HEADER -->

    <!-- START:: FORM ACTION -->
    <form
      v-if="!successMessage"
      @submit.prevent="onSubmit"
      id="myForm"
      class="!relative overflow-hidden h-full"
    >
      <transition name="fade-up" mode="out-in" appear>
        <component
          :is="activeStep"
          :key="currentStep"
          :items="data?.items ?? []"
          :loading="loading"
          @next-step="nextStep"
        />
      </transition>
    </form>
    <!-- END:: FORM ACTION -->

    <transition name="fade-up" mode="out-in">
      <div
        v-if="successMessage"
        class="step-four-container h-[calc(100vh-192px)] flex items-center justify-center flex-col gap-4"
      >
        <core-lazy-image
          src="/imgs/contact/contact-success.svg"
          placeholder-src="/icon.png"
          alt="success"
          class="lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] lg:mb-12 mb-6 animation_up_and_down"
        />
        <h1 class="text-light font-bold lg:text-3xl text-xl lg:mb-6 mb-4 relative">
          تم إرسال طلبك بنجاح
        </h1>
        <h3 class="text-light font-normal lg:text-lg text-base relative text-center">
          سيتم التواصل معك عن طريق فريقنا في أقرب وقت ممكن
        </h3>
        <core-button class="mt-4" to="/">
          {{ $t('buttons.go_to_home') }}
        </core-button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { stepFields, useFormAction } from './useFormAction';

type TStep = 'first' | 'second' | 'third';

const { validationSchema, currentStep } = useFormAction();
const { $http } = useNuxtApp();
const loading = ref(false);
const successMessage = ref(false);
const totalSteps = 3;

const mapStep: Record<number, TStep> = { 1: 'first', 2: 'second', 3: 'third' };

const activeStep = computed(() => {
  if (!currentStep.value) return null;

  return defineAsyncComponent(() => import(`./steps/${mapStep[currentStep.value]}.vue`));
});

// Form setup with vee-validate - initialValues preserve values between steps
const { handleSubmit, values, validateField } = useForm({
  initialValues: {
    industry: '',
    fleet_size: '',
    first_name: '',
    last_name: '',
    phone: '',
    company_name: '',
    company_email: '',
  },
  validationSchema,
  keepValuesOnUnmount: true,
});

// Industry options
const industryItems = [
  { value: 'public_sector' },
  { value: 'construction' },
  { value: 'trucking' },
  { value: 'tracking' },
  { value: 'field_services' },
  { value: 'oil_gas' },
  { value: 'other' },
];

// Fleet size options
const fleetSizeItems = [
  { value: '1_9' },
  { value: '10_49' },
  { value: '50_149' },
  { value: '150_999' },
  { value: '1000_plus' },
];

const fleetSizeWithTrackingItems = [
  { value: '1_10k' },
  { value: '10k_50k' },
  { value: '50k_100k' },
  { value: '100k_200k' },
  { value: '200k_plus' },
];

const fleetItems = computed(() => {
  const source = values.industry === 'tracking' ? fleetSizeWithTrackingItems : fleetSizeItems;
  return source.map(item => ({ label: item.value, value: item.value }));
});

// Data items per step
const data = computed(() => {
  const items: Record<number, any[]> = {
    1: industryItems,
    2: fleetItems.value,
    3: [],
  };
  return { items: items[currentStep.value] };
});

// Validate current step fields
const validateCurrentStep = async (): Promise<boolean> => {
  const fields = stepFields[currentStep.value] ?? [];
  const results = await Promise.all(fields.map(field => validateField(field)));
  return results.every(result => result.valid);
};

// Navigate to next step
const nextStep = async () => {
  loading.value = true;
  try {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep.value < totalSteps) {
      currentStep.value++;
    }
  } finally {
    loading.value = false;
  }
};

// Submit form
const onSubmit = handleSubmit(async formValues => {
  loading.value = true;
  try {
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    await $http.contactUs.storeContact(formData);
    successMessage.value = true;
    refreshNuxtData('categories');
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.contact-us-page-content-inner {
  position: relative;
  min-height: 300px;
}
</style>
