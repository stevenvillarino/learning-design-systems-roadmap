"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LessonView from '@/components/lesson/LessonView';

export default function LessonPage() {
  const params = useParams();
  const nodeId = params?.nodeId as string;
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set());

  // Load completed nodes from localStorage on component mount
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
  }, []);

  // Handle node completion
  const handleComplete = (id: string) => {
    setCompletedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      
      // Save to localStorage
      localStorage.setItem('completedNodes', JSON.stringify([...newSet]));
      
      return newSet;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <LessonView 
        nodeId={nodeId} 
        onComplete={handleComplete}
        isCompleted={completedNodes.has(nodeId)}
      />
    </div>
  );
}
