import HeroSection from '../sections/HeroSection';
import BeforeAfterSection from '../sections/BeforeAfterSection';
import ExplanationSection from '../sections/ExplanationSection';
import WhyRealSection from '../sections/WhyRealSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FeaturesSection from '../sections/FeaturesSection';
import PricingSection from '../sections/PricingSection';
import FinalCTA from '../sections/FinalCTA';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Before/After Comparison */}
      <BeforeAfterSection />
      
      {/* Explanation Section */}
      <ExplanationSection />
      
      {/* Why Clipper is Real */}
      <WhyRealSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Features */}
      <FeaturesSection />
      
      {/* Pricing/Total Value */}
      <PricingSection />
      
      {/* Final CTA */}
      <FinalCTA />
      
      {/* Footer */}
      <footer className="w-full bg-black py-6 px-4 border-t border-gray-800">
        <div className="max-w-[480px] mx-auto text-center">
          <p className="text-text-secondary text-xs">
            © 2024 AutoClip Cuan Engine. All rights reserved.
          </p>
          <p className="text-text-secondary text-xs mt-2">
            Hasil tidak menjamin kesuksesan individu. Kerja keras dan konsistensi tetap diperlukan.
          </p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
