import { useStore } from '~/store'

export default defineNuxtPlugin(async () => {
  const store = useStore()
  // await store.fetchGlobal()
})
