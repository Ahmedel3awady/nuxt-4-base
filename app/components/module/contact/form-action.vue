<template>
  <div class="contact-us-page-content-inner">
    <!-- START:: CONTACT US FORM HEADER -->
    <ui-page-title
      class="contact-form-header text-center"
      v-if="!successMessage"
    >
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
            {{ $t("buttons.previous") }}
          </core-button>
        </div>
        الخطوة رقم {{ currentStep }} من {{ totalSteps }}

      </h3>
      <h1 class="text-light font-bold lg:text-3xl text-xl lg:mb-14 mb-10 relative">
        <transition name="fade-up" mode="out-in">
          <div v-if="currentStep === 1">ما هو مجالك الصناعي؟</div>
          <div v-else-if="currentStep === 2">
            كم عدد المركبات أو الأسطول التي تديرها؟
          </div>
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
        <div v-if="currentStep === 1" key="step1" class="step-one-container">
          <form-radio-group
            v-model="form.industry"
            name="industry"
            :items="
              industryItems.map((item) => ({
                label: $t(`labels.${item.value}`),
                value: item.value.toString(),
                icon: `/imgs/contact/${item.value}.svg`,
              }))
            "
          />
          <div class="flex justify-center">
            <core-button
              type="button"
              :loading="loading"
              class="mt-12 mx-auto"
              @click="nextStep"
            >
              {{ $t("buttons.next") }}
            </core-button>
          </div>
        </div>
        <div
          v-else-if="currentStep === 2"
          key="step2"
          class="step-two-container"
        >
          <form-radio-group
            v-model="form.fleet_size"
            name="fleet_size"
            :items="fleetItems"
            class="big-radio-group"
          />

          <div class="flex justify-center">
            <core-button
              :loading="loading"
              class="mt-12 mx-auto"
              @click="nextStep"
            >
              {{ $t("buttons.next") }}
            </core-button>
          </div>
        </div>
        <div
          v-else-if="currentStep === 3"
          key="step3"
          class="step-three-container"
        >
          <UCard
            class="rounded-2xl py-8 px-4 lg:px-8 lg:w-[515px] w-full mx-auto"
            :ui="{ body: '!p-0' }"
          >
            <template #default>
              <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <form-input
                  name="first_name"
                  :placeholder="$t('placeholder.first_name')"
                  :label="$t('labels.first_name')"
                  required
                  v-model="form.first_name"
                  class="col-span-2 lg:col-span-1"
                />
                <form-input
                  name="last_name"
                  :placeholder="$t('placeholder.last_name')"
                  :label="$t('labels.last_name')"
                  required
                  v-model="form.last_name"
                  class="col-span-2 lg:col-span-1"
                />
                <form-input
                  name="phone"
                  :placeholder="$t('placeholder.phone')"
                  :label="$t('labels.phone')"
                  required
                  class="col-span-2"
                  v-model="form.phone"
                />
                <form-input
                  name="company_name"
                  :placeholder="$t('placeholder.company_name')"
                  :label="$t('labels.company_name')"
                  required
                  class="col-span-2"
                  v-model="form.company_name"
                />
                <form-input
                  name="company_email"
                  :placeholder="$t('placeholder.company_email')"
                  :label="$t('labels.company_email')"
                  required
                  class="col-span-2"
                  v-model="form.company_email"
                />
                <core-button
                  type="submit"
                  :loading="loading"
                  class="!w-full col-span-2 mt-8"
                >
                  {{ $t("buttons.send") }}
                </core-button>
              </div>
            </template>
          </UCard>
        </div>
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
          {{ $t("buttons.go_to_home") }}
        </core-button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { object, string } from "yup";
import { toTypedSchema } from "@vee-validate/yup";
const { $http } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const successMessage = ref(false);

const currentStep = ref(1);
const totalSteps = 3;
const form = ref({
  industry: "",
  fleet_size: "",
  first_name: "",
  last_name: "",
  phone: "",
  company_name: "",
  company_email: "",
});

const industryItems = [
  {
    value: "public_sector",
  },
  {
    value: "construction",
  },
  {
    value: "trucking",
  },
  {
    value: "tracking",
  },
  {
    value: "field_services",
  },
  {
    value: "oil_gas",
  },
  {
    value: "other",
  },
];
const fleetSizeItems = [
  {
    value: "1_9",
  },
  {
    value: "10_49",
  },
  {
    value: "50_149",
  },
  {
    value: "150_999",
  },
  {
    value: "1000_plus",
  },
];
const fleetSizeWithTrackingItems = [
  {
    value: "1_10k",
  },
  {
    value: "10k_50k",
  },
  {
    value: "50k_100k",
  },
  {
    value: "100k_200k",
  },
  {
    value: "200k_plus",
  },
];
const fleetItems = computed(() => {
  const source =
    form.value.industry === "tracking"
      ? fleetSizeWithTrackingItems
      : fleetSizeItems;

  return source.map((item) => ({
    label: item.value,
    value: item.value.toString(),
  }));
});
const { handleSubmit, values, setValues, validateField } = useForm<{
  [key: string]: any;
}>({
  initialValues: {
    industry: "",
    fleet_size: "",
    first_name: "",
    last_name: "",
    phone: "",
    company_name: "",
    company_email: "",
  },
  validationSchema: toTypedSchema(
    object({
      industry: string().required($t("errors.required")),
      // fleet_size: string().required($t("errors.required")),
      first_name: string().required($t("errors.required")),
      last_name: string().required($t("errors.required")),
      phone: string().required($t("errors.required")),
      company_name: string().required($t("errors.required")),
      company_email: string().required($t("errors.required")),
    })
  ),
});

const generateData = () => {
  const formData = new FormData();
  setValues({ ...form.value });
  for (const key in values) {
    // if (key.includes("_")) {
    //   // const [lang, value] = key.split("_");
    //   formData.append(`${lang}[${value}]`, values[key]);
    // } else {
    // }
    formData.append(key, values[key]);
  }
  return formData;
};
const onSubmit = handleSubmit(async () => {
  try {
    loading.value = true;
    setValues({ ...form.value });
    await $http.contactUs.storeContact(generateData());
    loading.value = false;
    successMessage.value = true;
    // if (redirect) {
    //   setTimeout(() => {
    //     router.push(
    //       route.path.toString().includes('sub-categories')
    //         ? `/categories/${route.params.id}/sub-categories`
    //         : '/categories'
    //     );
    //   }, 1500);
    // } else {
    //   // emit('onSuccessSubmit');
    // }
    refreshNuxtData("categories");
  } finally {
    loading.value = false;
  }
});

const nextStep = async () => {
  try {
    loading.value = true;
    let result;

    setValues({ ...form.value });
    if (currentStep.value === 1) {
      result = await validateField("industry");
      setValues({ ...form.value });
    }

    if (currentStep.value === 2) {
      result = await validateField("fleet_size");
      setValues({ ...form.value });
    }

    if (!result?.valid) return;

    if (currentStep.value < totalSteps) {
      currentStep.value++;
    }
  } finally {
    loading.value = false;
  }
};
</script>
<style scoped>
.contact-us-page-content-inner {
  position: relative;
  min-height: 300px;
}
</style>
