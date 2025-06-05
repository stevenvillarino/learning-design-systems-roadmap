"use client";

import React, { useState, useEffect } from 'react';
import { RoadmapNode } from '@/data/roadmap-old';

// Interface for progress tracking
interface ProgressTrackerProps {
  totalNodes: number;
  completedNodes: Set<string>;
  onReset: () => void;
}

export default function ProgressTracker({ 
  totalNodes, 
  completedNodes, 
  onReset 
}: ProgressTrackerProps) {
  // Calculate completion percentage
  const completionPercentage = Math.round(
    (completedNodes.size / totalNodes) * 100
  );

  // Session information
  const [sessionStarted, setSessionStarted] = useState<string>('');
  
  // Load session info on component mount
  useEffect(() => {
    const savedSession = localStorage.getItem('designSystemSession');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setSessionStarted(session.createdAt);
      } catch (e) {
        console.error('Failed to parse session data:', e);
      }
    } else {
      // Create new session if none exists
      const newSession = {
        sessionId: `session-${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      localStorage.setItem('designSystemSession', JSON.stringify(newSession));
      setSessionStarted(newSession.createdAt);
    }
    
    // Update last active timestamp
    const updateLastActive = () => {
      const savedSession = localStorage.getItem('designSystemSession');
      if (savedSession) {
        try {
          const session = JSON.parse(savedSession);
          session.lastActive = new Date().toISOString();
          localStorage.setItem('designSystemSession', JSON.stringify(session));
        } catch (e) {
          console.error('Failed to update session:', e);
        }
      }
    };
    
    // Update last active on component mount and every 5 minutes
    updateLastActive();
    const interval = setInterval(updateLastActive, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-3">Your Progress</h2>
      
      <div className="flex items-center mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <span className="ml-4 text-sm font-medium">
          {completionPercentage}% Complete
        </span>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div>
          {completedNodes.size} of {totalNodes} topics completed
        </div>
        <div>
          Session started: {formatDate(sessionStarted)}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={onReset}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
}
