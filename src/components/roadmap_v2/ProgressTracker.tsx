import React from 'react';

interface ProgressTrackerProps {
  totalLessons: number;
  completedLessons: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ totalLessons, completedLessons }) => {
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="my-8 p-4 bg-blue-50 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-blue-700 mb-2">Your Progress</h3>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-blue-600">
          {completedLessons} / {totalLessons} Lessons Completed ({progressPercentage.toFixed(0)}%)
        </span>
      </div>
    </div>
  );
}; 