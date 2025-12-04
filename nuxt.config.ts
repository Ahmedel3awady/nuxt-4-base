import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    port: 39222,
  },

  // SPA mode for static build with authentication
  // ssr: false,

  css: ["~/assets/css/main.css", "~/assets/font/stylesheet.css"],
  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@vee-validate/nuxt", "@vite-pwa/nuxt"],
  pwa: {
    registerType: "autoUpdate",
    strategies: 'generateSW',
    outDir: '.output/public',
    manifest: {
      name: "My App",
      short_name: "MyApp",
      description: "My Nuxt PWA App",
      theme_color: "#73AB35",
      background_color: "#050607",
      display: "standalone",
      start_url: "/",
      lang: "ar",
      icons: [
        {
          src: "/icon.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },

  icon: {
    // Server-side bundling (works even in SPA mode during build)
    serverBundle: {
      collections: [
        "lucide",
        "heroicons",
        "material-symbols",
        "icon-park-outline",
        "line-md",
        "hugeicons",
      ],
    },
    // Client-side bundling as fallback
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },

  experimental: {
    payloadExtraction: false,
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },

    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      whatsappBaseUrl: process.env.WHATSAPP_URL,
      X_API_KEY: process.env.X_API_KEY,
    },
  },
  ui: {
    colorMode: false,
  },
  i18n: {
    defaultLocale: "ar",
  },
  imports: {
    autoImport: true,
    dirs: ["store"],
  },

  vite: {
    optimizeDeps: {
      include: ["to-px", "striptags"],
      esbuildOptions: {
        target: "esnext",
      },
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
    },
    resolve: {
      alias: {
        "to-px": "to-px/browser.js",
        striptags: "striptags/src/striptags.js",
      },
    },
  },

  // Generate static files in dist folder (only for production builds)
  nitro: {
    preset: "static",
  },

  // Output to dist folder only for production builds
  ...(process.env.NODE_ENV === "production" && {
    nitro: {
      preset: "static",
      output: {
        dir: "dist",
        publicDir: "dist",
      },
    },
  }),
});
