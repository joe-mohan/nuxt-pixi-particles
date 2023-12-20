export const useTween = () => {
  // GSAP
  const { $gsap } = useNuxtApp();

  // Methods
  const getTween = (el, animation, options = {}) => {
    switch (animation) {
      case "fadeIn":
        return fadeInAnimation(el, options);
    }
  };

  const fadeInAnimation = (el, options) => {
    if (!el) return;

    const duration = el.getAttribute("data-duration") || 0.7;
    const ease = el.getAttribute("data-ease") || "power2.inOut";

    return $gsap.from(el, { opacity: 0, duration, ease, ...options });
  };

  return { getTween };
};
