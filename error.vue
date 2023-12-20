<script setup>
// Props
const props = defineProps({
  error: {
    type: Object,
    default: () => {}
  }
})

// Methods
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="default relative w-full overflow-hidden">
    <div class="">
      <!-- <Header :logo="globalStore.attributes?.logoMark?.data?.attributes" /> -->
      <div class="container flex h-screen flex-col items-center justify-center">
        <h1 class="">
          Error {{ error?.statusCode }}
        </h1>
        <p>
          Ooops, something went wrong.
        </p>
        <p v-text="error" />
        <button
          class="w-fit"
          @click="handleError"
        >
          {{ 'Return to Home' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
  h1 {
    font-size: 110px;
    line-height: 87px;
    letter-spacing: 3px
  }
  p {
    margin-bottom: 2rem;
  }
</style>
