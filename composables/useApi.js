export const useApi = (request, opts) => {
  const config = useRuntimeConfig()

  return useFetch(request, {
    baseURL: config.public.API_URL,
    headers: {
      Authorization: `Bearer ${config.public.STRAPI_API_TOKEN}`
    },
    ...opts
  })
}
