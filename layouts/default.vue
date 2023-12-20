<script setup>
// Composables
useStats()

// Methods
const handleLoadingDone = () => {
  console.log('loading done')
}
</script>

<template>
  <div class="">
    <Loader @loading-done="handleLoadingDone" />
    <slot />
  </div>
</template>
