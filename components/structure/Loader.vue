<script setup>
// Defines (props, emits etc)
const emit = defineEmits(['loadingDone'])

// Template Refs
const loaderRef = ref(null)

// Refs/Reactives
const showLoader = ref(true)

// Composables
const nuxtApp = useNuxtApp()

// Methods
const start = () => {
  // Show loader and start any loader animations here
  console.log('start')
  showLoader.value = true
}

const finish = () => {
  // Simulate a delay

  // Hide loader emit loading done event here
  setTimeout(() => {
    console.log('finish')
    showLoader.value = false
    emit('loadingDone')
  }, 2000)
}

// Lifecycle Hooks
nuxtApp.hook('page:start', start)
nuxtApp.hook('page:finish', finish)
</script>

<template>
  <transition name="fade">
    <div
      v-if="showLoader"
      ref="loaderRef"
      class="fixed inset-0 z-40 h-full w-full bg-green-400"
    />
  </transition>
</template>
