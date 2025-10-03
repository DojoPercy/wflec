'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Award, Medal } from 'lucide-react';
import { useProtectedDownload } from '@/hooks/useProtectedDownload';

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const TIERS = [
  {
    name: 'Platinum Partner',
    icon: Crown,
    color: 'from-white to-[#F6C15F]',
    benefits: [
      'Premium branding across all event touchpoints',
      'Exclusive speaking opportunity in plenary session',
      '10 VIP delegate passes',
      'Priority exhibition space',
    ],
  },
  {
    name: 'Gold Partner',
    icon: Star,
    color: 'from-[#F6C15F] to-[#F3911A]',
    benefits: [
      'High visibility branding on digital & onsite channels',
      'Panel participation opportunity',
      '6 VIP delegate passes',
      'Prime exhibition space',
    ],
  },
  {
    name: 'Silver Partner',
    icon: Award,
    color: 'from-gray-300 to-gray-500',
    benefits: [
      'Branding on selected event materials',
      'Networking lounge access',
      '4 VIP delegate passes',
      'Exhibition booth inclusion',
    ],
  },
  {
    name: 'Bronze Partner',
    icon: Medal,
    color: 'from-amber-700 to-yellow-600',
    benefits: [
      'Logo placement on website & event guide',
      '2 VIP delegate passes',
      'Standard exhibition booth',
    ],
  },
];

const SponsorshipOpportunities: React.FC = () => {
  const { handleDownload } = useProtectedDownload();
  
  return (
    <section className="relative py-24 bg-[#14161d] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-[#F6C15F]/90 mb-2">
            Partnerships
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Sponsorship Opportunities
          </h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            Align your brand with global energy leadership at WFLEC 2026 and gain
            unmatched visibility among decision-makers and innovators.
          </p>
        </motion.div>

        {/* Sponsorship Tiers */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {TIERS.map(({ name, icon: Icon, color, benefits }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="rounded-2xl p-6 bg-[#1c1f25] border border-white/10 shadow-md hover:shadow-xl hover:shadow-[#F6C15F]/20 transition-transform hover:-translate-y-1 flex flex-col"
            >
              {/* Icon */}
              <div
                className={`h-14 w-14 mb-4 rounded-full bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}
              >
                <Icon className="h-7 w-7 text-[#06121B]" strokeWidth={2.5} />
              </div>

              {/* Tier Name */}
              <h3 className="text-xl font-semibold mb-4">{name}</h3>

              {/* Benefits */}
              <ul className="space-y-2 text-sm text-white/80 flex-1">
                {benefits.map((b, idx) => (
                  <li key={idx}>• {b}</li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6">
                <button
                  onClick={() => handleDownload('Sponsorship Prospectus- WFLEC 2026 –.pdf', 'WFLEC-2026-Sponsorship-Prospectus.pdf')}
                  className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#F6C15F] to-[#F3911A] text-[#06121B] font-semibold hover:scale-[1.02] transition-transform"
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Download CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => handleDownload('Sponsorship Prospectus- WFLEC 2026 –.pdf', 'WFLEC-2026-Sponsorship-Prospectus.pdf')}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F6C15F] to-[#F3911A] text-[#06121B] font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            Download Full Prospectus
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorshipOpportunities;
