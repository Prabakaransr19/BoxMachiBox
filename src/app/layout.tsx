import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";

import { ApiWarmer } from "@/components/api-warmer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Box Machi Box | Predicting Podiums Before Lights Out",
  description: "Predicting podiums before the lights go out. Advanced F1 analysis, strategy predictions, and telemetry insights.",
  icons: {
    icon: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-bmb-bg text-bmb-text`}>
        <ApiWarmer />
        <Header />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
