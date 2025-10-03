'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative bg-gradient-to-b from-[#1a4d4d] to-[#0f3333] text-white overflow-hidden">
      {/* Decorative top wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F6C15F] via-[#F3911A] to-[#E94E1B]" />

      {/* Contact Us Section */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/files/logowhite.png"
              alt="Future Leaders in Energy"
              width={200}
              height={60}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            CONTACT US
          </h2>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* For Sponsorships */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/8 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#F6C15F]">
              For Sponsorships
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg">Richmond Anim Damoah</p>
                <p className="text-white/80 text-sm">Founder & CEO, RAD Communications</p>
              </div>
              
              <div className="flex items-start gap-3 text-white/90">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#F6C15F]" />
                <div className="space-y-1">
                  <a href="tel:+971357909643" className="block hover:text-[#F6C15F] transition-colors">
                    +971 35 790 9643
                  </a>
                  <a href="tel:+233247415140" className="block hover:text-[#F6C15F] transition-colors">
                    +233 24 741 5140
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-white/90">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#F6C15F]" />
                <a 
                  href="mailto:richmond@radcommgroup.com" 
                  className="hover:text-[#F6C15F] transition-colors break-all"
                >
                  richmond@radcommgroup.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* For Nominations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/8 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#F6C15F]">
              For Nominations
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-lg">Rhema Afi Kpormegbey</p>
                <p className="text-white/80 text-sm">Business Head – Conferences & Awards</p>
              </div>
              
              <div className="flex items-center gap-3 text-white/90">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#F6C15F]" />
                <a 
                  href="mailto:rhema@radcommgroup.com" 
                  className="hover:text-[#F6C15F] transition-colors break-all"
                >
                  rhema@radcommgroup.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Office Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-[#F6C15F]/10 to-[#F3911A]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#F6C15F]/20"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#E94E1B] rounded-full p-3 flex-shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Office Location</h3>
              <p className="text-white/90">
                Business Center - First Floor Incubator Building<br />
                Masdar City, Abu Dhabi, United Arab Emirates
              </p>
            </div>
          </div>
        </motion.div>

        {/* Decorative orange wave */}
        <div className="absolute bottom-0 right-0 pointer-events-none opacity-20">
          <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 100C350 50 300 0 200 50C100 100 50 150 0 100V200H400V100Z" fill="#F3911A"/>
          </svg>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/files/logowhite.png"
                alt="World Future Leaders"
                width={150}
                height={40}
                className="h-10 w-auto opacity-80"
              />
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-white/70 text-sm">
                © {new Date().getFullYear()} World Future Leaders in Energy Congress. All rights reserved.
              </p>
              <p className="text-white/60 text-xs mt-1">
                Organized by RAD Communications
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
