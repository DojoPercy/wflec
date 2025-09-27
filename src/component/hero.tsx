'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type HeroProps = {
  backgroundImage: string;
  logoSrc: string;
  prospectusHref?: string;
  onPrimaryCTAClick?: () => void;
  onSecondaryCTAClick?: () => void;
  logoBadge?: string;
};

/**
 * WFLEC Hero — refined executive hero section
 * Fixes from visual test:
 * - Removed harsh black split layout, use immersive full background with balanced overlay.
 * - Keep text aligned left with safe margins but overlay on softened background.
 * - Headline with brand accent highlight, consistent spacing and responsive clamp sizes.
 * - CTAs styled with stronger hierarchy and breathing room.
 * - Right image column removed for a cleaner, premium single focal hero.
 */

const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  logoSrc,
  prospectusHref = '/sponsorship-prospectus.pdf',
  onPrimaryCTAClick,
  onSecondaryCTAClick,
  logoBadge,
}) => {
  const reduceMotion = useReducedMotion();

  const container: Variants = reduceMotion
    ? { hidden: {}, enter: {} }
    : { hidden: { opacity: 0 }, enter: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.08 } } };

  const fadeUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, enter: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };

  const popIn: Variants = reduceMotion
    ? { hidden: { opacity: 1, scale: 1 }, enter: { opacity: 1, scale: 1 } }
    : { hidden: { opacity: 0, scale: 0.96 }, enter: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } } };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src={backgroundImage}
          alt="Abu Dhabi skyline"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1920px"
          className="object-cover object-center"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="enter"
        variants={container}
        className="relative w-full px-6 lg:px-12"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Logo */}
          <motion.div variants={popIn} className="flex flex-col items-center lg:items-start">
            <Image src={logoSrc} alt="WFLEC Logo" width={280} height={80} priority className="h-32 w-auto scale-200" />
            {logoBadge && (
              <span className="mt-3 inline-block rounded-full bg-white/10 text-white/90 px-3 py-1 text-xs md:text-sm">
                {logoBadge}
              </span>
            )}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-10 font-extrabold leading-tight tracking-tight text-white"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)' }}
          >
            Shaping the Future of <br />
            <span className="text-[#F6C15F]">Global Energy Leadership</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-white/85 text-base sm:text-lg"
          >
            Abu Dhabi • 10–12 March 2026 — A focused forum for senior leaders, policymakers, and rising talent to advance the energy–water–compute nexus.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <motion.button
              variants={popIn}
              onClick={onPrimaryCTAClick}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F6C15F] to-[#F3911A] text-[#06121B] font-semibold text-lg shadow-lg hover:scale-[1.02] transition-transform"
            >
              Register Interest
            </motion.button>

            <motion.a
              variants={popIn}
              href={prospectusHref}
              onClick={onSecondaryCTAClick}
              className="px-6 py-3 rounded-2xl border border-white/30 text-white/95 text-base hover:bg-white/5 transition"
            >
              Download Prospectus
            </motion.a>
          </motion.div>

          {/* Supporting note */}
          <motion.p variants={fadeUp} className="mt-6 text-sm text-white/70 max-w-prose">
            Partner with WFLEC to access senior decision makers, showcase solutions, and shape leadership frameworks for the energy transition.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div variants={fadeUp} className="hidden lg:flex justify-center mt-14">
          <a href="#about" className="inline-flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm">Scroll</span>
            <span className="w-7 h-12 border border-white/30 rounded-full flex items-start justify-center py-1">
              <span className="block w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Hero;
