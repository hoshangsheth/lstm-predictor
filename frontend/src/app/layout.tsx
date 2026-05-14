import type { Metadata } from "next";
import { Space_Mono, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neural Language Model — LSTM Next Word Predictor",
  description:
    "Interactive LSTM-based next word prediction system trained on Shakespeare's Hamlet. Explore sequence modeling, temperature sampling, and NLP inference.",
  keywords: ["LSTM", "NLP", "next word prediction", "machine learning", "Shakespeare", "neural network"],
  openGraph: {
    title: "Neural Language Model",
    description: "LSTM next word predictor trained on Hamlet.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-text antialiased font-sans">{children}</body>
    </html>
  );
}
