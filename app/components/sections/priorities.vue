<template>
  <section
    id="priorities-section"
    class="priorities-section-content py-24 rounded-4xl"
  >
    <UContainer>
      <div class="priorities-section-content-inner text-center">
        <div
          class="mb-12"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="200"
        >
          <h3 class="text-secondary lg:text-2xl text-xl font-normal mb-4">
            أولوياتنا: ما نصنعه اليوم للمستقبل يبدأ من البنية
          </h3>
          <h2 class="text-secondary lg:text-3xl text-2xl font-semibold mb-6">
            في ضبط نضع الأمان و الإعتمادية وتجربة المستخدم في صميم كل ما نبنيه.
          </h2>
          <h2 class="text-secondary lg:text-3xl text-2xl font-semibold">
            نطور حلولنا بمعايير عالية تناسب بيئة الاعمال في الممكلة و تواكب
            تطلعات التحول الرقمي الوطني.
          </h2>
        </div>
        <div
          class="priorities-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap"
        >
          <!-- START:: SUPPORT CARD -->
          <div
            class="priority-card rounded-2xl border border-secondary-gray py-[110px] px-10 bg-primary-light"
            v-for="card in cards"
            :key="card.id"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="250"
          >
            <h4 class="text-secondary text-2xl font-bold mb-6">
              {{ card.title }}
            </h4>
            <p class="text-[#636463] text-lg font-normal">
              {{ card.desc }}
            </p>
          </div>
          <!-- END:: SUPPORT CARD -->
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    id: 1,
    title: "منتج مُصنع محلياً",
    desc: "ضبط منتج سعودي صُمم وطُور ليتوافق مع متطلبات الشركات المحلية وبيئة التشغيل.",
  },
  {
    id: 2,
    title: "تشفير كامل للبيانات",
    desc: "بيانات شركتك مشفرة أثناء النقل و التخزين ، باستخدام برتوكولات أمان حديثة تحمي معلوماتك من الوصول غير المصرح به.",
  },
  {
    id: 3,
    title: "إستضافة سعودية 100%",
    desc: "جميع بياناتك تُخزن و تُعالج داخل المملكة علي خوادم خاصة وآمنة ، وفق ضوابط الهيئة السعودية للبيانات و الذكاء الاصطناعي (سدايا).",
  },
];
</script>
<style scoped>
.priority-card * {
  transition: all 0.3s ease-in-out;
}

.priority-card h4 {
  line-height: 32px;
  background: linear-gradient(
    269.7deg,
    #050607 23.48%,
    #436423 52.79%,
    #73ab35 77.76%
  );
  background-size: 200% auto;
  background-position: 50% center;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 1.5s ease-in-out;
}

.priority-card:hover h4 {
  animation: shine 1.5s ease-in-out infinite;
}
@keyframes shine {
  from {
    background-position: 50% center;
  }
  to {
    background-position: 250% center;
  }
}
</style>
