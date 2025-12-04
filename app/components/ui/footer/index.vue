<template>
  <footer class="footer-content lg:pt-24 pt-10">
    <UContainer>
      <div class="footer-content-inner">
        <div class="footer-content-inner-top flex items-center flex-col gap-6">
          <core-lazy-image
            src="/imgs/logo/logo.svg"
            placeholder-src="/imgs/logo/logo.svg"
            alt="logo"
            class="w-[132px] h-[32px] secondary-filter"
          />
          <p
            class="text-gray lg:text-xl text-lg font-normal w-full lg:w-[50%] text-center"
          >
            {{ $t("app.description") }}
          </p>
        </div>
        <div
          class="footer-content-inner-bottom border-t border-[#DFE0E0] mt-14 py-6 flex items-center justify-between flex-col lg:flex-row gap-6"
        >
          <div class="footer-content-inner-bottom-left">
            <h4 class="text-gray lg:text-base text-sm font-medium">
              {{ $t("titles.all_rights_reserved") }} {{ $t("app.title") }}
              <strong>©</strong> {{ new Date().getFullYear() }}
            </h4>
          </div>
          <div class="footer-content-inner-bottom-right">
            <core-social :links="socialLinks" />
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const socialLinks = [
  // {
  //   name: "facebook",
  //   link: "https://www.facebook.com/dabt.sa",
  //   icon: "facebook.svg",
  // },
  {
    name: "instagram",
    link: "https://www.instagram.com/dabt.sa",
    icon: "instagram.svg",
  },
  {
    name: "x",
    link: "https://www.x.com/dabt.sa",
    icon: "x.svg",
  },
  // {
  //   name: "youtube",
  //   link: "https://www.youtube.com/dabt.sa",
  //   icon: "youtube.svg",
  // },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/dabt.sa",
    icon: "linkedin.svg",
  },
];
</script>

<style></style>
