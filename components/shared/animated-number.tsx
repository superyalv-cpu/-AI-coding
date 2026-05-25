"use client";

import { animate } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedNumber({
  value,
  formatter,
  className,
}: {
  value: number;
  formatter: (value: number) => string;
  className?: string;
}) {
  const [display, setDisplay] = useState(() => formatter(0));

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatter(latest)),
    });
    return () => controls.stop();
  }, [formatter, value]);

  return <span className={className}>{display}</span>;
}
