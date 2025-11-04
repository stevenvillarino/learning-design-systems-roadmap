import React from 'react';
import Link from 'next/link';
import { Lesson } from '@/types/roadmap';
import {
  CheckCircleIcon,
  CircleIcon,
  PlayIcon,
  ClockIcon,
  BookOpenIcon,
  AlertCircleIcon,
  LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  checkContentFreshness,
  getStatusBadgeColor,
  getRelativeTime
} from '@/utils/contentValidation';

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
  const freshness = checkContentFreshness(lesson.metadata);

  const handleToggleCompletion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleCompletion();
  };

  const difficultyColors = {
    beginner: 'text-green-600 bg-green-50 border-green-200',
    intermediate: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    advanced: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <div className={cn(
      "relative group bg-white border rounded-lg transition-all duration-200 hover:shadow-md",
      isCompleted
        ? "border-green-200 bg-green-50/30"
        : "border-gray-200 hover:border-blue-200"
    )}>
      <Link href={lessonPath} className="block p-5 pb-12">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-start gap-2 mb-2">
              <h3 className={cn(
                "text-lg font-semibold leading-tight transition-colors flex-1",
                isCompleted
                  ? "text-green-700"
                  : "text-gray-900 group-hover:text-blue-600"
              )}>
                {lesson.title}
              </h3>

              {/* Status Icon */}
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <PlayIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                )}
              </div>
            </div>

            {/* Metadata badges */}
            <div className="flex flex-wrap gap-2 mb-2">
              {/* Content Freshness Badge */}
              {lesson.metadata && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border",
                    getStatusBadgeColor(freshness.statusBadge)
                  )}
                  title={freshness.statusMessage}
                >
                  {freshness.statusBadge === 'current' && '✓'}
                  {freshness.statusBadge === 'needs-review' && <AlertCircleIcon className="w-3 h-3" />}
                  {freshness.statusBadge === 'outdated' && <AlertCircleIcon className="w-3 h-3" />}
                  {freshness.statusBadge === 'draft' && '📝'}
                  {freshness.statusBadge === 'review-soon' && '⏰'}
                  <span className="capitalize">{freshness.statusBadge.replace('-', ' ')}</span>
                </span>
              )}

              {/* Difficulty Badge */}
              {lesson.difficulty && (
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
                  difficultyColors[lesson.difficulty]
                )}>
                  {lesson.difficulty}
                </span>
              )}

              {/* Time Badge */}
              {lesson.estimatedTime && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  <ClockIcon className="w-3 h-3" />
                  {lesson.estimatedTime} min
                </span>
              )}
            </div>
          </div>
        </div>

        {lesson.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {lesson.description}
          </p>
        )}

        {/* Sources preview */}
        {lesson.metadata?.sources && lesson.metadata.sources.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <BookOpenIcon className="w-3 h-3" />
            <span>
              {lesson.metadata.sources.length} source{lesson.metadata.sources.length > 1 ? 's' : ''}:
              <span className="ml-1 text-gray-600">
                {lesson.metadata.sources[0].title}
                {lesson.metadata.sources.length > 1 && ` +${lesson.metadata.sources.length - 1} more`}
              </span>
            </span>
          </div>
        )}

        {/* Last updated */}
        {lesson.metadata?.lastUpdated && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            Updated {getRelativeTime(lesson.metadata.lastUpdated)}
          </div>
        )}

        {/* Resources count */}
        {lesson.resources && lesson.resources.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
            <LinkIcon className="w-3 h-3" />
            <span>{lesson.resources.length} learning resource{lesson.resources.length > 1 ? 's' : ''} available</span>
          </div>
        )}

        {lesson.subLessons && lesson.subLessons.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
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