'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useRegistration } from '@/context/registrationContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  country: string;
  attendanceType: string;
  interests: string[];
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    country: '',
    attendanceType: '',
    interests: [],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Import the registration context to track registration status
  const { markAsRegistered } = useRegistration();

  const interestOptions = [
    'Leadership Development',
    'Innovation & Technology',
    'Policy & Regulation',
    'Networking',
    'Exhibition',
    'Sponsorship Opportunities',
    'Speaking Opportunities',
  ];

  const attendanceTypes = [
    { value: 'delegate', label: 'Conference Delegate' },
    { value: 'speaker', label: 'Speaker/Panelist' },
    { value: 'sponsor', label: 'Sponsor/Exhibitor' },
    { value: 'media', label: 'Media/Press' },
    { value: 'student', label: 'Student/Academic' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.attendanceType) {
      newErrors.attendanceType = 'Please select attendance type';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one area of interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the Google Apps Script Web App URL from environment variable
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error('Google Script URL not configured. Please check your .env.local file.');
      }

      // Send data to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Note: With 'no-cors', we can't read the response, but the request will succeed
      // Google Apps Script will handle the data storage and email notifications
      console.log('Form Data submitted:', formData);
      
      // Mark user as registered to enable prospectus download
      markAsRegistered();
      
      // Show success
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          organization: '',
          jobTitle: '',
          country: '',
          attendanceType: '',
          interests: [],
          message: '',
        });
        onClose();
      }, 3000);
      
    } catch (error) {
      setSubmitError('Failed to submit registration. Please try again or contact us directly.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
    if (errors.interests) {
      setErrors((prev) => ({ ...prev, interests: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0E1015] to-[#1a1d24] rounded-2xl shadow-2xl border border-white/10"
        >
          {/* Success State */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[#0E1015]/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl"
            >
              <div className="text-center px-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
                <p className="text-white/70">
                  Thank you for your interest in WFLEC 2026. We'll be in touch soon with more details.
                </p>
              </div>
            </motion.div>
          )}

          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#F6C15F] to-[#F3911A] px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-2xl font-bold text-[#06121B]">Register Your Interest</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-[#06121B]" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <p className="text-white/70 text-sm">
              Join us at WFLEC 2026 in Abu Dhabi. Fill out the form below and our team will contact you with registration details.
            </p>

            {submitError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white/90 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.fullName ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F6C15F] transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F6C15F] transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.phone ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F6C15F] transition-all`}
                    placeholder="+971 50 123 4567"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-white/90 mb-2">
                    Country <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.country ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F6C15F] transition-all`}
                    placeholder="United Arab Emirates"
                  />
                  {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Professional Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-white/90 mb-2">
                    Organization <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.organization ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F6C15F] transition-all`}
                    placeholder="Company Name"
                  />
                  {errors.organization && <p className="text-red-400 text-xs mt-1">{errors.organization}</p>}
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-white/90 mb-2">
                    Job Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.jobTitle ? 'border-red-500' : 'border-white/10'
                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F6C15F] transition-all`}
                    placeholder="Chief Executive Officer"
                  />
                  {errors.jobTitle && <p className="text-red-400 text-xs mt-1">{errors.jobTitle}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="attendanceType" className="block text-sm font-medium text-white/90 mb-2">
                  Attendance Type <span className="text-red-400">*</span>
                </label>
                <select
                  id="attendanceType"
                  name="attendanceType"
                  value={formData.attendanceType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 bg-white/5 border ${
                    errors.attendanceType ? 'border-red-500' : 'border-white/10'
                  } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F6C15F] transition-all`}
                >
                  <option value="" className="bg-[#1a1d24]">Select attendance type</option>
                  {attendanceTypes.map((type) => (
                    <option key={type.value} value={type.value} className="bg-[#1a1d24]">
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.attendanceType && <p className="text-red-400 text-xs mt-1">{errors.attendanceType}</p>}
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Areas of Interest <span className="text-red-400">*</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <label
                    key={interest}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                      formData.interests.includes(interest)
                        ? 'bg-[#F6C15F]/10 border-[#F6C15F]'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                      className="w-4 h-4 rounded border-white/20 text-[#F6C15F] focus:ring-[#F6C15F]"
                    />
                    <span className="text-white/90 text-sm">{interest}</span>
                  </label>
                ))}
              </div>
              {errors.interests && <p className="text-red-400 text-xs mt-1">{errors.interests}</p>}
            </div>

            {/* Additional Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F6C15F] transition-all resize-none"
                placeholder="Tell us more about your interest in WFLEC 2026..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl border border-white/20 text-white/90 font-semibold hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F6C15F] to-[#F3911A] text-[#06121B] font-semibold hover:shadow-lg hover:shadow-[#F6C15F]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Registration
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RegistrationModal;
