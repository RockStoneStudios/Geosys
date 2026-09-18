import { ReactNode } from 'react';
import { HeroSection } from '@/components/sections/Hero';
import { TacticalVisor } from '@/components/sections/TacticalVisor';
import { PlatformAccordion } from '@/components/sections/PlatformAccordion';

export default function Home(): ReactNode {
  return (
    <>
      <HeroSection />
      <TacticalVisor />
      <PlatformAccordion />
    </>
  );
}