'use client';

import React from 'react';
import { useRole, UserRole } from '@/hooks/useRole';
import { MonitorIcon, PenToolIcon, UsersIcon, LayersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RoleSelector() {
    const { role, setRole } = useRole();

    const options: { id: UserRole; label: string; icon: React.ReactNode }[] = [
        { id: 'all', label: 'All Roles', icon: <LayersIcon className="w-4 h-4" /> },
        { id: 'designer', label: 'Designer', icon: <PenToolIcon className="w-4 h-4" /> },
        { id: 'developer', label: 'Developer', icon: <MonitorIcon className="w-4 h-4" /> },
        { id: 'manager', label: 'Manager', icon: <UsersIcon className="w-4 h-4" /> },
    ];

    return (
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg inline-flex">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => setRole(option.id)}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                        role === option.id
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                    )}
                >
                    {option.icon}
                    {option.label}
                </button>
            ))}
        </div>
    );
}
