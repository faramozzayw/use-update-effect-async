import { DependencyList, EffectCallback, useEffect, useRef } from "react";

type PromiseEffectCallback = () => Promise<unknown>;

export const useUpdateEffectAsync = (
  effect: EffectCallback | PromiseEffectCallback,
  deps: DependencyList = []
) => {
  const didUpdateRef = useRef(false);

  useEffect(() => {
    if (didUpdateRef.current) {
      if (effect instanceof Promise) {
        Promise.resolve(effect);
      } else {
        effect();
      }
    }

    didUpdateRef.current = true;
  }, deps);
};
