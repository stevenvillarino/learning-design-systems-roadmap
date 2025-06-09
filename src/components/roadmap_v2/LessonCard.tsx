import React from 'react';
import Link from 'next/link';
import { Lesson } from '@/types/roadmap';
import { CheckCircleIcon, CircleIcon, PlayIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  moduleId: string;
  isCompleted: boolean;
  onToggleCompletion: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  moduleId, 
  isCompleted, 
  onToggleCompletion 
}) => {
  const lessonPath = `/roadmap/${moduleId}/${lesson.id}`;

  const handleToggleCompletion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleCompletion();
  };

  return (
    <div className={cn(
      "relative group bg-white border rounded-lg transition-all duration-200 hover:shadow-md",
      isCompleted 
        ? "border-green-200 bg-green-50/30" 
        : "border-gray-200 hover:border-blue-200"
    )}>
      <Link href={lessonPath} className="block p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className={cn(
            "text-lg font-semibold leading-tight transition-colors",
            isCompleted 
              ? "text-green-700" 
              : "text-gray-900 group-hover:text-blue-600"
          )}>
            {lesson.title}
          </h3>
          
          {/* Status Icon */}
          <div className="flex-shrink-0 ml-3">
            {isCompleted ? (
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
            ) : (
              <PlayIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            )}
          </div>
        </div>

        {lesson.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {lesson.description}
          </p>
        )}

        {lesson.subLessons && lesson.subLessons.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <CircleIcon className="w-3 h-3" />
            <span>{lesson.subLessons.length} sub-topics included</span>
          </div>
        )}
      </Link>

      {/* Completion Toggle Button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleToggleCompletion}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
            isCompleted
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700"
          )}
        >
          {isCompleted ? (
            <>
              <CheckCircleIcon className="w-3 h-3" />
              Completed
            </>
          ) : (
            <>
              <CircleIcon className="w-3 h-3" />
              Mark Complete
            </>
          )}
        </button>
      </div>
    </div>
  );
}; 