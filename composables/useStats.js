import Stats from 'stats-js'

export const useStats = () => {
  onMounted(() => {
    if (process.env.NODE_ENV !== 'development') { return }

    const stats = new Stats()

    stats.showPanel(0)
    document.body.appendChild(stats.dom)

    const animate = () => {
      stats.begin()
      stats.end()

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  })

  onBeforeUnmount(() => {
    if (process.env.NODE_ENV !== 'development') { return }

    document.body.removeChild(stats.dom)
  })
}
