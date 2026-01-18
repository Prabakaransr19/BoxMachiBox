import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Box Machi Box | Predicting Podiums Before Lights Out",
  description: "Predicting podiums before the lights go out. Advanced F1 analysis, strategy predictions, and telemetry insights.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-bmb-bg text-bmb-text`}>
        <Header />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
