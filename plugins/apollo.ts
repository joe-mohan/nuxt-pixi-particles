export default defineNuxtPlugin((nuxtApp) => {
  // access cookie for auth
  const runtimeConfig = useRuntimeConfig()
  // const cookie = useCookie('<cookie_name>')
  nuxtApp.hook('apollo:auth', ({ client, token }) => {
    // `client` can be used to differentiate logic on a per client basis.
    // apply apollo client token
    token.value = runtimeConfig.public.STRAPI_API_TOKEN ? `Bearer ${runtimeConfig.public.STRAPI_API_TOKEN}` : 'Bearer'
  })

  nuxtApp.hook('apollo:error', (error) => {
    console.error('apollo:error', error)
    const message = error?.graphQLErrors[0]?.message
    showError({ statusCode: 404, statusMessage: message })
  })
})
