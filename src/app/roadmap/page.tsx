"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RoadmapCanvas from '@/components/roadmap/RoadmapCanvas';
import ProgressTracker from '@/components/lesson/ProgressTracker';
import { roadmapNodes } from '@/data/roadmap';

export default function RoadmapPage() {
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
  const handleNodeComplete = (nodeId: string) => {
    setCompletedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      
      // Save to localStorage
      localStorage.setItem('completedNodes', JSON.stringify([...newSet]));
      
      return newSet;
    });
  };

  // Handle reset progress
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('completedNodes');
      setCompletedNodes(new Set());
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Design System Roadmap</h1>
      
      <ProgressTracker 
        totalNodes={roadmapNodes.length}
        completedNodes={completedNodes}
        onReset={handleResetProgress}
      />

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <RoadmapCanvas />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-3">How to Use</h3>
          <p className="mb-4">
            Click on any node in the roadmap to view the lesson content. Mark lessons as complete
            to track your progress through the roadmap.
          </p>
          <p>
            Your progress is automatically saved in your browser and will be available when you return.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-3">Node Types</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-4 h-4 mr-2 rounded-full bg-yellow-400"></span>
              Main topics (core concepts)
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 mr-2 rounded-full bg-yellow-200"></span>
              Sub-topics (categories)
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 mr-2 rounded-full bg-yellow-100"></span>
              Leaf nodes (specific lessons)
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-3">Navigation Tips</h3>
          <ul className="space-y-2">
            <li>Use mouse wheel to zoom in/out</li>
            <li>Click and drag to pan around the roadmap</li>
            <li>Click on nodes to view lesson content</li>
            <li>Use the controls in the bottom-right to reset view</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
