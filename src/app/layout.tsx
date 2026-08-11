import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { ToastProviderWrapper } from "@/hooks/use-toast";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Urbco - Own a Fraction of Premium Real Estate",
  description: "Invest in Nigeria's most lucrative properties with as little as ₦500,000. Earn passive income through rental yields and capital appreciation.",
  keywords: ["real estate", "investment", "fractional ownership", "Nigeria", "property investment", "passive income"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} font-sans antialiased`}>
        <ToastProviderWrapper>
          {children}
        </ToastProviderWrapper>
      </body>
    </html>
  );
}
