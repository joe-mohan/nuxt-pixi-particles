<script setup>
import {
  Application,
  Assets,
  Sprite,
  Container,
  Point,
  Graphics,
} from "pixi.js";

const { $gsap, $ScrollTrigger, $PixelateFilter } = useNuxtApp();

const mainRef = ref(null);
const canvasRef = ref(null);

const imgPos = (image, el) => {
  const x = el.getBoundingClientRect().left;
  const y = el.getBoundingClientRect().top;
  image.x = x;
  image.y = y;

  // not sure about this
  const graphics = new Graphics();
  graphics.rect(x, y, el.offsetWidth, el.offsetHeight);
  graphics.fill(0xff3300);

  image.mask = graphics;
  //

  return image;
};

const background = (bgSize, inputSprite, type, forceSize) => {
  const sprite = inputSprite;
  const bgContainer = new Container({ width: bgSize.x, height: bgSize.y });
  bgContainer.addChild(sprite);

  function resize() {
    let sp = { x: sprite.width, y: sprite.height };
    if (forceSize) sp = forceSize;
    const winratio = bgSize.x / bgSize.y;
    const spratio = sp.x / sp.y;
    let scale = 1;
    const pos = new Point(0, 0);
    if (type === "cover" ? winratio > spratio : winratio < spratio) {
      // photo is wider than background
      scale = bgSize.x / sp.x;
      pos.y = -(sp.y * scale - bgSize.y) / 2;
    } else {
      // photo is taller than background
      scale = bgSize.y / sp.y;
      pos.x = -(sp.x * scale - bgSize.x) / 2;
    }

    sprite.scale = new Point(scale, scale);
    sprite.position = pos;
  }

  resize();

  return {
    sprite,
    container: bgContainer,
    doResize: resize,
  };
};

onMounted(async () => {
  // const app = new Application({
  // view: canvasRef.value,
  // backgroundAlpha: 0,
  // resizeTo: window,
  // });

  const app = new Application();

  // Initialize the application
  await app.init({
    canvas: canvasRef.value,
    resizeTo: window,
    preference: "webgl",
    transparent: true,
    backgroundAlpha: 0,
  });

  // Append the application canvas to the document body
  // document.body.appendChild(app.canvas);

  // use gsap ticker
  app.ticker.stop();
  $gsap.ticker.add(() => {
    app.ticker.update();
  });

  // document.body.appendChild(app.view); // maybe change this to mainRef.value
  // document.body.appendChild(app.canvas);

  // each image
  const imgEls = mainRef.value.querySelectorAll(".pixi-img");

  for (const el of imgEls) {
    const texture = await Assets.load(el.src);

    const containerSize = { x: el.offsetWidth, y: el.offsetHeight };
    const image = background(containerSize, Sprite.from(texture), "cover");

    imgPos(image.container, el);

    // const filter = new BlurFilter();
    const filter = new $PixelateFilter(10);
    image.sprite.filters = [filter];
    $ScrollTrigger.create({
      trigger: el,
      onEnter() {
        app.stage.addChild(image.container);
        // $gsap.set(filter, { blur: 0 });
        $gsap.set(filter, { size: 0.1 });
      },
      onUpdate({ isActive }) {
        if (isActive) {
          imgPos(image.container, el);
          app.stage.addChild(image.container);
        } else {
          app.stage.removeChild(image.container);
        }
      },
    });

    let isHovering = false;
    const interact = function () {
      isHovering = !isHovering;
      // $gsap.to(
      //   filter,
      //   {
      //     blur: isHovering ? 32 : 0,
      //     enabled: true,
      //     duration: 0.5,
      //   },
      //   ">",
      // );
      $gsap.to(
        filter,
        {
          size: isHovering ? 8 : 0.1,
          enabled: true,
          duration: 0.5,
        },
        ">",
      );
    };

    el.addEventListener("mouseover", interact);
    el.addEventListener("mouseout", interact);
  }
});
</script>

<template>
  <div ref="mainRef" class="container">
    <canvas
      ref="canvasRef"
      class="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
    <!-- <div
      ref="canvasRef"
      class="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    /> -->

    <section
      class="relative z-10 grid min-h-screen auto-rows-min grid-cols-5 gap-4 py-128 text-black"
    >
      <img
        v-for="y in 10"
        :key="y"
        class="pixi-img col-span-1 aspect-square object-cover opacity-0"
        :src="`/${y}.jpeg`"
      />
    </section>

    <section
      class="relative z-10 flex min-h-screen flex-wrap items-center justify-center gap-128 py-128 text-black"
    >
      <img
        v-for="y in 10"
        :key="y"
        class="pixi-img aspect-square object-cover opacity-0"
        :src="`/${y}.jpeg`"
      />
    </section>

    <section
      class="relative z-10 flex min-h-screen flex-wrap items-center justify-center gap-128 py-128 text-black"
    >
      <img
        v-for="y in 10"
        :key="y"
        class="pixi-img aspect-video object-cover opacity-0"
        :src="`/${y}.jpeg`"
      />
    </section>
  </div>
</template>
