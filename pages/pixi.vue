<script setup>
import { Application, Assets, Sprite } from 'pixi.js'
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

  document.body.appendChild(app.view) // maybe change this to mainRef.value

  // load the texture we need
  const texture = await Assets.load('/1m1.jpeg')
  const particle = await Assets.load('/particle.png')

  const emitter = new particles.Emitter(
    app.stage,
    particles.upgradeConfig({
      lifetime: {
        min: 0.5,
        max: 1
      },
      frequency: 0.008,
      spawnChance: 1,
      particlesPerWave: 1,
      // emitterLifetime: 10000,
      maxParticles: 1000,
      pos: {
        x: 0,
        y: 0
      },
      addAtBack: false,
      behaviors: [
        {
          type: 'alpha',
          config: {
            alpha: {
              list: [
                {
                  value: 0.8,
                  time: 0
                },
                {
                  value: 0.1,
                  time: 1
                }
              ]
            }
          }
        },
        {
          type: 'scale',
          config: {
            scale: {
              list: [
                {
                  value: 1,
                  time: 0
                },
                {
                  value: 0.3,
                  time: 1
                }
              ]
            }
          }
        },
        {
          type: 'color',
          config: {
            color: {
              list: [
                {
                  value: 'fb1010',
                  time: 0
                },
                {
                  value: 'f5b830',
                  time: 1
                }
              ]
            }
          }
        },
        {
          type: 'moveSpeed',
          config: {
            speed: {
              list: [
                {
                  value: 200,
                  time: 0
                },
                {
                  value: 100,
                  time: 1
                }
              ],
              isStepped: false
            }
          }
        },
        {
          type: 'rotationStatic',
          config: {
            min: 0,
            max: 360
          }
        },
        {
          type: 'spawnShape',
          config: {
            type: 'torus',
            data: {
              x: 0,
              y: 0,
              radius: 10
            }
          }
        },
        {
          type: 'textureSingle',
          config: {
            texture: particle
          }
        }
      ]
    })
  )

  // gsap
  mainRef.value.querySelectorAll('.pixi-btn').forEach((el) => {
    const entrance = $gsap.from(el, {
      opacity: 0,
      x: -2000,
      duration: 1,
      ease: 'power2.out'
    })

    $ScrollTrigger.create({
      markers: true,
      trigger: el,
      animation: entrance,
      toggleActions: 'play pause resume reset',
      onUpdate ({ progress, isActive }) {
        if (isActive) {
          const x = window.scrollX + el.getBoundingClientRect().left + el.offsetWidth / 2
          const y = app.renderer.height - (app.renderer.height * progress)

          emitter.spawnPos.x = x
          emitter.spawnPos.y = y

          // emitter.emit = true
        } else {
          // emitter.emit = false
        }
      }
    })
  })

  // Calculate the current time
  let elapsed = Date.now()

  // Update function every frame
  const update = function () {
    // Update the next frame
    requestAnimationFrame(update)

    const now = Date.now()

    // The emitter requires the elapsed
    // number of seconds since the last update
    emitter.update((now - elapsed) * 0.001)
    elapsed = now
  }

  // Start emitting
  emitter.emit = true

  // Start the update
  update()
})
</script>

<template>
  <div ref="mainRef" class="container">
    <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />

    <section v-for="x in 4" :key="x" class="relative z-10 flex h-[500px] items-center justify-center text-black">
      <button class="pixi-btn">
        button {{ x }}
      </button>
    </section>
    <section class="relative z-10 flex h-screen  items-center text-black">
      <button class="pixi-btn">
        button left
      </button>
    </section>
    <section class="relative z-10 flex h-screen  items-center justify-end text-black">
      <button class="pixi-btn">
        button right
      </button>
    </section>
  </div>
</template>
