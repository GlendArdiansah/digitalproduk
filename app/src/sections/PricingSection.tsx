import ScrollReveal from '../components/ScrollReveal';

const PricingSection = () => {
  return (
    <section className="w-full bg-black py-6 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* Pricing Image */}
        <ScrollReveal delay={0.1}>
          <div className="w-full">
            <img 
              src="/image6.jpg" 
              alt="Total Value AutoClip Cuan Engine - Rp5.850.000 worth of systems and tools"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PricingSection;
