'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'all' | 'designer' | 'developer' | 'manager';

interface RoleContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRoleState] = useState<UserRole>('all');

    useEffect(() => {
        // Load from local storage
        const savedRole = localStorage.getItem('design-system-role') as UserRole;
        if (savedRole) {
            setRoleState(savedRole);
        }
    }, []);

    const setRole = (newRole: UserRole) => {
        setRoleState(newRole);
        localStorage.setItem('design-system-role', newRole);
    };

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}
