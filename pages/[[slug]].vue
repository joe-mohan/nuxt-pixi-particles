<script setup>
// Imports
import pageQuery from '~/apollo/page' // Apollo Query
import { useStore } from '~/store'

// Store
const store = useStore()
const globals = store.global

// Router
const route = useRoute()

// Variables
const variables = {
  slug: route.params.slug || 'home'
}

// Data Fetching
const { data } = await useAsyncQuery(pageQuery, variables)

// Methods
const setComponentName = (section) => {
  const name = section.__typename
  const componentName = name.replace('ComponentSections', '')
  return componentName
}

</script>

<template>
  <div
    v-if="data?.page"
    class="page"
  >
    <component
      :is="setComponentName(section)"
      v-for="(section, index) in data.page.data.attributes.sections"
      :key="section.__typename + index"
      :section="section"
      class=""
    />

    <Footer
      v-if="globals?.attributes?.footer"
      :footer="globalThis?.attributes?.footer"
    />
  </div>
</template>
