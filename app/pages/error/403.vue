<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center">
      <!-- 403 Icon/Illustration -->
      <div class="mb-8">
        <div
          class="inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-100 dark:bg-red-900/20"
        >
          <svg
            class="w-20 h-20 text-red-600 dark:text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      </div>

      <!-- Error Code -->
      <h1 class="text-8xl font-bold text-gray-900 dark:text-white mb-4">403</h1>

      <!-- Error Title -->
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">غير مصرح بالوصول</h2>

      <!-- Error Description -->
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        عذراً، ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة. يرجى التواصل مع المسؤول إذا كنت
        تعتقد أن هذا خطأ.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <UButton size="lg" color="primary" @click="navigateTo('/')" icon="i-heroicons-home">
          الذهاب للرئيسية
        </UButton>

        <UButton
          size="lg"
          color="neutral"
          variant="ghost"
          @click="goBack"
          icon="i-heroicons-arrow-left"
        >
          العودة للخلف
        </UButton>

        <!-- <UButton
          size="lg"
          color="error"
          variant="soft"
          @click="handleLogout"
          icon="i-heroicons-arrow-right-on-rectangle"
        >
          تسجيل الخروج
        </UButton> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: false,
});

const router = useRouter();

const goBack = () => {
  // Check if there's a history to go back to
  if (window.history.length > 1) {
    router.back();
  } else {
    navigateTo('/');
  }
};


</script>
