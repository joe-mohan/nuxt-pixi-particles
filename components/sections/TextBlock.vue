<template>
  <section>
    <div class="container">
      <div class="prose" v-html="body" />
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    default: () => {},
    required: true
  }
})

const body = computed(() => {
  return useParse(props.section?.body)
})
</script>

<style lang="postcss">

</style>
