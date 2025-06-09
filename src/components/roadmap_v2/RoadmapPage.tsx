'use client';

import React from 'react';
import { designSystemRoadmap } from '@/data/roadmapData';
import { ModuleSection } from './ModuleSection';
import { ProgressTracker } from './ProgressTracker';
import { useProgress } from '@/hooks/useProgress';

export const RoadmapPage: React.FC = () => {
  const { isNodeCompleted, toggleNodeCompletion, resetProgress } = useProgress();

  const getTotalProgress = () => {
    const totalLessons = designSystemRoadmap.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = designSystemRoadmap.reduce((acc, module) => 
      acc + module.lessons.filter(lesson => isNodeCompleted(lesson.id)).length, 0);
    return { total: totalLessons, completed: completedLessons };
  };

  const { total, completed } = getTotalProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Design System Roadmap
              </h1>
              <p className="text-lg text-gray-600">
                Master design systems step by step with our comprehensive learning path
              </p>
            </div>
            <div className="flex-shrink-0">
              <ProgressTracker 
                totalLessons={total} 
                completedLessons={completed}
                onReset={resetProgress}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {designSystemRoadmap.map((module) => (
            <ModuleSection
              key={module.id}
              module={module}
              isNodeCompleted={isNodeCompleted}
              onToggleCompletion={toggleNodeCompletion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 