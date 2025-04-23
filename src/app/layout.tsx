import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import GradientBackground from '@/components/Background/GradientBackground'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "VoxStudios - AI Voice Generation Platform",
  description: "Transform your business communication with our advanced AI voice generation platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <GradientBackground />
        <div style={{ position: 'relative', zIndex: 0 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
