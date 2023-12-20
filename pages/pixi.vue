<script setup>
import { Application, Assets, Sprite } from 'pixi.js'
const { $gsap, $ScrollTrigger } = useNuxtApp()

const mainRef = ref(null)
const canvasRef = ref(null)

onMounted(async () => {
  const app = new Application({
    view: canvasRef.value,
    backgroundAlpha: 0,
    resizeTo: window
  })

  document.body.appendChild(app.view) // maybe change this to mainRef.value

  // load the texture we need
  const texture = await Assets.load('/1m1.jpeg')

  // gsap
  mainRef.value.querySelectorAll('.pixi-btn').forEach((el) => {
    const bunny = new Sprite(texture)

    bunny.width = 200
    bunny.height = 200

    bunny.anchor.x = 0.5
    bunny.anchor.y = 0.5

    $ScrollTrigger.create({
      trigger: el,

      onUpdate ({ progress, isActive }) {
        if (isActive) {
          bunny.x = window.scrollX + el.getBoundingClientRect().left + el.offsetWidth / 2
          bunny.y = app.renderer.height - (app.renderer.height * progress)// + (el.offsetHeight / 2)
          app.stage.addChild(bunny)
        } else {
          app.stage.removeChild(bunny)
        }
      }
    })
  })
})
</script>

<template>
  <div ref="mainRef" class="container">
    <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 h-screen w-screen" />
    <section class="relative flex h-screen  items-center text-black">
      <button class="pixi-btn">
        button left
      </button>
    </section>
    <section v-for="x in 4" :key="x" class="relative flex h-screen items-center justify-center text-black">
      <button class="pixi-btn">
        button {{ x }}
      </button>
    </section>
    <section class="relative flex h-screen  items-center justify-end text-black">
      <button class="pixi-btn">
        button right
      </button>
    </section>
  </div>
</template>
