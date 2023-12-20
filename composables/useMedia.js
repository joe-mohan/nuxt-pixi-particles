export default function useMedia () {
  const defaultSizes = [
    { name: 'massive', size: 2000 },
    { name: 'xlarge', size: 1600 },
    { name: 'large', size: 1000 },
    { name: 'medium', size: 750 },
    { name: 'small', size: 500 },
    { name: 'tiny', size: 300 }
  ]

  const isValidVariable = (_variable) => {
    let valid = false
    if (typeof _variable !== 'undefined') {
      if (_variable !== 'null' && _variable !== null) {
        if (_variable !== '') {
          valid = true
        }
      }
    }
    return valid
  }

  const hasWebpVersion = (media, size) => {
    return isValidVariable(media?.formats?.[size]?.webp?.url)
  }

  const outputWebpVersion = (media, size) => {
    let img = ''
    if (isValidVariable(media?.url)) {
      img = media.url

      if (isValidVariable(media?.formats?.[size])) {
        img = media.formats[size].url
        if (isValidVariable(media?.formats?.[size]?.webp)) {
          // show this size
          img = media.formats[size].webp.url
        } else {
          // cascade down other available sizes
          for (let i = 0; i < defaultSizes.length; i++) {
            if (isValidVariable(media.formats[defaultSizes[i]?.name])) {
              img = media.formats[defaultSizes[i]?.name].webp.url
            }
          }
        }
      }
    }
    return setAssetDomain(img)
  }

  const outputImage = (media, size) => {
    let img = ''

    if (isValidVariable(media?.url)) {
      img = media.url

      if (isValidVariable(media?.formats?.[size])) {
        // show this size
        img = media?.formats?.[size]?.url
      } else {
        // cascade down other available sizes
        for (let i = defaultSizes.length; i > 0; i--) {
          if (media?.formats?.[defaultSizes?.[i]?.name]) {
            img = media.formats[defaultSizes[i]?.name].url
            break
          }
        }
      }
    }
    return setAssetDomain(img)
  }

  const outputImageWebpSrcset = (media, sizes) => {
    if (media?.formats) {
      const srcSet = sizes
        .map((size, index) => {
          if (media.formats[sizes[index]]) {
            return `${setAssetDomain(media.formats[sizes[index]].webp.url)} ${
              defaultSizes[index].size
            }w`
          }
        })
        .filter(item => item !== undefined)
      return srcSet.join(', ')
    }
  }

  const outputImageSrcset = (media, sizes) => {
    if (media?.formats) {
      const srcSet = sizes
        .map((size, index) => {
          if (media.formats[sizes[index]]) {
            return `${setAssetDomain(media.formats[sizes[index]].url)} ${
              defaultSizes[index].size
            }w`
          }
        })
        .filter(item => item !== undefined)
      return srcSet.join(', ')
    }
  }

  const outputImageWidth = (media) => {
    return media?.formats?.small?.width
      ? media.formats.small.width
      : media?.width
        ? media.width
        : 0
  }

  const outputImageHeight = (media) => {
    return media?.formats?.small?.height
      ? media.formats.small.height
      : media?.height
        ? media.height
        : 0
  }

  const isVideo = (media) => {
    return isValidVariable(media?.mime)
      ? media.mime === 'video/mp4' || media.mime === 'video/webm'
      : false
  }

  const setAssetDomain = (img) => {
    if (img) {
      const runtimeConfig = useRuntimeConfig()
      const url = img
      return /^((http|https):\/\/)/.test(url)
        ? url
        : runtimeConfig.public.ASSET_URL + url
    }
    return ''
  }

  return {
    hasWebpVersion,
    outputImage,
    outputImageWebpSrcset,
    outputImageSrcset,
    outputImageWidth,
    outputImageHeight,
    outputWebpVersion,
    isVideo,
    setAssetDomain,
    defaultSizes
  }
}
