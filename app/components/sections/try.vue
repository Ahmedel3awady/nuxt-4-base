<template>
  <section id="try-section" class="try-section-content">
    <UContainer>
      <div
        class="try-section-content-inner grid grid-cols-1 md:grid-cols-2 gap-8 lg:px-[64px] px-5"
      >
        <div
          class="try-section-content-inner-left lg:py-18 py-20"
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-delay="200"
        >
          <h4 class="text-light text-2xl font-normal">
            لا تؤجّل التطوير . جرب ضبط اليوم!
          </h4>
          <h2 class="text-light text-[28px] font-bold my-8">
            ابدأ رحلتك مع «ضبط» واكتشف كيف يمكن لإدارة الأسطول الذكية أن تخفّض
            التكاليف ، و وتحسّن الكفاءة ، وتمنحك رؤية أوضح لعملياتك اليومية.
          </h2>
          <core-button class="mb-5">
            {{ $t("titles.contact_out_team") }}
          </core-button>
          <ul>
            <li class="flex items-center gap-2">
              <img src="/imgs/icons/check.svg" alt="check" />
              <span class="text-light-gray text-sm font-normal">
                بنية سعودية آمنة
              </span>
            </li>
          </ul>
        </div>
        <div
          class="try-section-content-inner-right flex items-end justify-center"
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-delay="200"
        >
          <core-lazy-image src="/imgs/try/try.webp" placeholder-src="/icon.png" alt="try" />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts"></script>
<style scoped>
.try-card * {
  transition: all 0.3s ease-in-out;
}
.try-section-content .try-section-content-inner {
  background: linear-gradient(
    180.34deg,
    #050607 0.29%,
    #436423 82.66%,
    #73ab35 152.84%
  );

  border-radius: 16px;
}
</style>
