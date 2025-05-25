import React from 'react';
import { Module } from '@/types/roadmap';
import { LessonCard } from './LessonCard'; // Assuming you'll create this

interface ModuleSectionProps {
  module: Module;
  // completedLessons?: string[];
  // onCompleteLesson?: (lessonId: string) => void;
}

export const ModuleSection: React.FC<ModuleSectionProps> = ({ module /*, completedLessons, onCompleteLesson*/ }) => {
  return (
    <section id={module.id} className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-3">{module.title}</h2>
      {module.description && <p className="mb-6 text-gray-600">{module.description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {module.lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            moduleId={module.id}
            // isCompleted={completedLessons?.includes(lesson.id)}
            // onComplete={() => onCompleteLesson?.(lesson.id)}
          />
        ))}
      </div>
    </section>
  );
}; 