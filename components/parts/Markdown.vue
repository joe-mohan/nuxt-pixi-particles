<script setup>
import { marked } from 'marked'

// Defines (props, emits etc)
const props = defineProps({
  content: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const emit = deinfeEmits(['content-parsed'])

// Computed
const html = computed(() => {
  return props.content && marked.parse(props.content, props.options, markedCallback)
})

// Methods
const markedCallback = () => {
  emit('content-parsed', html.value)
}
</script>

<template>
  <div v-if="html" class="prose" v-html="html" />
</template>
