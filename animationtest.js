gsap.registerEffect({
  name: 'textClip',
  effect: (targets, config) => {
    const tl = gsap.timeline({
      defaults: { duration: config.duration, ease: config.ease },
    })

    // Check if the text has already been split, if not, split it and mark it as done
    const chars = targets[0].classList.contains('text-split-done')
      ? targets[0].querySelectorAll('.char')
      : new SplitText(targets, { type: 'chars', charsClass: 'char' }).chars

    if (!targets[0].classList.contains('text-split-done')) {
      targets[0].classList.add('text-split-done')
    }
    tl.fromTo(
      chars,
      {
        x: config.x,
        yPercent: config.yPercent,
        clipPath: 'inset(0% 100% 120% -5%)',
        transformOrigin: '0% 50%',
      },
      {
        willChange: 'transform',
        clipPath: 'inset(0% -100% -100% -5%)',
        x: 0,
        yPercent: 0,
        stagger: config.stagger,
        duration: config.duration,
        ease: config.ease,
      },
      0.05
    )
    return tl
  },
  defaults: { yPercent: 30, x: -30, duration: 0.8, ease: 'power3.out', stagger: -0.05 },
  extendTimeline: true,
})
