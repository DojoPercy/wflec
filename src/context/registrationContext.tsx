'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RegistrationContextType {
  isOpen: boolean;
  isRegistered: boolean;
  openModal: () => void;
  closeModal: () => void;
  markAsRegistered: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

const STORAGE_KEY = 'wflec_registered';

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within RegistrationProvider');
  }
  return context;
};

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Check registration status on mount
  useEffect(() => {
    const registered = localStorage.getItem(STORAGE_KEY) === 'true';
    setIsRegistered(registered);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  const markAsRegistered = () => {
    setIsRegistered(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  return (
    <RegistrationContext.Provider value={{ isOpen, isRegistered, openModal, closeModal, markAsRegistered }}>
      {children}
    </RegistrationContext.Provider>
  );
};
