import React from 'react';
import { Module } from '@/types/roadmap';
import { LessonCard } from './LessonCard';
import { BookOpenIcon } from 'lucide-react';

interface ModuleSectionProps {
  module: Module;
  isNodeCompleted: (nodeId: string) => boolean;
  onToggleCompletion: (nodeId: string) => void;
}

export const ModuleSection: React.FC<ModuleSectionProps> = ({ 
  module, 
  isNodeCompleted, 
  onToggleCompletion 
}) => {
  const completedLessons = module.lessons.filter(lesson => isNodeCompleted(lesson.id)).length;
  const totalLessons = module.lessons.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpenIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{module.title}</h2>
            </div>
            {module.description && (
              <p className="text-gray-600 text-lg leading-relaxed">{module.description}</p>
            )}
          </div>
          
          {/* Module Progress */}
          <div className="flex-shrink-0 ml-6">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600 mb-1">Progress</div>
              <div className="text-lg font-bold text-gray-900">
                {completedLessons}/{totalLessons}
              </div>
              <div className="text-sm text-gray-500">{progressPercentage}% complete</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        {progressPercentage > 0 && (
          <div className="mt-4">
            <div className="w-full bg-white/50 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lessons Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {module.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              moduleId={module.id}
              isCompleted={isNodeCompleted(lesson.id)}
              onToggleCompletion={() => onToggleCompletion(lesson.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 