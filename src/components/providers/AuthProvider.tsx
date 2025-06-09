'use client';

import React from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Better Auth React client handles its own context internally
  // No additional provider wrapper needed for Better Auth
  return <>{children}</>;
};