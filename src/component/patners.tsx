'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick'; 
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EASE_OUT = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

// Placeholder logos — replace with actual files in /public/logos/
const LOGOS = [
  '/logos/adnoc.png',
  '/logos/masdar.png',
  '/logos/iea.png',
  '/logos/total.png',
  '/logos/siemens.png',
  '/logos/un.png',
];

const PartnerShowcase: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="relative py-20 bg-[#0f1116] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-[#F6C15F]/90 mb-2">
            Partners & Sponsors
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Backed by Industry Leaders
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            WFLEC 2026 is supported by leading organizations in energy,
            technology, and sustainability.
          </p>
        </motion.div>

        {/* Logos carousel */}
        <Slider {...settings}>
          {LOGOS.map((logo, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="px-6 flex items-center justify-center"
            >
              <Image
                src={logo}
                alt={`Partner logo ${idx + 1}`}
                width={160}
                height={80}
                className="object-contain grayscale hover:grayscale-0 hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PartnerShowcase;
