'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, ChevronRightIcon, BookOpenIcon, HomeIcon } from 'lucide-react';
import { designSystemRoadmap } from '@/data/roadmapData';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { isNodeCompleted } = useProgress();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const getTotalProgress = () => {
    const totalLessons = designSystemRoadmap.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = designSystemRoadmap.reduce((acc, module) => 
      acc + module.lessons.filter(lesson => isNodeCompleted(lesson.id)).length, 0);
    return { total: totalLessons, completed: completedLessons };
  };

  const getModuleProgress = (moduleId: string) => {
    const module = designSystemRoadmap.find(m => m.id === moduleId);
    if (!module) return { total: 0, completed: 0 };
    
    const total = module.lessons.length;
    const completed = module.lessons.filter(lesson => isNodeCompleted(lesson.id)).length;
    return { total, completed };
  };

  const { total, completed } = getTotalProgress();
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-50",
        "w-80 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Design System Roadmap</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              ×
            </button>
          </div>
          
          {/* Progress Overview */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{completed}/{total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500">{progressPercentage}% Complete</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {/* Home Link */}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/" 
                  ? "bg-blue-50 text-blue-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>

            {/* Roadmap Link */}
            <Link
              href="/roadmap"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === "/roadmap" 
                  ? "bg-blue-50 text-blue-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <BookOpenIcon className="w-4 h-4" />
              Roadmap Overview
            </Link>

            {/* Modules */}
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Learning Modules
              </h3>
              <div className="space-y-1">
                {designSystemRoadmap.map((module) => {
                  const isExpanded = expandedModules.has(module.id);
                  const moduleProgress = getModuleProgress(module.id);
                  const modulePercentage = moduleProgress.total > 0 
                    ? Math.round((moduleProgress.completed / moduleProgress.total) * 100) 
                    : 0;

                  return (
                    <div key={module.id}>
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between px-3 py-2 text-left rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )}
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {module.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-gray-500">
                            {moduleProgress.completed}/{moduleProgress.total}
                          </span>
                          {modulePercentage === 100 && (
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          )}
                        </div>
                      </button>

                      {/* Module Lessons */}
                      {isExpanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {module.lessons.map((lesson) => {
                            const lessonPath = `/roadmap/${module.id}/${lesson.id}`;
                            const isCompleted = isNodeCompleted(lesson.id);
                            const isActive = pathname === lessonPath;

                            return (
                              <Link
                                key={lesson.id}
                                href={lessonPath}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                                  isActive
                                    ? "bg-blue-50 text-blue-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                              >
                                <div className={cn(
                                  "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                  isCompleted ? "bg-green-500" : "bg-gray-300"
                                )} />
                                <span className="truncate">{lesson.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};