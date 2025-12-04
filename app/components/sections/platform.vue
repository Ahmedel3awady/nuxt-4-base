<template>
  <section
    id="platform-section"
    class="platform-section-content py-24 rounded-4xl"
  >
    <UContainer>
      <div class="platform-section-content-inner text-center">
        <div
          class="mb-[120px]"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="200"
        >
          <h2 class="text-light-gray lg:text-5xl text-4xl font-bold mb-6">
            منصة كاملة لإدارة الأساطيل.
          </h2>
          <h2 class="text-light-gray lg:text-5xl text-3xl font-bold mb-10">
            رؤية موحدة وتشغيل أكثر ذكاء
          </h2>
          <p class="text-light-gray lg:text-2xl text-xl font-normal">
            ومة متكاملة لإدارة المركبات و السائقين ، تشمل التتبع الحظي ، وإدارة
            الأعطال و الفحوصات ، وجدولة خطوط السير ، وتحليل الأداء.
          </p>
          <p class="text-light-gray lg:text-2xl text-xl font-normal mb-12">
            كل ما تحتاجه لإدارة أسطولك بكفاءة ووضوح نقدمه لك ضمن نظام موحد يربط
            الميدان بالمكتب.
          </p>
          <h3 class="text-light-gray lg:text-3xl text-2xl font-bold mb-4">
            وضبط شريكك في رحلة التحول التشغيلي.
          </h3>
          <p class="text-light-gray lg:text-2xl text-xl font-normal">
            نحن لا نري التحكم مجرد أداة ، بل نؤمن بأنه أساس التشغيل الذكي
            للمستقبل.
          </p>
        </div>
        <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="200">
          <h3 class="text-light-gray text-2xl font-semibold mb-10">
            دعم متكامل مع ضبط
          </h3>
          <div
            class="support-cards flex items-center justify-center gap-4 flex-wrap"
          >
            <!-- START:: SUPPORT CARD -->
            <div
              class="support-card flex items-center justify-center gap-2 rounded-lg border border-[#F6FAF633] p-4 bg-[#F6FAF633]"
              v-for="card in cards"
              :key="card.id"
            >
              <span class="support-card-icon w-7 h-7 relative">
                <img
                  :src="`/imgs/platform/support-${card.id}.svg`"
                  :alt="card.title"
                  class="w-full h-full object-cover"
                />
              </span>
              <h4 class="text-light-gray lg:text-lg text-sm font-normal">
                {{ card.title }}
              </h4>
            </div>
            <!-- END:: SUPPORT CARD -->
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    id: 1,
    title: "GPS أجهزة تتبع",
  },
  {
    id: 2,
    title: "حساسات الحرارة و الرطوبة",
  },
  {
    id: 3,
    title: "حساسات الوزن والحمولة",
  },
  {
    id: 4,
    title: "حساسات الوقود",
  },
  {
    id: 5,
    title: "كاميرات القيادة",
  },
  {
    id: 6,
    title: "أنظمة الصيانة",
  },
  {
    id: 7,
    title: "(ERP) أنظمة الإدارة الداخلية للشركات",
  },
];
</script>
<style scoped>
.platform-section-content {
  background: linear-gradient(
    180.34deg,
    #050607 0.29%,
    #436423 63.39%,
    #73ab35 117.16%
  );
  border-radius: 32px;
  position: relative;
  isolation: isolate;
}
.platform-section-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/imgs/general/section-bg.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}
.support-cards .support-card * {
  transition: all 0.3s ease-in-out;
}
.support-cards .support-card:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  cursor: help;
}
.support-cards .support-card:hover h4 {
  color: var(--color-secondary);
}

.support-cards .support-card:hover span img {
  filter: var(--secondary-filter);
  transition: all 0.3s ease-in-out;
}
</style>
