<template>
  <UApp :locale="appLocale" :toaster="toaster" class="overflow-x-hidden">
    <transition name="slither" mode="out-in">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </transition>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale } = useI18n();
const { t } = useI18n();
const appLocale = computed(() => locales[locale.value as keyof typeof locales]);
const lang = computed(() => appLocale.value?.code);
const dir = computed(() => appLocale.value?.dir);
const toaster = { position: "top-right" as const };
useHead({
  title: `${t("app.title")} - ${t("titles.home")}`,
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content: t("app.description"),
    },
    { name: "google", content: "notranslate" },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],

  htmlAttrs: {
    lang,
    dir,
  },
});
</script>
