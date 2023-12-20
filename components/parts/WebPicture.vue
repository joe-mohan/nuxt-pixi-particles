<script setup>
// Props (props, emits etc)
const props = defineProps({
  image: {
    type: Object,
    default: () => ({})
  },
  max: {
    type: String,
    default: 'massive'
  },
  min: {
    type: String,
    default: 'tiny'
  },
  loading: {
    type: String,
    default: 'lazy'
  },
  classname: {
    type: String,
    default: ''
  }
})

// Composables
const {
  hasWebpVersion,
  outputImage,
  outputImageWebpSrcset,
  outputImageSrcset,
  outputImageWidth,
  outputImageHeight,
  defaultSizes
} = useMedia()

// Computed
const outputSizes = computed(() => {
  const sizes = defaultSizes.map(size => size.name)

  const minIndex = sizes.includes(props.min) ? sizes.indexOf(props.min) : 0

  const maxIndex = sizes.includes(props.max)
    ? sizes.indexOf(props.max)
    : sizes.length

  return sizes.slice(maxIndex, minIndex + 1)
})

const altText = computed(() => {
  return props?.image?.alternativeText
    ? props?.image?.alternativeText.replace(
      '/.(jpeg|jpg|png|webp|gif|svg)/gi',
      ''
    )
    : ''
})
</script>

<template>
  <picture v-if="image">
    <source
      v-if="hasWebpVersion(image, min)"
      :srcset="outputImageWebpSrcset(image, outputSizes)"
      type="image/webp"
      sizes="100vw"
    >
    <img
      :alt="altText"
      :src="outputImage(image, min)"
      :srcset="outputImageSrcset(image, outputSizes)"
      :width="outputImageWidth(image)"
      :height="outputImageHeight(image)"
      :class="classname"
      sizes="100vw"
      :loading="loading"
      draggable="false"
    >
  </picture>
</template>
