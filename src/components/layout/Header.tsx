'use client';

import React from 'react';
import { MenuIcon, UserIcon, LogOutIcon, LogInIcon } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  // Temporarily disable auth for development
  const session = null;
  const isPending = false;
  // const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.reload();
          }
        }
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleSignIn = () => {
    // For now, redirect to a sign-in page or show a modal
    // You can customize this based on your preferred auth flow
    window.location.href = '/auth/signin';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between sticky top-0 z-30">
      {/* Left side - Menu button and title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-gray-900">
            Design System Learning
          </h1>
        </div>
      </div>

      {/* Right side - User menu */}
      <div className="flex items-center gap-4">
        {isPending ? (
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        ) : session?.user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm text-gray-700">
              Welcome, {session.user.email}
            </div>
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-blue-600" />
                </div>
              </button>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    {session.user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <LogInIcon className="w-4 h-4" />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};