import { motion } from 'framer-motion';
import CTAButton from '../components/CTAButton';
import ScrollReveal from '../components/ScrollReveal';

const FinalCTA = () => {
  return (
    <section className="w-full bg-black py-8 px-4">
      <div className="max-w-[480px] mx-auto flex flex-col items-center">
        {/* Urgency Text */}
        <ScrollReveal delay={0.1}>
          <motion.p 
            className="text-accent-red font-bold text-lg text-center mb-6"
            animate={{ 
              opacity: [1, 0.6, 1],
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            PROMO BERLAKU TERBATAS!
          </motion.p>
        </ScrollReveal>

        {/* CTA Button */}
        <ScrollReveal delay={0.2}>
          <CTAButton>
            SAYA MAU AKSES SEKARANG !!!
          </CTAButton>
        </ScrollReveal>

        {/* Trust Badge */}
        <ScrollReveal delay={0.3}>
          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              Bergabung dengan ribuan clipper sukses lainnya
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FinalCTA;
