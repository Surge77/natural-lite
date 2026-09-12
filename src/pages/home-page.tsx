import {
  BrandStorySection,
  CommunitySection,
  Hero,
  ImpactBand,
  JourneySection,
  ProductsSection,
  TestimonialsSection,
  TrustSection,
} from '@/components/sections';

/** The homepage, in the exact band order of the client's reference comp. */
export function HomePage() {
  return (
    <>
      <Hero />
      <JourneySection />
      <ProductsSection />
      <ImpactBand />
      <BrandStorySection />
      <TrustSection />
      <TestimonialsSection />
      <CommunitySection />
    </>
  );
}
