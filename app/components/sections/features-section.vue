<template>
  <section id="features-section" class="features-section-content py-24">
    <UContainer>
      <core-slider
        :items="cards"
        :slidesPerView="6"
        :spaceBetween="16"
        :autoplay="true"
        :loop="true"
        :breakpoints="{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 6 },
        }"
        class="custom-slider"
      >
        <template #item="{ item, index }">
          <shared-cards-feature
            :item="item"
            :key="index"
            :index="index"
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-delay="200"
          />
        </template>
      </core-slider>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const cards = [
  {
    id: 1,
    title: "رؤية أسطول واضحة",
    icon: "/imgs/features/1.svg",
    desc: "خريطة حية تكشف مكان كل مركبة وسجل حركتها اليومي. تنبيهات فورية وتقارير دقيقة، وصلاحيات مرنة للمستخدمين",
  },
  {
    id: 2,
    title: "فحوصات وإصلاحات موثقة",
    icon: "/imgs/features/2.svg",
    desc: "إدارة بذكاء بصري: صور ، أرسل ، وثّق الإصلاح باسم الفني وتاريخ التنفيذ. تقارير استلام وتسليم مدعومة بالصور و الفيديوهات",
  },
  {
    id: 3,
    title: "خطوط سير مرتبة",
    icon: "/imgs/features/3.svg",
    desc: "إنشاء خطوط السير و ترتيب المحطات ورؤية شاملة للمسارات والمحطات الحالية، وتمييز المنجز و المتجاهل فورًا.",
  },
  {
    id: 4,
    title: "إدارة موظفين الشركة",
    icon: "/imgs/features/4.svg",
    desc: "التحكم في بيانات الموظفين و السائقين و صلاحيتهم بمرونة في مكان واحد",
  },
  {
    id: 5,
    title: "تكامل وإنسجام",
    icon: "/imgs/features/5.svg",
    desc: "يتصل «ضبط» بأنظمة WASL و مراكز الصيانة و منصات ERP عبر واجهات رقمية سهلة ، حتي تكون بيانات متدفقة بسلاسة في منظومة واحدة آمنة و منظمة.",
  },
  {
    id: 6,
    title: "تطبيق السائق",
    icon: "/imgs/features/6.svg",
    desc: "رحلات واضحة من اختيار المركبة المخصصة و عرض خط السير و المحطات المطلوبة. فحوصات ميدانية من تقارير استلام/تسليم/حادث مدعومة بالصور والفيديو وتسجيل الأعطال",
  },
  {
    id: 7,
    title: "تطبيق الموظف",
    icon: "/imgs/features/7.svg",
    desc: "خريطة حية للأسطول ومتابعة الفحوصات و الصيانات للمركبات ، وضبط لصلاحيات التشغيل ومتابعة العمليات التشغيلية للسائقين.",
  },
];
</script>
<style scoped>
/* .custom-slider {
  width: calc(100% - ((100vw - var(--ui-container)) / 2));
  margin-left: auto;
} */
</style>
