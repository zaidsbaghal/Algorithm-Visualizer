import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1",
      title: "Algorithm  Visualizer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Software Engineer",
        },
      ],
    },
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/colors.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@pinia/nuxt"],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
});
