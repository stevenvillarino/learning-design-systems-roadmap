'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { RoleProvider } from '@/hooks/useRole';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <RoleProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

        {/* Main content area */}
        <div className="lg:ml-80">
          {/* Header */}
          <Header onMenuClick={handleMenuClick} />

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </RoleProvider>
  );
};