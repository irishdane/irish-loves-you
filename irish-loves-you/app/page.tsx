"use client";

import { useState } from "react";
import Image from "next/image";
import BirthdayLogin from "./components/BirthdayLogin";
import BirthdayContent from "./components/BirthdayContent";
import CelebrationConfetti from "./components/CelebrationConfetti";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return (
      <>
        <BirthdayContent />
        <CelebrationConfetti />
      </>
    );
  }

  return (
    <main className="entrance-page">
      <section className="entrance-artwork" aria-label="Birthday artwork">
        <div className="entrance-artwork__poster">
          <Image
            src="/images/hbd-login.png"
            alt="Colorful birthday illustration of Lorraine with the number 27"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
            className="entrance-artwork__image"
          />
        </div>
      </section>
      <section className="entrance-form" aria-label="Birthday unlock">
        <BirthdayLogin onUnlock={() => setUnlocked(true)} />
      </section>
    </main>
  );
}
