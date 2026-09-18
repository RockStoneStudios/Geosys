import { ReactNode } from 'react';
import { HeroSection } from '@/components/sections/Hero';
import { TacticalVisor } from '@/components/sections/TacticalVisor';
import { PlatformAccordion } from '@/components/sections/PlatformAccordion';
import MetricsBar from '@/components/sections/MetricsBar';
import WorkflowSection from '@/components/sections/WorkflowSection';

export default function Home(): ReactNode {
  return (
    <>
      <HeroSection />
      <MetricsBar/>
      <TacticalVisor />
      <PlatformAccordion />
      <WorkflowSection/>
    </>
  );
}