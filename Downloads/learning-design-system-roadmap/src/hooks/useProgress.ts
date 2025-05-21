import React, { useState, useEffect } from 'react';

// Custom hook for managing session-based progress
export function useProgress() {
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());
  
  // Load completed nodes from localStorage on hook initialization
  useEffect(() => {
    const savedNodes = localStorage.getItem('completedNodes');
    if (savedNodes) {
      try {
        const parsed = JSON.parse(savedNodes);
        setCompletedNodes(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse saved nodes:', e);
      }
    }
    
    // Initialize session if not exists
    const savedSession = localStorage.getItem('designSystemSession');
    if (!savedSession) {
      const newSession = {
        sessionId: `session-${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      localStorage.setItem('designSystemSession', JSON.stringify(newSession));
    }
  }, []);
  
  // Toggle completion status of a node
  const toggleNodeCompletion = (nodeId: string) => {
    setCompletedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      
      // Save to localStorage
      localStorage.setItem('completedNodes', JSON.stringify([...newSet]));
      
      // Update session last active timestamp
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
      
      return newSet;
    });
  };
  
  // Reset all progress
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('completedNodes');
      setCompletedNodes(new Set());
      
      // Create new session
      const newSession = {
        sessionId: `session-${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      localStorage.setItem('designSystemSession', JSON.stringify(newSession));
    }
  };
  
  // Check if a node is completed
  const isNodeCompleted = (nodeId: string) => {
    return completedNodes.has(nodeId);
  };
  
  // Get session information
  const getSessionInfo = () => {
    const savedSession = localStorage.getItem('designSystemSession');
    if (savedSession) {
      try {
        return JSON.parse(savedSession);
      } catch (e) {
        console.error('Failed to parse session data:', e);
        return null;
      }
    }
    return null;
  };
  
  return {
    completedNodes,
    toggleNodeCompletion,
    resetProgress,
    isNodeCompleted,
    getSessionInfo
  };
}
