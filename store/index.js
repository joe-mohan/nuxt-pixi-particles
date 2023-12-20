import { defineStore } from 'pinia'
import globalQuery from '~/apollo/global'

// Docs https://pinia.vuejs.org/

export const useStore = defineStore({
  id: 'main',
  state: () => {
    return {
      global: {},
      test: 'test'
    }
  },
  actions: {
    async fetchGlobal () {
      const response = await useAsyncQuery(globalQuery)
      this.global = response?.data?.value?.global?.data
    }
  },
  getters: {
    getGlobal: (state) => { return state.global }
  }
})
