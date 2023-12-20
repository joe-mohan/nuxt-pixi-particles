// import { usePageType } from 'types/types'

export const useStrapiMeta = (data) => {
  const config = useRuntimeConfig()
  const route = useRoute()

  const title = computed(() => {
    return data?.value?.page?.data?.attributes?.meta_data?.title ? data.value.page.data.attributes.meta_data.title : config.public.PROJECT_NAME
  })
  const description = computed(() => {
    return data.value?.page?.data?.attributes?.meta_data?.description ? data.value.page.data.attributes.meta_data.description : config.public.PROJECT_DESCRIPTION
  })

  const metaUrl = computed(() => {
    return `${config.public.BASE_URL}${route.path !== '/' ? route.path : ''}`
  })

  const metaImage = computed(() => {
    if (data?.value?.page?.data?.attributes?.meta_data?.image?.data?.attributes) {
      return useMedia().outputImage(data.value?.page?.data.attributes.meta_data?.image?.data?.attributes, 'medium')
    }
    return null
  })

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: metaImage
  })
}
