import ScrollReveal from '../components/ScrollReveal';

const ExplanationSection = () => {
  return (
    <section className="w-full bg-black py-6 px-4">
      <div className="max-w-[480px] mx-auto">
        <ScrollReveal delay={0.1}>
          <p className="text-base text-white text-center mb-4 leading-relaxed">
            Itu bukan karena lo gak bisa. Tapi karena{' '}
            <span className="highlight-blue">lo belum tau sistem cuan dari clipping konten</span>{' '}
            yang lagi rame banget dipakai ribuan orang sekarang.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-accent-red text-white px-4 py-2 rounded mb-4 inline-block">
            <p className="font-bold text-sm">Lo sering liat akun yang:</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <ul className="list-disc list-inside text-white mb-6 space-y-2">
            <li className="text-base">Isinya cuma potongan video orang lain</li>
            <li className="text-base">Gak pernah muncul muka</li>
            <li className="text-base">Gak pernah ngedit ribet</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="text-base text-white text-center mb-2">
            Tapi <span className="font-bold text-accent-yellow">views jutaan.</span>
          </p>
          <p className="text-base text-white text-center mb-6">
            Dan orderan clip masuk tiap hari.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="text-center mb-4">
            <span className="text-2xl mr-2">💡</span>
            <span className="text-accent-red font-bold text-lg">Rahasianya?</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <p className="text-base text-white text-center mb-2">
            Mereka bukan kreator.
          </p>
          <p className="text-base text-white text-center mb-6">
            Mereka cuma <span className="highlight-red font-bold">Clipper.</span>
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.7}>
          <p className="text-base text-white text-center italic mb-2">
            Bukan karena skill editing.
          </p>
          <p className="text-base text-white text-center italic mb-2">
            Bukan bakat kamera.
          </p>
          <p className="text-base text-white text-center mb-6">
            Tapi <span className="highlight-red">sistem kerja AutoClip Cuan Engine</span> yang udah terbukti jalan.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ExplanationSection;
