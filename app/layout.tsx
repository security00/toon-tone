import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toon-tone.net"),
  title: "Toon-Tone Game | Cartoon Color Guessing Challenge",
  description:
    "Play Toon-Tone, a free cartoon color guessing game. Match character colors from memory with Hue, Saturation, and Brightness sliders, then share your daily score.",
  keywords: [
    "toon tone game",
    "cartoon color guessing game",
    "guess cartoon character color",
    "character color game",
    "anime color guessing game",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Toon-Tone Game",
    description: "Guess cartoon character colors with HSB sliders and share your Daily Challenge score.",
    url: "https://toon-tone.net",
    siteName: "Toon-Tone",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#fff7ed] text-slate-950">
        {children}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MKSVRK46MK" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MKSVRK46MK');
          `}
        </Script>
        <Script id="microsoft-clarity">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wqafq2jegv");
          `}
        </Script>
      </body>
    </html>
  );
}
