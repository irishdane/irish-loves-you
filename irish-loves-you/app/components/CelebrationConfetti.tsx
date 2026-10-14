"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

const DURATION_MS = 3000;
const COLORS = ["#FEC10D", "#00A993", "#FF8B3D", "#E6007E"];

export default function CelebrationConfetti() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const endTime = Date.now() + DURATION_MS;
    let frameId: number;

    const fireCannons = () => {
      if (Date.now() >= endTime) return;

      confetti({
        particleCount: COLORS.length,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: COLORS,
      });
      confetti({
        particleCount: COLORS.length,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: COLORS,
      });

      frameId = window.requestAnimationFrame(fireCannons);
    };

    fireCannons();
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return null;
}
