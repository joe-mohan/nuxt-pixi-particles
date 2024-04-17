<script setup>
// Composables
import Lenis from "@studio-freight/lenis";
const { $gsap, $ScrollTrigger } = useNuxtApp();

useStats();

// Methods
const handleLoadingDone = () => {
  console.log("loading done");
};

onMounted(() => {
  const lenis = new Lenis();
  lenis.on("scroll", $ScrollTrigger.update);
  $gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  $gsap.ticker.lagSmoothing(0);
  lenis.scrollTo(0);
});
</script>

<template>
  <div class="bg-black">
    <!-- <Loader @loading-done="handleLoadingDone" /> -->
    <slot />
  </div>
</template>
