<script setup>
import { Application, Assets } from 'pixi.js'
import * as particles from '@pixi/particle-emitter'
const { $gsap, $ScrollTrigger } = useNuxtApp()

const mainRef = ref(null)
const canvasRef = ref(null)

onMounted(async () => {
  const app = new Application({
    view: canvasRef.value,
    backgroundAlpha: 0,
    resizeTo: window
  })

  // use gsap ticker
  app.ticker.stop()
  $gsap.ticker.add(() => {
    app.ticker.update()
  })

  document.body.appendChild(app.view) // maybe change this to mainRef.value

  // texture
  const particle = await Assets.load('/particle.png')

  // each button
  mainRef.value.querySelectorAll('.pixi-btn').forEach((el) => {

    
    // particle emitter

    const emitter = new particles.Emitter(
      app.stage,
      particles.upgradeConfig({
        // copy/import from https://pixijs.io/pixi-particles-editor
        "alpha": {
          "start": 0.49,
          "end": 1
        },
        "scale": {
          "start": 0.01,
          "end": 0.3,
          "minimumScaleMultiplier": 1
        },
        "color": {
          "start": "#ff3705",
          "end": "#ffcd03"
        },
        "speed": {
          "start": 200,
          "end": 50,
          "minimumSpeedMultiplier": 1
        },
        "acceleration": {
          "x": 0,
          "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
          "min": 0,
          "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
          "min": 0,
          "max": 0
        },
        "lifetime": {
          "min": 0.2,
          "max": 0.8
        },
        "blendMode": "normal",
        "frequency": 0.05,
        "emitterLifetime": -1,
        "maxParticles": 50,
        "pos": {
          "x": 0,
          "y": 0
        },
        "addAtBack": false,
        // "spawnType": "point"
        "spawnRect":{ x: -(el.offsetWidth / 2), y: -(el.offsetHeight / 2), w: el.offsetWidth, h: el.offsetHeight },
        "spawnType": "rect"
      },
      // particle texture
      particle)
    )

    // stop emitting, scrolltrigger will handle this
    emitter.emit = false


    // update particles loop

    let elapsed = Date.now()
    const update = function () {
      // The emitter requires the elapsed
      // number of seconds since the last update
      const now = Date.now()
      emitter.update((now - elapsed) * 0.001)
      elapsed = now
    }

    app.ticker.add((delta) => {
      update()
    })

    // entrance anim

    const entrance = $gsap.from(el, {
      opacity: 0,
      x: -2000,
      duration: 0.1,
      ease: 'power2.out'
    })

    // scrolltrigger

    $ScrollTrigger.create({
      trigger: el,
      animation: entrance,
      toggleActions: 'play reverse play reverse',      
      onUpdate ({ progress, isActive }) {
        if (isActive) {
          const x = window.scrollX + el.getBoundingClientRect().left + el.offsetWidth / 2
          const y = app.renderer.height - (app.renderer.height * progress)
          emitter.updateSpawnPos(x, y)
          emitter.emit = true
        } else {
          emitter.emit = false
        }
      }
    })

    // interaction

    let isHovering = false

    const interact = function () {
      isHovering = !isHovering

      emitter.getBehavior('color').list.reset(
        particles.ParticleUtils.createSteppedGradient(
          [
            {
              value: 'fb1010',
              time: 0
            },
            {
              value: isHovering ? '00ff44' : '00ceff',
              time: 1
            }
          ]),
      );
      emitter.getBehavior('scale').minMult = isHovering ? 4 : 1
      emitter.spawnChance = isHovering ? 1 : 0.5
    }

    el.addEventListener('mouseover', interact);
    el.addEventListener('mouseout', interact);
  })
})
</script>

<template>
  <div ref="mainRef" class="container">
    <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />

    <section v-for="x in 10" :key="x" class="relative z-10 py-128 flex min-h-screen items-center gap-64 flex-wrap justify-center text-black">
      <button class="pixi-btn bg-[#ffcd03] hover:bg-[#00ff44] duration-300 rounded py-4 px-16" v-for="y in 1" :key="y">
      hover
      </button>
    </section>

    <section v-for="x in 10" :key="x" class="relative z-10 py-128 flex min-h-screen items-center gap-64 flex-wrap justify-center text-black">
      <button class="pixi-btn bg-[#ffcd03] hover:bg-[#00ff44] duration-300 rounded py-4 px-16" v-for="y in 12" :key="y">
      hover
      </button>
    </section>

    <section v-for="x in 10" :key="x" class="relative z-10 py-128 flex min-h-screen items-center gap-64 flex-wrap justify-center text-black">
      <button class="pixi-btn bg-[#ffcd03] hover:bg-[#00ff44] duration-300 rounded py-4 px-16" v-for="y in 64" :key="y">
      hover
      </button>
    </section>
  </div>
</template>
