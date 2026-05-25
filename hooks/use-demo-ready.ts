"use client";

import { useEffect, useState } from "react";

export function useDemoReady(delay = 650) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return ready;
}
