import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Creates a page transition with the APAG logo fill animation.
 * This replaces 5 duplicate copies of the same transition logic across
 * Nav, TopBar, Footer, ServicesSection, and AdmissionsMethodsCTA.
 * 
 * @param href - The target URL to navigate to
 * @param options.router - Next.js router instance (for SPA navigation)
 * @param options.useHardNav - If true, uses window.location.href instead of router.push
 * @param options.idPrefix - Unique prefix for DOM element IDs to avoid conflicts
 */
export function createPageTransition(
  href: string,
  options: {
    router?: AppRouterInstance;
    useHardNav?: boolean;
    idPrefix?: string;
  } = {}
) {
  const { router, useHardNav = false, idPrefix = 'pt' } = options;

  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 z-[100000] bg-[#FAFAFA] flex items-center justify-center flex-col pointer-events-auto origin-bottom";
  overlay.style.transform = "scaleY(0)";
  
  const fillId = `${idPrefix}-fill-logo`;
  const counterId = `${idPrefix}-counter`;
  
  overlay.innerHTML = `
    <div class="relative w-[80vw] md:w-[60vw] max-w-[800px] aspect-[4/1] select-none flex items-center justify-center">
       <div class="absolute inset-0 opacity-15 grayscale">
          <img src="/logos/Logo1.png" style="width:100%; height:100%; object-fit:contain;" />
       </div>
       <div class="absolute inset-0" id="${fillId}" style="clip-path: inset(100% 0 0 0)">
          <img src="/logos/Logo1.png" style="width:100%; height:100%; object-fit:contain;" />
       </div>
    </div>
    <div id="${counterId}" class="absolute bottom-6 right-8 md:bottom-12 md:right-16 text-[#2c2b7c] font-heading text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter">0%</div>
  `;
  
  document.body.appendChild(overlay);

  import("gsap").then((gsapModule) => {
    const gsap = gsapModule.default;
    const tl = gsap.timeline({
      onComplete: () => {
        if (useHardNav || !router) {
          window.location.href = href;
        } else {
          router.push(href);
          gsap.to(overlay, {
            scaleY: 0,
            duration: 0.7,
            ease: "power4.inOut",
            delay: 0.2,
            onComplete: () => overlay.remove()
          });
        }
      }
    });

    tl.to(overlay, { scaleY: 1, duration: 0.6, ease: "power4.inOut" });

    const obj = { p: 0 };
    tl.to(obj, {
      p: 100,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        const counter = document.getElementById(counterId);
        const fill = document.getElementById(fillId);
        if (counter) counter.innerText = `${Math.round(obj.p)}%`;
        if (fill) fill.style.clipPath = `inset(${100 - obj.p}% 0 0 0)`;
      }
    });
  });
}
