'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const PROGRAMS = [
  {
    title: 'Innovation Exhibition',
    copy: 'A showcase of 100+ pioneering companies driving the energy–water–compute nexus.',
    image: '/files/inio.jpeg', // placeholder editorial image
  },
  {
    title: 'Strategic Leadership Forum',
    copy: 'Closed-door dialogues with ministers, CEOs, and pioneers shaping the energy transition.',
    image: '/files/day1.jpg',
  },
  {
    title: 'WFLEC Awards',
    copy: 'Celebrating excellence in leadership, innovation, and emerging talent in global energy.',
    image: '/files/award.jpg',
  },
  {
    title: 'Future Energy Leaders Boardroom',
    copy: 'Invite-only networking sessions connecting decision-makers and rising leaders.',
    image: '/files/ini.jpg',
  },
  {
    title: 'Mentorship Circles',
    copy: 'Small group sessions bridging executives and young professionals for real impact.',
    image: '/files/cir.jpg',
  },
];

const ProgramHighlights: React.FC = () => {
  return (
    <section id="program" className="relative py-24 bg-[#121418] text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-[#F6C15F]/90 mb-2">
            Program Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            A Multi-Format Experience Designed for Impact
          </h2>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            WFLEC 2026 balances leadership, innovation, and talent development through five unique program elements.
          </p>
        </motion.div>

        {/* Alternating Layout */}
        <div className="space-y-24">
          {PROGRAMS.map((p, idx) => (
            <div
              key={p.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={idx % 2 === 0 ? fadeLeft : fadeRight}
                className="space-y-4"
              >
                <p className="text-[#F6C15F]/90 text-sm font-medium">Program Pillar</p>
                <h3 className="text-2xl font-bold">{p.title}</h3>
                <p className="text-white/80 text-base">{p.copy}</p>
              </motion.div>

              {/* Image */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={idx % 2 === 0 ? fadeRight : fadeLeft}
                className="relative h-72 sm:h-96 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlights;
