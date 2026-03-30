/**
 * Smooth scroll to a target element by selector.
 * Handles cross-page navigation when on a different pathname.
 */
export function handleSmoothScroll(
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string,
  onBeforeScroll?: () => void
) {
  e.preventDefault();
  onBeforeScroll?.();
  
  if (window.location.pathname !== "/") {
    window.location.href = `/${targetId}`;
    return;
  }
  
  const target = document.querySelector(targetId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Scroll to the top of the page smoothly.
 */
export function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
