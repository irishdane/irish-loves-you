import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const alteHaasGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/AlteHaasGroteskRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AlteHaasGroteskBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-alte-haas-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "For Lorraine ♡",
  description: "A little birthday surprise, made with love.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={alteHaasGrotesk.variable}>{children}</body></html>;
}
