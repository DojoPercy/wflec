'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Landmark, Building2, Globe2 } from 'lucide-react';
import Image from 'next/image';

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const STATS = [
  { label: 'Delegates', value: '1,000+' },
  { label: 'Exhibitors', value: '100+' },
  { label: 'Countries', value: '50+' },
];

const AUDIENCE = [
  {
    title: 'Emerging Leaders',
    desc: 'Professionals aged 25–40 driving change in energy, sustainability, and technology sectors.',
    icon: Users,
  },
  {
    title: 'Senior Executives & Policymakers',
    desc: 'Ministers, CEOs, and directors shaping the global energy and sustainability agenda.',
    icon: Landmark,
  },
  {
    title: 'Energy & Technology Corporates',
    desc: 'Global energy companies, technology innovators, and infrastructure players.',
    icon: Building2,
  },
  {
    title: 'NGOs & International Organizations',
    desc: 'Non-profits, UN bodies, and development agencies committed to sustainable futures.',
    icon: Globe2,
  },
];

const TargetAudience: React.FC = () => {
  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/files/view.jpg"
          alt="Conference audience"
          fill
          priority
          className="object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1015]/90 to-[#0E1015]/95 -z-10" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-[#F6C15F]/90 mb-2">
            Who Attends
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            A Curated Global Audience
          </h2>
          <p className="mt-3 text-white/85 text-lg max-w-2xl mx-auto">
            WFLEC convenes a unique mix of leaders, innovators, and changemakers
            shaping the future of energy.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center mb-20"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F6C15F] to-[#F3911A]">
                {s.value}
              </p>
              <p className="mt-1 text-white/70 text-sm uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Audience Strips */}
        <div className="space-y-10">
          {AUDIENCE.map(({ title, desc, icon: Icon }, idx) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="flex items-start gap-6 border-t border-white/10 pt-8"
            >
              {/* Icon */}
              <div className="flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-r from-[#F6C15F] to-[#F3911A] flex items-center justify-center shadow-lg">
                <Icon className="h-7 w-7 text-[#06121B]" strokeWidth={2.5} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-white/80">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-20 flex justify-center"
        >
          <a
            href="#register"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F6C15F] to-[#F3911A] text-[#06121B] font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            Join the WFLEC 2026 Audience
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetAudience;
