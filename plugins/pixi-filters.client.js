import { PixelateFilter } from "pixi-filters";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("PixelateFilter", PixelateFilter);
});
