export function initRevealAnimations(): void {
  const elements = document.querySelectorAll<HTMLElement>(".reveal");

  if (!("IntersectionObserver" in window) || elements.length === 0) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  elements.forEach((el) => observer.observe(el));
}
