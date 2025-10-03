'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Globe2, Users, BookOpen } from 'lucide-react';

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const OUTCOMES = [
  {
    title: 'Global Community of Leaders',
    copy: 'Formation of a global network of future energy leaders anchored in Abu Dhabi.',
    icon: Users,
  },
  {
    title: 'Policy & Leadership Frameworks',
    copy: 'Development of strategic recommendations to accelerate the energy transition.',
    icon: BookOpen,
  },
  {
    title: 'Cross-Generational Collaboration',
    copy: 'Strengthened bridges between current decision-makers and rising talent.',
    icon: Target,
  },
  {
    title: 'Positioning Abu Dhabi',
    copy: 'Enhanced visibility of the UAE as the capital for global energy leadership.',
    icon: Globe2,
  },
];

const ExpectedOutcomes: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#0E1015] text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F6C15F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F3911A]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-[#F6C15F]/90 mb-2">
            Outcomes
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            A Legacy of Impact
          </h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            WFLEC 2026 is designed to deliver tangible outcomes that extend
            beyond the congress itself.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="relative border-l-2 border-gradient-gold ml-8"
        >
          {OUTCOMES.map(({ title, copy, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ x: 8 }}
              className="mb-12 ml-6 relative group cursor-pointer"
            >
              {/* Icon */}
              <div className="absolute -left-10 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-[#F6C15F] to-[#F3911A] shadow-lg group-hover:shadow-[#F6C15F]/40 transition-shadow">
                <Icon className="h-5 w-5 text-[#06121B]" strokeWidth={2.5} />
              </div>

              {/* Text */}
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#F6C15F] transition-colors">{title}</h3>
              <p className="text-white/75 text-base group-hover:text-white/90 transition-colors">{copy}</p>
            </motion.div>
          ))}

          {/* Vertical glowing line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="absolute top-0 left-0 w-[2px] h-full origin-top bg-gradient-to-b from-[#F6C15F] to-[#F3911A]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ExpectedOutcomes;
