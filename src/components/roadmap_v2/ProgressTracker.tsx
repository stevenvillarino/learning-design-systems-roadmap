import React from 'react';
import { RefreshCwIcon, TrophyIcon } from 'lucide-react';

interface ProgressTrackerProps {
  totalLessons: number;
  completedLessons: number;
  onReset: () => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  totalLessons, 
  completedLessons, 
  onReset 
}) => {
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-w-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <TrophyIcon className="w-5 h-5 text-yellow-500" />
          Learning Progress
        </h2>
        {completedLessons > 0 && (
          <button
            onClick={onReset}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
            title="Reset Progress"
          >
            <RefreshCwIcon className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Completed</span>
          <span className="text-sm font-semibold text-gray-900">
            {completedLessons}/{totalLessons}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{progressPercentage}%</span>
          {progressPercentage === 100 ? (
            <span className="text-sm text-green-600 font-medium">🎉 Complete!</span>
          ) : (
            <span className="text-sm text-gray-500">
              {totalLessons - completedLessons} remaining
            </span>
          )}
        </div>
      </div>
    </div>
  );
}; 