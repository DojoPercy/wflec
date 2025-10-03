'use client';

import React from 'react';
import { useRegistration } from '@/context/registrationContext';
import RegistrationModal from './registrationModal';

const RegistrationWrapper: React.FC = () => {
  const { isOpen, closeModal } = useRegistration();

  return <RegistrationModal isOpen={isOpen} onClose={closeModal} />;
};

export default RegistrationWrapper;
