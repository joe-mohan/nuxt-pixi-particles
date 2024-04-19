<script setup>
import {
  Assets,
  Application,
  Geometry,
  Mesh,
  Shader,
  Sprite,
  DisplacementFilter,
} from "pixi.js";
import Lenis from "@studio-freight/lenis";
import vertex from "~/glsl/shader2/shaderToy.vert";
import fragment from "~/glsl/shader2/shaderToy.frag";

const { $ScrollTrigger, $gsap } = useNuxtApp();

const canvasRef = ref(null);
const scroll = ref(0);

onMounted(async () => {
  const app = new Application();

  await app.init({
    resizeTo: window,
    preference: "webgl",
    transparent: true,
  });

  canvasRef.value.appendChild(app.canvas);

  // Load the textures
  await Assets.load([
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/ripple-03.png?v=1",
    "/DisplacementMap.png",
  ]);

  app.stage.eventMode = "static";

  // displacement
  const displacementSprite = Sprite.from(
    // "https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/ripple-03.png?v=1",
    "/DisplacementMap.png",
  );

  // Create a displacement filter
  const displacementFilter = new DisplacementFilter({
    sprite: displacementSprite,
    scale: 150,
  });

  app.stage.addChild(displacementSprite);

  // Apply the filter
  app.stage.filters = [displacementFilter];

  displacementSprite.anchor.set(0.5);

  displacementSprite.position.set(
    window.innerWidth / 2,
    window.innerHeight / 2,
  );

  // app.stage.on("mousemove", onPointerMove).on("touchmove", onPointerMove);

  // function onPointerMove(eventData) {
  //   // ring.visible = true;

  // displacementSprite.position.set(
  //   eventData.data.global.x - 25,
  //   eventData.data.global.y,
  // );
  //   // ring.position.copyFrom(displacementSprite.position);
  // }

  const quadGeometry = new Geometry({
    attributes: {
      aPosition: [
        -100,
        -100, // x, y
        100,
        -100, // x, y
        100,
        100, // x, y,
        -100,
        100, // x, y,
      ],
      aUV: [0, 0, 1, 0, 1, 1, 0, 1],
    },
    indexBuffer: [0, 1, 2, 0, 2, 3],
  });
  const shader = Shader.from({
    gl: {
      vertex,
      fragment,
    },
    resources: {
      shaderToyUniforms: {
        iResolution: {
          value: [app.screen.width, app.screen.height, 1],
          type: "vec3<f32>",
        },
        iTime: { value: 0, type: "f32" },
        iScroll: { value: scroll.value * 1.0, type: "f32" },
      },
    },
  });

  const quad = new Mesh({
    geometry: quadGeometry,
    shader,
  });

  quad.width = app.screen.width;
  quad.height = app.screen.height;
  quad.x = app.screen.width / 2;
  quad.y = app.screen.height / 2;

  app.stage.addChild(quad);

  app.ticker.add(() => {
    shader.resources.shaderToyUniforms.uniforms.iTime +=
      app.ticker.elapsedMS / 1000;
  });

  const lenis = new Lenis({
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });

  lenis.on("scroll", (e) => {
    $ScrollTrigger.update;
    shader.resources.shaderToyUniforms.uniforms.iScroll =
      -e.animatedScroll * 0.001;
  });

  $gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  $gsap.ticker.lagSmoothing(0);
});
</script>

<template>
  <div class="text-white">
    <div ref="canvasRef" class="fixed inset-0" />
    <div class="fixed inset-0 opacity-30">
      <svg
        viewBox="0 0 300 200"
        class="h-full w-full"
        preserveAspectRatio="none"
      >
        <filter id="noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            id="feTurbulence"
            type="fractalNoise"
            baseFrequency="2.5"
            numOctaves="100"
          >
            <animate
              attributeName="seed"
              from="0"
              to="100"
              dur="3s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feBlend in="SourceGraphic" in2="feTurbulence" mode="color-burn" />
        </filter>
        <rect
          x="0"
          y="0"
          width="300"
          height="200"
          fill="transparent"
          filter="url(#noise)"
        />
      </svg>
    </div>
    <div class="relative flex h-screen w-screen items-center justify-center">
      <p class="text-2xl">TEXT</p>
    </div>
    <div class="relative flex h-screen w-screen items-center justify-center">
      <p class="text-2xl">TEXT</p>
    </div>
    <div class="relative flex h-screen w-screen items-center justify-center">
      <p class="text-2xl">TEXT</p>
    </div>
    <div class="relative flex h-screen w-screen items-center justify-center">
      <p class="text-2xl">TEXT</p>
    </div>
    <div class="relative flex h-screen w-screen items-center justify-center">
      <p class="text-2xl">TEXT</p>
    </div>
  </div>
</template>
