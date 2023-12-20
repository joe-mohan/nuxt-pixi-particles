export const useEntranceTimeline = (index, options = {}) => {
  // NuxtApp
  const { $gsap, $ScrollTrigger, $bus } = useNuxtApp();

  // Template Refs/Reactives
  const triggerRef = ref(null);

  // Variables
  let timeline;
  let scrollTrigger;

  // COmposables
  const { getTween } = useTween();

  // Lifecycle Hooks
  onMounted(() => {
    createEntranceTimeline();
  });

  onBeforeUnmount(() => {
    scrollTrigger && scrollTrigger.kill();
    scrollTrigger = null;

    timeline && timeline.kill();
    timeline = null;
  });

  // Methods
  const createEntranceTimeline = () => {
    if (!triggerRef.value) return;

    const animatedEls = triggerRef.value.querySelectorAll("[data-animate]");

    timeline = $gsap.timeline({
      onComplete: () => {
        // timeline && timeline.revert();
      },
    });

    animatedEls.forEach((el, elIndex) => {
      const animation = el.getAttribute("data-animate");
      const position = elIndex === 0 ? 0 : "<+=0.1";

      timeline.add(getTween(el, animation), position);
    });

    if (index > 0) {
      scrollTrigger = $ScrollTrigger.create({
        animation: timeline,
        trigger: triggerRef.value,
        start: "top bottom-=100px",
        ...options,
      });
    } else {
      timeline.paused(true);
      $bus.on("loadingDone", () => {
        timeline.play(0);
      });
    }
  };

  return { timeline, triggerRef };
};
