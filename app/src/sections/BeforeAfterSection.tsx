import ScrollReveal from '../components/ScrollReveal';

const BeforeAfterSection = () => {
  return (
    <section className="w-full bg-black py-6 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* Before/After Image */}
        <ScrollReveal delay={0.1}>
          <div className="w-full mb-4">
            <img 
              src="/image2.jpg" 
              alt="Perbandingan Clipping Manual vs Auto Clip - Sebelum dan Sesudah menggunakan AutoClip Cuan Engine"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
