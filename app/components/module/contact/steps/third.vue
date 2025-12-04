<template>
  <div key="step3" class="step-three-container">
    <UCard class="rounded-2xl py-8 px-4 lg:px-8 lg:w-[515px] w-full mx-auto" :ui="{ body: '!p-0' }">
      <template #default>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <form-input
            name="first_name"
            :placeholder="$t('placeholder.first_name')"
            :label="$t('labels.first_name')"
            required
            class="col-span-2 lg:col-span-1"
          />
          <form-input
            name="last_name"
            :placeholder="$t('placeholder.last_name')"
            :label="$t('labels.last_name')"
            required
            class="col-span-2 lg:col-span-1"
          />
          <form-input
            name="phone"
            :placeholder="$t('placeholder.phone')"
            :label="$t('labels.phone')"
            required
            class="col-span-2"
          />
          <form-input
            name="company_name"
            :placeholder="$t('placeholder.company_name')"
            :label="$t('labels.company_name')"
            required
            class="col-span-2"
          />
          <form-input
            name="company_email"
            :placeholder="$t('placeholder.company_email')"
            :label="$t('labels.company_email')"
            required
            class="col-span-2"
          />
          <core-button type="submit" :loading="loading" class="!w-full col-span-2 mt-8">
            {{ $t('buttons.send') }}
          </core-button>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
</script>

<style lang="scss" scoped></style>
