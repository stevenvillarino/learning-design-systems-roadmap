import React from 'react';
import Link from 'next/link';
import { Lesson } from '@/types/roadmap';
// import { CheckCircleIcon } from '@heroicons/react/24/solid'; // Example for completion icon

interface LessonCardProps {
  lesson: Lesson;
  moduleId: string;
  // isCompleted?: boolean;
  // onComplete?: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, moduleId /*, isCompleted, onComplete*/ }) => {
  // Placeholder for lesson content path or modal trigger
  const lessonPath = `/roadmap/${moduleId}/${lesson.id}`;

  return (
    <Link href={lessonPath} legacyBehavior>
      <a className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-md shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">{lesson.title}</h3>
          {/* {isCompleted && <CheckCircleIcon className="h-6 w-6 text-green-500" />} */}
        </div>
        {lesson.description && (
          <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
        )}
        {/* Placeholder for sub-lessons, if any */}
        {lesson.subLessons && lesson.subLessons.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500">Includes {lesson.subLessons.length} sub-topics</p>
          </div>
        )}
        {/* Button to mark complete - functionality to be added */}
        {/* 
        !isCompleted && onComplete && (
          <button 
            onClick={(e) => { 
              e.preventDefault(); // Prevent navigation
              e.stopPropagation(); // Prevent card click event
              onComplete(); 
            }}
            className="mt-3 text-xs text-blue-500 hover:text-blue-700"
          >
            Mark as Complete
          </button>
        )
        */}
      </a>
    </Link>
  );
}; 