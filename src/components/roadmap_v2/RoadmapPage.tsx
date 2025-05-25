import React from 'react';
import { designSystemRoadmap } from '@/data/roadmapData';
import { ModuleSection } from './ModuleSection';
import { ProgressTracker } from './ProgressTracker'; // Assuming you'll create this

export const RoadmapPage: React.FC = () => {
  // TODO: Add state for progress tracking
  // const [completedLessons, setCompletedLessons] = React.useState<string[]>([]);

  // TODO: Function to handle lesson completion
  // const handleCompleteLesson = (lessonId: string) => {
  //   setCompletedLessons(prev => [...new Set([...prev, lessonId])]);
  // };

  // const totalLessons = designSystemRoadmap.reduce((acc, module) => acc + module.lessons.length, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Design System Learning Roadmap</h1>
      
      {/* 
      <ProgressTracker 
        totalLessons={totalLessons} 
        completedLessons={completedLessons.length} 
      /> 
      */}
      
      <div className="space-y-12">
        {designSystemRoadmap.map((module) => (
          <ModuleSection
            key={module.id}
            module={module}
            // completedLessons={completedLessons}
            // onCompleteLesson={handleCompleteLesson}
          />
        ))}
      </div>
    </div>
  );
}; 