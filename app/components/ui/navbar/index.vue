<template>
  <!-- Mobile Top Bar -->
  <div class="flex md:hidden items-center justify-between p-4 border-b">
    <span class="font-bold text-lg">My App</span>

    <!-- Toggle Button -->
    <button
      @click="toggleMenu"
      class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      <UIcon :name="isOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-6 h-6" />
    </button>
  </div>

  <!-- START:: SAMPLE NAVIGATION MENU -->
  <nav
    class="custom-navbar hidden md:flex"
    :class="[
      ' hidden md:flex fixed top-4 left-0 w-full z-50 h-[80px]',
      { 'navbar-scrolling !top-0': isScrolling },
    ]"
  >
    <UContainer class="flex items-center justify-between">
      <div class="site-logo flex items-center justify-between">
        <core-lazy-image
          src="/imgs/logo/logo.svg"
          placeholder-src="/imgs/logo/logo.svg"
          alt="Logo"
          class="w-[132px] h-[32px]"
        />
      </div>
      <div class="flex items-center gap-8">
        <core-button btnClass="btn-link" to="/login"> {{ $t("titles.login") }} </core-button>
        <core-button> {{ $t("titles.contact_out_team") }} </core-button>
      </div>
    </UContainer>
  </nav>

  <!-- START:: NAVIGATION MENU -->
  <!-- <UContainer>
    <UNavigationMenu
      :items="items"
      class="custom-navbar hidden md:flex px-4"
      :class="[
        'custom-navbar hidden md:flex px-4 fixed top-8 left-0 w-full z-50 h-[80px]',
        { 'navbar-scrolling top-0': isScrolling },
      ]"
    >
      <template #item="{ item }">
        <NuxtLink
          v-if="item.to && !item.disabled"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          :class="[
            { 'bg-gray-200 dark:bg-gray-900 font-bold': item.active },
            { 'navbar-item-scrolling': isScrolling },
          ]"
        > 
          <UIcon :name="item.icon" />
          <span>{{ item.label }}</span>

          <span
            v-if="item.badge"
            class="ml-auto text-xs bg-primary text-white px-2 rounded-full"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>

        <div v-else class="px-4 py-2 opacity-50">
          <UIcon :name="item.icon" /> {{ item.label }}
        </div>
      </template>
    </UNavigationMenu>
  </UContainer> -->
  <!-- END:: NAVIGATION MENU -->

  <!-- START:: MOBILE SIDE MENU -->
  <!-- Mobile Side Menu -->
  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-black/40 md:hidden"
      @click.self="toggleMenu"
    >
      <aside class="w-72 h-full bg-white dark:bg-gray-900 p-4">
        <!-- <UNavigationMenu :items="items" orientation="vertical">
          <template #item="{ item }">
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              @click="toggleMenu"
            >
              <UIcon :name="item.icon" />
              {{ item.label }}
            </NuxtLink>
          </template>
        </UNavigationMenu> -->
      </aside>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const isOpen = ref(false);
interface NavItem {
  label: string | any;
  icon?: string | any;
  to?: string | any;
  badge?: string | any;
  active?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// const items = ref<NavItem[]>([
//   {
//     label: "Home",
//     icon: "i-lucide-home",
//     to: "/",
//   },
//   {
//     label: "Docs",
//     icon: "i-lucide-book-open",
//     to: "/docs",
//     badge: "New",
//   },
//   {
//     label: "Blog",
//     icon: "i-lucide-book",
//     to: "/blog",
//   },
//   {
//     label: "GitHub",
//     icon: "i-simple-icons-github",
//     to: "https://github.com/nuxt/ui",
//     badge: "3.8k",
//   },
//   {
//     label: "Help",
//     icon: "i-lucide-circle-help",
//     disabled: true,
//   },
// ]);

const isScrolling = ref(false);

const handleScroll = () => {
  isScrolling.value = window.scrollY >= 16;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.custom-navbar {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease;
}
.custom-navbar {
  transition: all 0.3s ease-in-out;
}

.custom-navbar.navbar-scrolling {
  background-color: var(--color-light);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
.custom-navbar.navbar-scrolling .site-logo .core-lazy-image .original-image {
  filter: var(--secondary-filter);
}
</style>
