<template>
  <main class="home-page-content">
    <!-- START:: HERO SECTION -->
    <sections-hero-section />
    <!-- END:: HERO SECTION -->

    <!-- START:: FEATURES SECTION -->
    <sections-features-section />
    <!-- END:: FEATURES SECTION -->
     
  </main>
</template>

<script setup lang="ts">
const images = [
  "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
  "/imgs/sample2.jpg",
  "/imgs/sample3.jpg",
  "/imgs/sample4.jpg",
  "/imgs/sample5.jpg",
  "/imgs/sample6.jpg",
];
// definePageMeta({
//   name: 'home',
//   permission: 'show_statuses_reports',
//   breadcrumb: [
//     {
//       label: 'الرئيسية',
//     },
//   ],
// });

// const { $api } = useNuxtApp();

// const { data: mostRequestedCategories, pending: loadingCategories } = useLazyAsyncData(
//   'dashboard-most-requested-categories',
//   () => $api<any>('dashboard/pages/statics/mostRequestedCategories').then(res => res ?? []),
//   { default: () => [] }
// );

// const { data: sourceStates, pending: loadingSourceStates } = useLazyAsyncData(
//   'dashboard-source-stats',
//   () => $api<any>('dashboard/pages/statics/sourceStats').then(res => res ?? []),
//   { default: () => [] }
// );

// const { data: failureReasons, pending: loadingFailureReasons } = useLazyAsyncData(
//   'dashboard-failure-reasons',
//   () => $api<any>('dashboard/pages/statics/failureReasons').then(res => res ?? []),
//   { default: () => [] }
// );

// const { data: lastFiveOrders, pending: loadingLastFiveOrders } = useLazyAsyncData(
//   'dashboard-last-five-orders',
//   () => $api<any>('dashboard/pages/statics/getLastFiveOrders').then(res => res ?? []),
//   { default: () => [] }
// );

// const { data: employeePerformance, pending: loadingEmployeePerformance } = useLazyAsyncData(
//   'dashboard-employee-performance',
//   () => $api<any>('dashboard/pages/statics/employeePerformance').then(res => res ?? []),
//   { default: () => [] }
// );

// const { data: monthlySales, pending: loadingMonthlySales } = useLazyAsyncData(
//   'dashboard-monthly-sales',
//   () => $api<any>('dashboard/pages/statics/getMonthlySales').then(res => res ?? []),
//   { default: () => [] }
// );
</script>
