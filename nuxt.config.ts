// import { getPages } from '~/utils/generate'
// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from "vite-plugin-glsl";
import { getPages } from "./utils/generate";
const packageName = process.env.npm_package_name
  ? process.env.npm_package_name.charAt(0).toUpperCase() +
    process.env.npm_package_name.slice(1)
  : "Nuxt";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NODE_ENV: process.env.NODE_ENV,
      PROJECT_NAME: packageName,
      BASE_URL: process.env.BASE_URL,
      STRAPI_URL: process.env.STRAPI_URL,
      STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
      ASSET_URL: process.env.ASSET_URL,
    },
  },
  components: [
    {
      global: true,
      path: "~/components",
      pathPrefix: false,
    },
  ],

  modules: ["@pinia/nuxt", "@hypernym/nuxt-gsap", "@nuxtjs/apollo"],

  css: ["~/assets/css/styles.css"],

  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      observer: true,
    },
    clubPlugins: {},
  },

  devtools: {
    enabled: true,
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint:
          process.env.STRAPI_URL + "/graphql" ||
          "http://localhost:1337/graphql",
        authType: "Bearer",
        authHeader: "Authorization",
      },
    },
  },

  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) {
        return;
      }

      const pages = await getPages();

      pages.forEach((page: string) => {
        nitroConfig?.prerender?.routes?.push(page);
      });
    },
  },

  vite: {
    plugins: [glsl()],
  },
});
