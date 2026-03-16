import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-afacad",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EJ Miami — Property Intelligence Report (Demo)",
  description:
    "AI-powered property intelligence report for Eric Johnson, EJMIAMI.COM. 54 active listings across Brickell, The Roads, and surrounding Miami neighborhoods. Powered by Lujo AI.",
  openGraph: {
    title: "EJ Miami — Property Intelligence Report (Demo)",
    description:
      "AI-powered property intelligence report with market analytics, investment analysis, and neighborhood scores. Powered by Lujo AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
