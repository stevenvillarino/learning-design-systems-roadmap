'use client';

import React from 'react';
import { designSystemRoadmap } from '@/data/roadmapData';
import { ModuleSection } from './ModuleSection';
import { ProgressTracker } from './ProgressTracker';
import { RoleSelector } from '../roadmap/RoleSelector';
import { useRole } from '@/hooks/useRole';
import { useProgress } from '@/hooks/useProgress';

export const RoadmapPage: React.FC = () => {
  const { isNodeCompleted, toggleNodeCompletion, resetProgress } = useProgress();
  const { role } = useRole();

  // Filter content based on role
  const filteredRoadmap = designSystemRoadmap.map(module => ({
    ...module,
    lessons: module.lessons.filter(lesson => {
      if (role === 'all') return true;
      if (!lesson.targetAudience) return true; // Show general content to everyone
      return lesson.targetAudience.includes(role);
    })
  })).filter(module => module.lessons.length > 0);

  const getTotalProgress = () => {
    // Calculate progress based on filtered content
    const totalLessons = filteredRoadmap.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = filteredRoadmap.reduce((acc, module) =>
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
              <p className="text-lg text-gray-600 mb-4">
                Master design systems step by step with our comprehensive learning path
              </p>
              <RoleSelector />
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
          {filteredRoadmap.map((module) => (
            <ModuleSection
              key={module.id}
              module={module}
              isNodeCompleted={isNodeCompleted}
              onToggleCompletion={toggleNodeCompletion}
            />
          ))}

          {filteredRoadmap.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No lessons found for the selected role.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 