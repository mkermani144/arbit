import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arbit",
  description: "Arbit makes arbitrage simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
