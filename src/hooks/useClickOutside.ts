import { useEffect, RefObject } from 'react';

/**
 * Hook that detects clicks outside of the specified element(s).
 * Replaces duplicate click-outside logic in AdmissionsSection, TopBar, and ScoreCalculator.
 *
 * @param refs - Single ref or array of refs to monitor
 * @param onClickOutside - Callback when click is detected outside all refs
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  onClickOutside: () => void
) {
  useEffect(() => {
    const refsArray = Array.isArray(refs) ? refs : [refs];
    
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = refsArray.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );
      
      if (isOutside) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, onClickOutside]);
}
