'use client';

import { useRegistration } from '@/context/registrationContext';
import { useCallback } from 'react';

export const useProtectedDownload = () => {
  const { isRegistered, openModal } = useRegistration();

  const handleDownload = useCallback((fileName: string, displayName?: string) => {
    if (!isRegistered) {
      // User is not registered, open registration modal
      // You can add a toast notification here if desired
      alert('Please register your interest to download the prospectus. The registration form will open now.');
      openModal();
      return;
    }

    // User is registered, proceed with download
    const link = document.createElement('a');
    link.href = `/files/${fileName}`;
    link.download = displayName || fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [isRegistered, openModal]);

  return { handleDownload, isRegistered };
};
