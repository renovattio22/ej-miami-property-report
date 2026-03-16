import type { Metadata } from "next";
import { Oswald, Afacad } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EJ Miami — Property Intelligence Report",
  description:
    "AI-powered property intelligence report for Eric Johnson, EJMIAMI.COM. 54 active listings across Brickell, The Roads, and surrounding Miami neighborhoods.",
  openGraph: {
    title: "EJ Miami — Property Intelligence Report",
    description:
      "AI-powered property intelligence report with market analytics, investment analysis, and neighborhood scores.",
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
      <body className={`${oswald.variable} ${afacad.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
