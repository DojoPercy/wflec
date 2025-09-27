'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { GraduationCap, Landmark, Lightbulb, Users } from 'lucide-react';

/**
 * WFLEC — Hero + KeyPillars (with image placeholders)
 *
 * IMPORTANT: This file references image assets by path under `/public`.
 * Please add the recommended images to your Next.js project's `public/` folder.
 * See the "Image asset checklist" below for exact filenames and recommended types.
 *
 * Notes about the sample audience photo you uploaded:
 * - You provided: /mnt/data/pexels-jibarofoto-2774556.jpg
 * - To use it in this component, copy it into your Next project's public folder:
 *   -> ./public/images/audience-hero.jpg
 *
 * Variants: use typed cubic-bezier arrays for `ease` to satisfy framer-motion + TS.
 */

/* =========================
   EASING & ANIMATION VARIANTS
   ========================= */
const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* =========================
   IMAGE ASSET CHECKLIST (place these files in ./public)
   =========================

   /public/images/hero-abu-dhabi.jpg       - hero background image (1920×1080 or 2560×1440, JPG/WebP)
   /public/images/audience-hero.jpg        - supporting photo (use the pexels file you uploaded)
   /public/images/wflec-logo-white.png     - white logo variant (PNG or SVG)

   /public/icons/leadership.svg            - thin-line gold-accent SVG (64×64 viewBox recommended)
   /public/icons/innovation.svg
   /public/icons/policy.svg
   /public/icons/talent.svg

   (If you don't have SVGs yet, PNGs at 120×120 will work as fallbacks.)
*/

/* =========================
   HERO COMPONENT
   - accepts `backgroundImage` prop (string path) so you can override at runtime
   ========================= */



/* =========================
   KEY PILLARS SECTION
   - uses small SVG/PNG icons for each pillar
   ========================= */

const PILLAR_ICONS = [
  '/icons/leadership.svg',
  '/icons/innovation.svg',
  '/icons/policy.svg',
  '/icons/talent.svg',
];

const PILLARS = [
  {
    title: "Leadership",
    copy: "Connect with senior decision makers shaping the global energy transition.",
    icon: Users,
  },
  {
    title: "Innovation",
    copy: "Discover pioneering technologies across the energy–water–compute nexus.",
    icon: Lightbulb,
  },
  {
    title: "Policy",
    copy: "Engage with policymakers driving frameworks for sustainable growth.",
    icon: Landmark,
  },
  {
    title: "Talent",
    copy: "Empowering rising leaders and changemakers to shape the next decade.",
    icon: GraduationCap,
  },
];

export const KeyPillars: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#05060a] to-[#0b0d11] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
          <p className="text-sm uppercase tracking-wider text-[#F6C15F]/90">Why WFLEC 2026</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">A Global Platform for Tomorrow’s Energy Leaders</h2>
          <p className="mt-4 text-white/80 max-w-2xl">WFLEC brings together leadership, innovation, policy, and talent — the four pillars driving sustainable energy futures worldwide.</p>
        </motion.div>

        <motion.div
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.25 }}
  variants={stagger}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
>
  {PILLARS.map(({ title, copy, icon: Icon }) => (
    <motion.article
      key={title}
      variants={fadeUp}
      className="rounded-2xl p-6 bg-white/4 backdrop-blur-sm border border-white/10 hover:shadow-xl transition-transform hover:-translate-y-1"
    >
      {/* Icon from Lucide */}
      <div className="h-12 w-12 mb-4 rounded-full bg-gradient-to-r from-[#F6C15F] to-[#F3911A] flex items-center justify-center">
        <Icon className="h-6 w-6 text-[#06121B]" strokeWidth={2.5} />
      </div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/80 text-sm">{copy}</p>
    </motion.article>
  ))}
</motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={fadeUp} className="mt-12">
          <a href="#agenda" className="inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F6C15F] to-[#F3911A] text-[#06121B] font-semibold">
            See Program Highlights
          </a>
        </motion.div>
      </div>
    </section>
  );
};


