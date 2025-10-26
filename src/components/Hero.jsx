import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

function Hero({ onStart }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white dark:from-neutral-950/70 dark:via-neutral-950/40 dark:to-neutral-950" />

      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          Bridge the gap between Sign and Speech
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-lg"
        >
          Real-time sign language interpretation powered by deep learning. Start translating instantly — no setup required.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={onStart}
            className="rounded-full bg-black px-6 py-3 text-white shadow-lg transition hover:scale-[1.02] hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Start Translating
          </button>
          <a
            href="#demo"
            className="rounded-full bg-white/70 px-6 py-3 text-black backdrop-blur transition hover:bg-white dark:bg-neutral-900/70 dark:text-white dark:hover:bg-neutral-900"
          >
            Try a Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
