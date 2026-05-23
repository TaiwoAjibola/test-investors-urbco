import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProviderWrapper } from "@/hooks/use-toast";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ToastProviderWrapper>
          {children}
        </ToastProviderWrapper>
      </body>
    </html>
  );
}
