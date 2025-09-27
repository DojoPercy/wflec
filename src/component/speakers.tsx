'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

// Advisory board data
const BOARD = [
  {
    name: 'Dr. Martin Jagger',
    title:
      'Board Advisory | CCS Authority | Energy Transition Strategist | Climate Delivery Critic | Executive Advisor – WeConnect Energy',
    img: '/files/martin.jpeg', // replace with actual portrait
  },
  {
    name: 'Dr. Chris Cooper',
    title: 'CEO | AI Transformation Strategist | Digital Innovation Leader',
    img: '/files/chriscooper.jpg',
  },
  {
    name: 'Richmond Anim Damoah',
    title: 'Founder & CEO | RAD Communications | Architect of WFLEC',
    img: '/files/rad.jpg',
  },
  // Placeholder profiles
  {
    name: 'To Be Announced',
    title: 'Advisory Board Member',
    img: null,
  },
  {
    name: 'To Be Announced',
    title: 'Advisory Board Member',
    img: null,
  },
];

// Custom arrow components
const Arrow = ({ onClick, direction }: any) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 ${
      direction === 'left' ? 'left-2' : 'right-2'
    }`}
  >
    {direction === 'left' ? (
      <ChevronLeft className="h-6 w-6 text-[#F6C15F]" />
    ) : (
      <ChevronRight className="h-6 w-6 text-[#F6C15F]" />
    )}
  </button>
);

const BoardSpeakers: React.FC = () => {
  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <Arrow direction="right" />,
  prevArrow: <Arrow direction="left" />,
  responsive: [
    {
      breakpoint: 1280, // below 1280px → 2 per slide
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 1024, // below 1024px → 1 per slide
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 768, // below 768px → 1 per slide
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 480, // below 480px (small phones) → 1 per slide
      settings: { slidesToShow: 1 },
    },
  ],
};


  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0E1015] to-[#16191f] text-white overflow-hidden">
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
            Global Advisory Board
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Guided by World-Class Leaders
          </h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            A distinguished group of policymakers, executives, and innovators
            steer WFLEC’s vision and impact.
          </p>
        </motion.div>

        {/* Carousel */}
        <Slider {...settings}>
          {BOARD.map((person, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="px-4"
            >
              <div className="bg-[#1c1f25] rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-[#F6C15F]/20 transition-transform hover:-translate-y-1">
                <div className="relative h-40 w-40 mb-4">
                  {person.img ? (
                    <Image
                      src={person.img}
                      alt={person.name}
                      fill
                      className="object-cover rounded-full border-4 border-[#F6C15F]/40"
                    />
                  ) : (
                    <div className="h-40 w-40 rounded-full flex items-center justify-center bg-gradient-to-r from-[#F6C15F]/20 to-[#F3911A]/20 border-2 border-[#F6C15F]/40">
                      <User className="h-16 w-16 text-[#F6C15F]/60" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="text-sm text-white/70">{person.title}</p>
              </div>
            </motion.div>
          ))}
        </Slider>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-16 flex justify-center"
        >
          <a
            href="#advisory"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F6C15F] to-[#F3911A] text-[#06121B] font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            View Full Board
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BoardSpeakers;
