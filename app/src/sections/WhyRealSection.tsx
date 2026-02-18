import ScrollReveal from '../components/ScrollReveal';

const WhyRealSection = () => {
  return (
    <section className="w-full bg-black py-6 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* Full explanation image */}
        <ScrollReveal delay={0.1}>
          <div className="w-full">
            <img 
              src="/image3.jpg" 
              alt="Kenapa Clipper itu real dan lagi gila-gilaan - Penjelasan lengkap sistem AutoClip Cuan Engine"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyRealSection;
