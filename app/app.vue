<template>
  <UApp :locale="appLocale" :toaster="toaster">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale } = useI18n();
const appLocale = computed(() => locales[locale.value as keyof typeof locales]);
const lang = computed(() => appLocale.value?.code);
const dir = computed(() => appLocale.value?.dir);
const toaster = { position: "top-right" as const };
useHead({
  title: "جوويب",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "نساعدك في بناء جوويبك الرقمي وحملاتك الإعلانية وصناعة محتواك الرقمي بإبداع مع حسن التخطيط والإدارة . مع فريق جوويب نصنع من كل مبدع فنان",
    },
    { name: "google", content: "notranslate" },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
  script: [
    {
      src: "https://demo.myfatoorah.com/cardview/v2/session.js",
      type: "text/javascript",
      defer: true,
    },
  ],
  htmlAttrs: {
    lang,
    dir,
  },
});
</script>
