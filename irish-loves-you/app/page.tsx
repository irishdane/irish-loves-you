import Image from "next/image";
import BirthdayLogin from "./components/BirthdayLogin";

export default function Home() {
  return (
    <main className="entrance-page">
      <section className="entrance-artwork" aria-label="Birthday artwork">
        <div className="entrance-artwork__poster">
          <Image
            src="/images/hbd-login.png"
            alt="Colorful birthday illustration of Lorraine with the number 27"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
            className="entrance-artwork__image"
          />
        </div>
      </section>
      <section className="entrance-form" aria-label="Birthday unlock">
        <BirthdayLogin />
      </section>
    </main>
  );
}
