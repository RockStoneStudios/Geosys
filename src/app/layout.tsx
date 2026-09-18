import type { Metadata } from 'next';
import './globals.css';
import { BootLoader } from '@/components/layout/BootLoader';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'GEOSYS — Intelligence Platform',
  description: 'Plataforma de inteligencia territorial y análisis geoespacial',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-[#0A0A0B] text-[#EDEAE3] min-h-screen flex flex-col antialiased">
        <BootLoader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}