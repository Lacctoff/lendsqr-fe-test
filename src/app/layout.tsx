import type { Metadata } from "next";
import { Work_Sans, Roboto, Inter } from "next/font/google";
import "../styles/main.scss";

// Configure Work Sans with optimal weights for UI
const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

// Configure Roboto with commonly used weights
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  preload: true,
});

// Configure Inter with variable font for optimal performance
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Lendsqr - Admin Dashboard",
  description: "Lendsqr admin dashboard for managing users and loans",
  keywords: ["lendsqr", "admin", "dashboard", "fintech", "lending"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${roboto.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
