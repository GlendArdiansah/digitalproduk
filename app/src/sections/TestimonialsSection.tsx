import ScrollReveal from '../components/ScrollReveal';

const TestimonialsSection = () => {
  return (
    <section className="w-full bg-black py-6 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* Testimonials Image */}
        <ScrollReveal delay={0.1}>
          <div className="w-full">
            <img 
              src="/image4.jpg" 
              alt="Testimoni pengguna AutoClip Cuan Engine - Rizky, Dnin Cust, dan Andre berbagi pengalaman sukses"
              className="w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
