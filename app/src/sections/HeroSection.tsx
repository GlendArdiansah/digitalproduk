import { motion } from 'framer-motion';
import CTAButton from '../components/CTAButton';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="w-full bg-black py-4 px-4">
      <motion.div 
        className="max-w-[480px] mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1 
          className="text-2xl sm:text-3xl font-extrabold text-center text-white leading-tight mb-2"
          variants={itemVariants}
        >
          TOOLS SIMPEL YANG BISA{' '}
          <span className="highlight-yellow">HASILIN 5-20 JUTA/BULAN</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="text-lg sm:text-xl text-center italic mb-4"
          variants={itemVariants}
        >
          <span className="text-accent-red">Tanpa Skill Editing, Tanpa Ribet, —</span>{' '}
          <span className="highlight-green">Cuan dari Clipper dengan AutoClip Cuan Engine</span>
        </motion.p>

        {/* Quote Box */}
        <motion.div 
          className="bg-white text-black px-4 py-3 rounded-lg mb-6 max-w-[90%]"
          variants={itemVariants}
        >
          <p className="text-sm sm:text-base text-center font-medium">
            "Lo tiap hari scroll TikTok, Reels, atau Shorts... tapi belum pernah dapet penghasilan dari situ?"
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="w-full mb-6"
          variants={itemVariants}
        >
          <img 
            src="/image1.jpg" 
            alt="Auto Clip Cuan Engine - Tools untuk menghasilkan uang dari video clipping"
            className="w-full h-auto rounded-lg"
            loading="eager"
          />
        </motion.div>

        {/* CTA Button */}
        <CTAButton>
          SAYA MAU AKSES SEKARANG !!!
        </CTAButton>
      </motion.div>
    </section>
  );
};

export default HeroSection;
