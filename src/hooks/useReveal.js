import { useEffect } from 'react';

// Marks [data-reveal] elements with data-visible the first time they enter the
// viewport. One-shot: revealed elements are released immediately.
export function useReveal() {
  useEffect(() => {
    const pending = new Set(document.querySelectorAll('[data-reveal]'));
    const show = item => {
      item.setAttribute('data-visible', '');
      pending.delete(item);
      observer?.unobserve(item);
    };
    if (!('IntersectionObserver' in window)) {
      [...pending].forEach(show);
      return undefined;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) show(entry.target); });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    pending.forEach(item => observer.observe(item));

    // IntersectionObserver never reports elements that were jumped over (anchor
    // link, End key, restored scroll), so anything scrolled past is revealed here.
    let frame = 0;
    const revealPassed = () => {
      frame = 0;
      pending.forEach(item => { if (item.getBoundingClientRect().top < 0) show(item); });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(revealPassed); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);
}
