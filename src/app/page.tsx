import React from 'react';
import { HeroSection } from '@/components/sections/Hero';
import { ShowcaseSection } from '@/components/sections/Showcase';
import { ValuePropSection } from '@/components/sections/ValueProp';
import { TestimonialsSection } from '@/components/sections/Testimonials';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <ShowcaseSection />
      <ValuePropSection />
      <TestimonialsSection />
    </div>
  );
}
