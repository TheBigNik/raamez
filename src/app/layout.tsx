import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import localFont from "next/font/local";
import ThemeProvider from "@/components/Theme/ThemeProvider";

const peyda = localFont({
  src: [
    {
      path: "../fonts/Peyda/PeydaWeb/woff2/PeydaWeb-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Peyda/PeydaWeb/woff2/PeydaWeb-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Peyda/PeydaWeb/woff2/PeydaWeb-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-peyda",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "رامِز | بازی آنلاین وردل فارسی",
  description: "رامِز نسخه فارسی Wordle است؛ هر روز یک کلمه جدید را در چند تلاش حدس بزنید و مهارت واژگان خود را به چالش بکشید.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${peyda.variable} antialiased `}
      >
        <ThemeProvider>
          <div className="max-w-7xl mx-auto">
            <header className="bg-background/60 dark:bg-background/60 backdrop-blur-lg p-7 w-full sticky top-0 border-b border-gray-400 z-50">
              <Navbar />
            </header>
            <div className="min-h-screen p-7">{children}</div>
            <footer className="bottom-0 border-t border-gray-400 w-full p-10">
              <Footer />
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
