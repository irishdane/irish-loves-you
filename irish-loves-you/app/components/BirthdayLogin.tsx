"use client";

import { useEffect, useState } from "react";
import CodeSlots from "./CodeSlots";

type Status = "idle" | "error" | "success";
const BIRTHDAY = "101699"; // MMDDYY; playful gate, not secure authentication

export default function BirthdayLogin() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "error") return;
    // Allow CodeSlots to drain its error animation before resetting.
    const timer = window.setTimeout(() => setStatus("idle"), 1100);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <div className="birthday-login">
      <header className="birthday-login__header">
        <span>A LITTLE SOMETHING FOR YOU</span>
        <span className="birthday-login__asterisk" aria-hidden="true">✳</span>
      </header>

      <section className="birthday-login__intro">
        <p className="birthday-login__eyebrow">TO MY FAVORITE PERSON,</p>
        <h1>Mah boogie.</h1>
        <p className="birthday-login__description">
          I made a little corner of the internet just for you.
          Before we begin, tell me when your story started.
        </p>
      </section>

      <div className="birthday-login__divider" aria-hidden="true" />

      <section className="birthday-login__form" aria-label="Birthday unlock">
        <p className="birthday-login__label">YOUR SPECIAL DAY</p>
        <div className="birthday-login__slots">
          <CodeSlots
            length={6}
            placeholder="MMDDYY"
            status={status}
            onComplete={(code: string) =>
              setStatus(code === BIRTHDAY ? "success" : "error")
            }
            accentColor="#29251E"
            inkColor="#29251E"
            slotColor="#FFF9E9"
            digitColor="#FFFFFF"
            dangerColor="#E6007E"
            slotSize={52}
            gap={9}
            radius={9}
            bounce={0.2}
            settle={0.3}
            rise={8}
            cascade={25}
            autoFocus
            ariaLabel="Birthday in six digits, month day year"
          />
        </div>
        <div className="birthday-login__message" aria-live="polite">
          {status === "error" && (
            <p className="birthday-login__error">Not quite, love. Try your special day again ♡</p>
          )}
          {status === "success" && (
            <p className="birthday-login__success">It’s you! Happy birthday, my love ♡</p>
          )}
          {status === "idle" && <p>Six little numbers, and the surprise begins. ♡</p>}
        </div>
      </section>

      <footer className="birthday-login__footer">
        
        
      </footer>
    </div>
  );
}
