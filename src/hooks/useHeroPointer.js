import { useEffect } from 'react';
import { animate, frame, motionValue } from 'motion';

// Cursor response for the hero.
// - EBVAM and ZAMBRANA VIA drift in opposite directions, so the title slides past the crystal apex.
// - Crystal scene and apex cut move TOGETHER (same offset); otherwise the cut would drift out of register.
// - A soft light follows the pointer with a springy lag.
// Mouse/pen only. Touch screens get a slow autonomous drift while the ambient layer is running.
// Nothing runs under prefers-reduced-motion. Only the independent `translate`/`scale` properties are
// written, so the intro's `transform` animations on the same elements are left alone.

const PARALLAX = { type: 'spring', stiffness: 70, damping: 16, mass: 0.9 };
const SPOT = { type: 'spring', stiffness: 150, damping: 20 };
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function useHeroPointer(heroRef) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const el = {
      main: hero.querySelector('.name-main'),
      family: hero.querySelector('.name-family'),
      scene: hero.querySelector('.monolith-scene'),
      front: hero.querySelector('.monolith-foreground'),
      spot: hero.querySelector('.monolith-spot'),
    };
    if (Object.values(el).some(node => !node)) return undefined;

    const nx = motionValue(0);
    const ny = motionValue(0);
    const sx = motionValue(0);
    const sy = motionValue(0);
    let rect = null;
    let scale = 1;
    let reach = 1;
    let target = null;
    let pending = false;
    let inView = true;
    let driftFrame = 0;
    let dead = false;
    let running = false;

    const measure = () => {
      rect = hero.getBoundingClientRect();
      reach = clamp(rect.width / 1366, 0.7, 1.4);
      // The scene needs headroom so its edges never show while it shifts.
      const room = (6 * reach + 3) * 2;
      scale = 1 + room / Math.min(rect.width, rect.height);
      if (running) {
        el.scene.style.scale = String(scale);
        el.front.style.scale = String(scale);
      }
    };
    let dirty = true;
    const markDirty = () => { dirty = true; };

    const render = () => {
      const x = nx.get();
      const y = ny.get();
      el.main.style.translate = `${-x * 14 * reach}px ${-y * 6 * reach}px`;
      el.family.style.translate = `${x * 10 * reach}px ${y * 4 * reach}px`;
      const crystal = `${x * 6 * reach}px ${y * 4 * reach}px`;
      el.scene.style.translate = crystal;
      el.front.style.translate = crystal;
      el.spot.style.translate = `${sx.get()}px ${sy.get()}px`;
    };
    const scheduleRender = () => { frame.render(render); };
    [nx, ny, sx, sy].forEach(value => value.on('change', scheduleRender));

    const applyTarget = () => {
      pending = false;
      if (!target || dead) return;
      animate(nx, target.x, PARALLAX);
      animate(ny, target.y, PARALLAX);
      animate(sx, target.px - el.spot.offsetWidth / 2, SPOT);
      animate(sy, target.py - el.spot.offsetHeight / 2, SPOT);
    };

    const onEnter = (event) => {
      if (event.pointerType === 'touch') return;
      if (dirty || !rect) { measure(); dirty = false; }
      // Start the light under the pointer instead of sweeping in from the corner.
      sx.jump(event.clientX - rect.left - el.spot.offsetWidth / 2);
      sy.jump(event.clientY - rect.top - el.spot.offsetHeight / 2);
      hero.classList.add('pointer-on');
    };
    const onMove = (event) => {
      if (event.pointerType === 'touch') return;
      if (dirty || !rect) { measure(); dirty = false; }
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      target = {
        x: clamp((px / rect.width) * 2 - 1, -1, 1),
        y: clamp((py / rect.height) * 2 - 1, -1, 1),
        px,
        py,
      };
      if (!pending) { pending = true; frame.update(applyTarget); }
    };
    const onLeave = () => {
      hero.classList.remove('pointer-on');
      target = null;
      animate(nx, 0, { ...PARALLAX, stiffness: 40 });
      animate(ny, 0, { ...PARALLAX, stiffness: 40 });
    };

    // Touch screens have no cursor: a slow drift on the same layers, only while the ambient layer runs.
    const drift = (now) => {
      driftFrame = requestAnimationFrame(drift);
      const ambient = document.querySelector('.ambient-layer');
      if (!inView || document.hidden || ambient?.dataset.running !== 'true') return;
      nx.set(Math.sin(now * 0.00032) * 0.7);
      ny.set(Math.cos(now * 0.00024) * 0.7);
    };

    const clear = () => {
      [el.main, el.family, el.scene, el.front, el.spot].forEach(node => { node.style.translate = ''; });
      [el.scene, el.front].forEach(node => { node.style.scale = ''; });
      hero.classList.remove('pointer-on');
    };

    const start = () => {
      stop();
      if (reduced.matches) return;
      running = true;
      measure();
      dirty = false;
      if (finePointer.matches) {
        hero.addEventListener('pointerenter', onEnter);
        hero.addEventListener('pointermove', onMove, { passive: true });
        hero.addEventListener('pointerleave', onLeave);
      } else {
        driftFrame = requestAnimationFrame(drift);
      }
    };
    function stop() {
      running = false;
      hero.removeEventListener('pointerenter', onEnter);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(driftFrame);
      [nx, ny, sx, sy].forEach(value => value.stop());
      nx.set(0);
      ny.set(0);
      clear();
    }

    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; });
    observer.observe(hero);
    const onSettingsChange = () => { start(); };
    reduced.addEventListener('change', onSettingsChange);
    finePointer.addEventListener('change', onSettingsChange);
    window.addEventListener('resize', markDirty);
    window.addEventListener('scroll', markDirty, { passive: true });
    start();

    return () => {
      dead = true;
      stop();
      observer.disconnect();
      reduced.removeEventListener('change', onSettingsChange);
      finePointer.removeEventListener('change', onSettingsChange);
      window.removeEventListener('resize', markDirty);
      window.removeEventListener('scroll', markDirty);
    };
  }, [heroRef]);
}
