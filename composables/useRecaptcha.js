import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'

export function useVueRecaptcha (pubicKey) {
  const { vueApp } = useNuxtApp()
  vueApp.use(VueReCaptcha, {
    siteKey: pubicKey,
    loaderOptions: { autoHideBadge: true }
  })
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
  return async (action) => {
    await recaptchaLoaded()
    return await executeRecaptcha(action)
  }
}
