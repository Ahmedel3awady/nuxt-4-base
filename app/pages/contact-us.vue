<template>
  <main class="contact-us-page-content lg:py-24 py-10">
    <UContainer>
      <module-contact-form-action />
    </UContainer>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "contact",
});

import * as locales from "@nuxt/ui/locale";
const { locale } = useI18n();
const { t } = useI18n();
const appLocale = computed(() => locales[locale.value as keyof typeof locales]);
const lang = computed(() => appLocale.value?.code);
const dir = computed(() => appLocale.value?.dir);


useHead({
  title: `${t("app.title")} - ${t("titles.contact_out_team")}`,
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
