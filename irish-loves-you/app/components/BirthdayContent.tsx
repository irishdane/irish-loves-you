"use client";

import { useState } from "react";
import Image from "next/image";
import TechText from "./TechText";
import Masonry, { type MasonryItem } from "./Masonry";
import "./BirthdayBalloons.css";

const WORDS = ["HAPPY", "LORRAINE", "DAY!"] as const;

const BALLOONS = [
  { color: "pink", src: "/images/pink-orange-balloon.png" },
  { color: "green", src: "/images/green-balloon.png" },
] as const;

const GAME_GOAL = 5;
const PHOTO_HEIGHTS = [400, 400, 400, 400, 800, 338, 450, 400, 800, 338, 800, 800, 1067, 1067, 800, 800];
const PHOTO_ITEMS: MasonryItem[] = PHOTO_HEIGHTS.map((height, index) => {
  const number = index + 1;
  const image = `/images/pic${number}.jpg`;

  return {
    id: `pic${number}`,
    img: image,
    url: image,
    height,
    alt: `Photo ${number} from Lorraine's birthday album`,
  };
});

export default function BirthdayContent() {
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [heartsCaught, setHeartsCaught] = useState(0);

  const blowOutCandles = () => {
    if (candlesBlownOut) return;
    setCandlesBlownOut(true);
  };

  const catchHeart = () => {
    setHeartsCaught((count) => (count < GAME_GOAL ? count + 1 : 0));
  };

  return (
    <main className="lorraine-story">
      <div className="lorraine-backdrop" aria-hidden="true">
        <span>✳</span>
        <span>•</span>
        <span>✦</span>
        <span>•</span>
        <span>✳</span>
        <span>•</span>
      </div>
      <div className="lorraine-sheet">
        <header className="lorraine-nav">
          <a className="lorraine-nav__brand" href="#birthday" aria-label="Lorraine's birthday home">
            <span aria-hidden="true">♡</span>
            <span>FOR LORRAINE</span>
          </a>
          <nav className="lorraine-nav__links" aria-label="Birthday sections">
            <a href="#birthday">The day</a>
            <a href="#cake">Cake</a>
            <a href="#photos">Photos</a>
            <a href="#letters">Letters</a>
            <a className="lorraine-nav__play" href="#game">Let&apos;s play <span aria-hidden="true">↗</span></a>
          </nav>
        </header>

        <section className="lorraine-hero" id="birthday" aria-label="Happy Lorraine Day">
          <div className="lorraine-hero__balloons" aria-hidden="true">
            {BALLOONS.map(({ color, src }) => (
              <Image
                key={color}
                className={`lorraine-hero__balloon lorraine-hero__balloon--${color}`}
                src={src}
                alt=""
                width={360}
                height={360}
              />
            ))}
          </div>
          <div className="lorraine-hero__top">
            <span>A LITTLE CORNER OF THE INTERNET, JUST FOR YOU</span>
            <span>OCTOBER 16 <span aria-hidden="true">✳</span> 2026</span>
          </div>
          <div className="lorraine-hero__center">
            <h1 className="lorraine-hero__sr">Happy Lorraine Day!</h1>
            {WORDS.map((word) => (
              <div className="lorraine-hero__word" key={word}>
                <TechText
                  text={word}
                  fontWeight={700}
                  fontSize={180}
                  color="#111111"
                  fillColor={word === "LORRAINE" ? undefined : "#000000"}
                  accentColor="#111111"
                  reveal="letter"
                  lineStyle="solid"
                  strokeWidth={2}
                  selection={true}
                  labels={false}
                  draggable={true}
                  specks={8}
                  sweep={false}
                />
              </div>
            ))}
            <p className="lorraine-hero__hint">HOVER OVER THE LETTERS ♡</p>
          </div>
          <a className="lorraine-hero__scroll" href="#cake">
            SCROLL FOR YOUR SURPRISE <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="birthday-experience birthday-experience--cake" id="cake" aria-labelledby="cake-title">
          <div className="birthday-experience__copy">
            <p className="lorraine-eyebrow">MAKE A WISH</p>
            <h2 id="cake-title">{candlesBlownOut ? "Wish sent!" : "Your birthday cake."}</h2>
            <p>{candlesBlownOut ? "May this next trip around the sun bring you all the good things." : "Close your eyes, think of something wonderful, and blow out your candles."}</p>
            <button
              className="birthday-button birthday-button--pink"
              type="button"
              onClick={candlesBlownOut ? () => setCandlesBlownOut(false) : blowOutCandles}
            >
              {candlesBlownOut ? "Light them again" : "Blow out the candles"}
              <span aria-hidden="true">{candlesBlownOut ? "↻" : "→"}</span>
            </button>
          </div>
          <div className="birthday-cake">
            <svg
              className="birthday-cake__drawing"
              viewBox="0 0 400 330"
              role="img"
              aria-label={candlesBlownOut ? "Crayon drawing of a birthday cake with candles blown out" : "Crayon drawing of a birthday cake with lit candles"}
            >
              <defs>
                <filter id="crayon-edge" x="-8%" y="-8%" width="116%" height="116%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="8" />
                  <feDisplacementMap in="SourceGraphic" scale="2.5" />
                </filter>
                <pattern id="pink-crayon" width="9" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
                  <path d="M1 1l6 1M-2 5l8 1M4 8l7 1" stroke="#e6007e" strokeWidth="2" strokeLinecap="round" opacity=".45" />
                </pattern>
                <pattern id="yellow-crayon" width="10" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(16)">
                  <path d="M1 1l7 1M-2 5l8 1M4 8l7 1" stroke="#bd8900" strokeWidth="2" strokeLinecap="round" opacity=".42" />
                </pattern>
                <pattern id="teal-crayon" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
                  <path d="M1 1l5 1M-1 5l7 1" stroke="#008d77" strokeWidth="2" strokeLinecap="round" opacity=".5" />
                </pattern>
              </defs>
              <g filter="url(#crayon-edge)" stroke="#29251e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M43 274q4-10 18-11 135-13 279 1 16 2 18 11-3 11-17 13-143 15-282-1-15-2-16-13Z" fill="#fff9e9" />
                <path d="M64 213q1-12 15-14 118-12 245 1 13 2 14 14l-7 51q-2 14-17 15-112 11-229-1-16-2-17-15Z" fill="#fec10d" />
                <path d="M64 213q1-12 15-14 118-12 245 1 13 2 14 14l-7 51q-2 14-17 15-112 11-229-1-16-2-17-15Z" fill="url(#yellow-crayon)" stroke="none" />
                <path d="M72 211q125 16 257 1M73 225q128 15 254 2M76 251q126 12 248 1" fill="none" stroke="#bd8900" strokeWidth="2.5" opacity=".65" />
                <path d="M91 155q2-11 16-13 100-11 202 1 13 2 14 13l-5 54q-2 13-15 15-97 10-193-1-14-2-15-14Z" fill="#ffb5d4" />
                <path d="M91 155q2-11 16-13 100-11 202 1 13 2 14 13l-5 54q-2 13-15 15-97 10-193-1-14-2-15-14Z" fill="url(#pink-crayon)" stroke="none" />
                <path d="M97 164q105 13 220 0M98 179q105 12 216 1M101 199q105 12 212 1" fill="none" stroke="#db5c91" strokeWidth="2.5" opacity=".65" />
                <path d="M86 154q8-13 17-7 7 5 13 0 8-7 15-1 9 7 17 1 9-8 17-1 8 7 16 1 9-8 17-1 8 7 17 1 8-8 17-2 9 7 17 1 8-8 17-1 9 7 18 1 7-5 15 1 9-4 15 7-2 9-13 10-119 10-235 0-11-1-13-10Z" fill="#fff9e9" />
                <path d="M90 157q118 12 228 0M98 151l9 4m22-5 8 4m24-5 8 5m25-5 8 4m24-4 8 4m24-4 8 5m22-4 8 4" fill="none" stroke="#e99ab9" strokeWidth="2.5" />
                <path d="M145 143l-2-51q0-5 6-5t7 5l1 51M195 140l1-66q0-6 7-6t7 6l-1 67M248 142l3-48q0-5 6-5t7 6l-3 48" fill="#fff9e9" />
                <path d="M145 143l-2-51q0-5 6-5t7 5l1 51M195 140l1-66q0-6 7-6t7 6l-1 67M248 142l3-48q0-5 6-5t7 6l-3 48" fill="url(#teal-crayon)" stroke="none" />
                <path d="M145 115l13 5m-14 7 13 5m38-39 14 5m-14 8 14 5m-15 8 14 5m38-23 13 5m-14 8 13 5" fill="none" stroke="#e6007e" strokeWidth="3" />
              </g>
              {!candlesBlownOut && (
                <g className="birthday-cake__flames" fill="#fec10d" stroke="#29251e" strokeWidth="2.5" strokeLinejoin="round">
                  <path d="M147 78q-11-10-1-20 1 9 7 11 8-13 7-19 15 18 3 29-8 6-16-1Z" />
                  <path d="M197 57q-12-11-1-22 1 9 7 12 8-14 7-21 15 19 3 30-8 7-16 1Z" />
                  <path d="M251 78q-11-10-1-20 1 9 7 11 8-13 7-19 15 18 3 29-8 6-16-1Z" />
                </g>
              )}
              <g fill="none" stroke="#29251e" strokeWidth="3" strokeLinecap="round" opacity=".72">
                <path d="M55 279q141 16 292 1M82 218l3 3m16-1 3 3m34-1 3 3m34-2 3 3m40-1 3 3m35-2 3 3m39-1 3 3m31-2 3 3" />
                <path d="M112 158l3 3m22-2 3 3m33-2 3 3m28-2 3 3m32-2 3 3m28-2 3 3m28-2 3 3" />
              </g>
            </svg>
          </div>
        </section>

        <section className="birthday-experience birthday-experience--photos" id="photos" aria-labelledby="photos-title">
          <div className="birthday-section-heading">
            <p className="lorraine-eyebrow">A FEW FAVORITE MOMENTS</p>
            <h2 id="photos-title">Our little photo album.</h2>
            <p>Your favorite memories, together in one place.</p>
          </div>
          {PHOTO_ITEMS.length > 0 ? (
            <Masonry
              items={PHOTO_ITEMS}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              colorShiftOnHover={false}
            />
          ) : (
            <p className="birthday-photo-empty">
              Your photos will go here. Add them to <code>public/images/album</code> to start your gallery.
            </p>
          )}
        </section>

        <section className="birthday-experience birthday-experience--letters" id="letters" aria-labelledby="letters-title">
          <div className="birthday-section-heading">
            <p className="lorraine-eyebrow">WORDS TO KEEP</p>
            <h2 id="letters-title">Little notes, just for you.</h2>
            <p>These are yours to personalize with the things you want her to know.</p>
          </div>
          <div className="birthday-letter-grid">
            {["A little note", "Open when you need a smile", "One more thing"].map((title, index) => (
              <article className="birthday-letter" key={title}>
                <span className="birthday-letter__number">0{index + 1}</span>
                <span className="birthday-letter__heart" aria-hidden="true">♡</span>
                <h3>{title}</h3>
                <p>[Your personal message goes here.]</p>
              </article>
            ))}
          </div>
        </section>

        <section className="birthday-experience birthday-experience--game" id="game" aria-labelledby="game-title">
          <div className="birthday-game">
            <div className="birthday-game__copy">
              <p className="lorraine-eyebrow">A TINY BIRTHDAY CHALLENGE</p>
              <h2 id="game-title">Catch five hearts.</h2>
              <p>Tap the heart five times to collect a little birthday love.</p>
            </div>
            <div className="birthday-game__play">
              <p className="birthday-game__score" aria-live="polite">
                {heartsCaught === GAME_GOAL ? "You caught them all! ♡" : `${heartsCaught} / ${GAME_GOAL} hearts`}
              </p>
              <button
                className="birthday-game__heart"
                type="button"
                onClick={catchHeart}
                aria-label={heartsCaught === GAME_GOAL ? "Play again" : "Catch a heart"}
              >
                {heartsCaught === GAME_GOAL ? "↻" : "♡"}
              </button>
              <span className="birthday-game__hint">{heartsCaught === GAME_GOAL ? "PLAY AGAIN" : "TAP THE HEART"}</span>
            </div>
          </div>
        </section>
        <footer className="lorraine-footer">MADE WITH ALL MY LOVE <span aria-hidden="true">♡</span></footer>
      </div>
    </main>
  );
}
