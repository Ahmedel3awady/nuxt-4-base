<template>
  <div class="contact-page-layout">
    <slot />
  </div>
</template>
<style scoped>
.contact-page-layout {
  background: linear-gradient(
    209.13deg,
    #050607 17.89%,
    #436423 225.56%,
    #73ab35 402.51%
  );
  height: 100vh;
  isolation: isolate;
  overflow-x: hidden;
  overflow-y: auto;
}
.contact-page-layout::before {
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
  isolation: auto;
}
</style>
