import ScrollReveal from '../components/ScrollReveal';

const FeaturesSection = () => {
  return (
    <section className="w-full bg-black py-6 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* Features Image */}
        <ScrollReveal delay={0.1}>
          <div className="w-full">
            <img 
              src="/image5.jpg" 
              alt="Fitur AutoClip Cuan Engine - Simple = Cuan Real. Perbandingan Clipping Manual vs AutoClip"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FeaturesSection;
