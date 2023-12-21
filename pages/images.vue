<script setup>
import { Application, Assets, Sprite } from 'pixi.js'
import { PixelateFilter } from '@pixi/filter-pixelate';
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

    // each image
    const imgEls = mainRef.value.querySelectorAll('.pixi-img')

    for (const el of imgEls) {
        console.log(el)
        const texture = await Assets.load(el.src);
        //console.log('texture', texture)
        const image = Sprite.from(texture);
        console.log('image', image)

        const filter = new PixelateFilter({size: 0.1})

        image.filters = [filter];

       

        $ScrollTrigger.create({
            trigger: el,
            // animation: entrance,
            toggleActions: 'play reverse play reverse',
            onUpdate({ progress, isActive }) {
                if (isActive) {
                   
                    const x = el.getBoundingClientRect().left + el.offsetWidth / 2
                    const y = el.getBoundingClientRect().top + el.offsetHeight / 2
            
                    image.anchor.set(0.5, 0.5);
                    image.width = el.offsetWidth
                    image.height = el.offsetHeight
                    image.x = x
                    image.y = y
                    app.stage.addChild(image);
                } else {
                    app.stage.removeChild(image);
                }
            }
        })

        let isHovering = false

        const interact = function () {
            isHovering = !isHovering
            $gsap.to(
                filter,
                {
                    size: isHovering ? 32 : 0.1,
                    enabled: true,
                    duration: 0.5,
                    onComplete: () => {
                        // self.$gsap.ticker.remove(self.renderPixi)
                        // self.renderer.destroy(true)
                        // self.canvas = false
                    },
                },
                '>'
            )
            
        }

        el.addEventListener('mouseover', interact);
        el.addEventListener('mouseout', interact);
    }

})
</script>

<template>
    <div ref="mainRef" class="container">
        <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 z-50 h-screen w-screen" />
        <section class="relative z-10 py-128 flex min-h-screen items-center gap-128 flex-wrap justify-center text-black">
            <img class="pixi-img" v-for="y in 10" :key="y" :src="`/${y}.jpeg`"/>
        </section>
    </div>
</template>
