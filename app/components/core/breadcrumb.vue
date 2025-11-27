<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const route = useRoute();
const breadcrumb = computed(() => route.meta.breadcrumb as BreadcrumbItem[]);
</script>

<template>
  <UBreadcrumb :items="breadcrumb" v-if="breadcrumb">
    <template #separator>
      <span class="mx-2 text-muted">/</span>
    </template>
  </UBreadcrumb>
</template>
