'use client';

import React from 'react';
import { motion } from 'framer-motion';

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const OBJECTIVES = [
  'Cultivate Future Energy Leaders through mentorship and global exposure.',
  'Highlight the Energy–Water–Compute Nexus as a driver of sustainable innovation.',
  'Facilitate cross-sector dialogue between policymakers, industry, and youth.',
  'Position Abu Dhabi as the global hub for purpose-driven leadership.',
];

const THEMES = [
  {
    title: 'Energy–Water–Compute Nexus',
    copy: 'Exploring the interdependence of resources that underpin the world’s future systems.',
  },
  {
    title: 'Generational Leadership',
    copy: 'Creating bridges between today’s decision makers and the leaders of tomorrow.',
  },
  {
    title: 'Technology & Transition',
    copy: 'Examining the role of AI, hydrogen, and digital infrastructure in sustainable growth.',
  },
  {
    title: 'Cross-Sector Collaboration',
    copy: 'Uniting policymakers, corporates, and innovators to drive global transformation.',
  },
  {
    title: 'Purpose-Driven Leadership',
    copy: 'Embedding values and sustainability at the heart of leadership decisions.',
  },
];

const ObjectivesThemes: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#0E1015] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Objectives */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-20"
        >
          <p className="text-sm uppercase tracking-widest text-[#F6C15F]/90 mb-2">
            WFLEC 2026 Objectives
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Driving Change Through Purposeful Leadership
          </h2>

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-10"
          >
            {OBJECTIVES.map((o, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-start gap-6"
              >
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F6C15F] to-[#F3911A]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-lg text-white/85">{o}</p>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        {/* Core Themes */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className="text-sm uppercase tracking-widest text-[#F6C15F]/90 mb-2">
            Core Themes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            The Intellectual Backbone of WFLEC 2026
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="divide-y divide-white/10 border-t border-b border-white/10"
          >
            {THEMES.map((t, i) => (
              <motion.div
                key={t.title}
                variants={fadeUp}
                className={`py-8 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}
              >
                <h3 className="text-2xl font-semibold text-[#F6C15F] mb-2">
                  {t.title}
                </h3>
                <p className="text-white/80 max-w-2xl mx-auto">{t.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ObjectivesThemes;
