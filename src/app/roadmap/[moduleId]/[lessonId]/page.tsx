'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CircleIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  LinkIcon
} from 'lucide-react';
import { designSystemRoadmap } from '@/data/roadmapData';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';
import { ContentMetadata } from '@/components/roadmap_v2/ContentMetadata';
import { LessonContent } from '@/components/lesson/LessonContent';

export default function LessonPage() {
  const params = useParams();
  const { isNodeCompleted, toggleNodeCompletion } = useProgress();

  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  // Find the current module and lesson
  const module = designSystemRoadmap.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  // Find next/previous lessons for navigation
  const currentModuleIndex = designSystemRoadmap.findIndex(m => m.id === moduleId);
  const currentLessonIndex = module?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  
  const getNextLesson = () => {
    if (!module) return null;
    
    // Try next lesson in current module
    if (currentLessonIndex < module.lessons.length - 1) {
      return {
        moduleId,
        lessonId: module.lessons[currentLessonIndex + 1].id,
        title: module.lessons[currentLessonIndex + 1].title
      };
    }
    
    // Try first lesson of next module
    if (currentModuleIndex < designSystemRoadmap.length - 1) {
      const nextModule = designSystemRoadmap[currentModuleIndex + 1];
      if (nextModule.lessons.length > 0) {
        return {
          moduleId: nextModule.id,
          lessonId: nextModule.lessons[0].id,
          title: nextModule.lessons[0].title
        };
      }
    }
    
    return null;
  };

  const getPreviousLesson = () => {
    if (!module) return null;
    
    // Try previous lesson in current module
    if (currentLessonIndex > 0) {
      return {
        moduleId,
        lessonId: module.lessons[currentLessonIndex - 1].id,
        title: module.lessons[currentLessonIndex - 1].title
      };
    }
    
    // Try last lesson of previous module
    if (currentModuleIndex > 0) {
      const prevModule = designSystemRoadmap[currentModuleIndex - 1];
      if (prevModule.lessons.length > 0) {
        const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
        return {
          moduleId: prevModule.id,
          lessonId: lastLesson.id,
          title: lastLesson.title
        };
      }
    }
    
    return null;
  };

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();
  const isCompleted = lesson ? isNodeCompleted(lesson.id) : false;

  if (!module || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <p className="text-gray-600 mb-6">The lesson you're looking for doesn't exist.</p>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  const handleToggleCompletion = () => {
    toggleNodeCompletion(lesson.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/roadmap"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Roadmap</span>
              </Link>
              
              <div className="hidden sm:block h-6 w-px bg-gray-300" />
              
              <div>
                <div className="text-sm text-gray-500">{module.title}</div>
                <div className="font-semibold text-gray-900">{lesson.title}</div>
              </div>
            </div>

            <button
              onClick={handleToggleCompletion}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all",
                isCompleted
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              {isCompleted ? (
                <>
                  <CheckCircleIcon className="w-4 h-4" />
                  Completed
                </>
              ) : (
                <>
                  <CircleIcon className="w-4 h-4" />
                  Mark Complete
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Lesson Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpenIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson.title}</h1>
                {lesson.description && (
                  <p className="text-lg text-gray-600 leading-relaxed">{lesson.description}</p>
                )}
                
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  {lesson.estimatedTime && (
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{lesson.estimatedTime} min read</span>
                    </div>
                  )}
                  {lesson.difficulty && (
                    <div className="flex items-center gap-1">
                      <BookOpenIcon className="w-4 h-4" />
                      <span className="capitalize">{lesson.difficulty} Level</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="p-8">
            {/* Main Lesson Content */}
            {lesson.contentPath ? (
              <div className="mb-8">
                <LessonContent contentPath={lesson.contentPath} />
              </div>
            ) : (
              <div className="prose prose-lg max-w-none mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">📚 Coming Soon</h3>
                  <p className="text-blue-800 mb-4">
                    Detailed lesson content for "{lesson.title}" is currently being developed.
                    This will include comprehensive explanations, examples, and practical exercises.
                  </p>
                  <p className="text-blue-700 text-sm">
                    For now, you can mark this lesson as complete to track your progress
                    and continue with the learning path.
                  </p>
                </div>
              </div>
            )}

            {/* Learning Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-blue-600" />
                    Learning Resources ({lesson.resources.length})
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Curated resources to help you learn about {lesson.title.toLowerCase()}.
                  </p>
                  <div className="space-y-3">
                    {lesson.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {resource.title}
                              </h4>
                              <ExternalLinkIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                            </div>
                            {resource.description && (
                              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                            )}
                            <div className="flex flex-wrap gap-2 items-center text-xs">
                              <span className="capitalize bg-gray-100 px-2 py-1 rounded text-gray-700">
                                {resource.type}
                              </span>
                              {resource.difficulty && (
                                <span className={cn(
                                  "px-2 py-1 rounded capitalize",
                                  resource.difficulty === 'beginner' && "bg-green-100 text-green-700",
                                  resource.difficulty === 'intermediate' && "bg-yellow-100 text-yellow-700",
                                  resource.difficulty === 'advanced' && "bg-red-100 text-red-700"
                                )}>
                                  {resource.difficulty}
                                </span>
                              )}
                              {resource.duration && (
                                <span className="text-gray-500 flex items-center gap-1">
                                  <ClockIcon className="w-3 h-3" />
                                  {resource.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
            )}

            {/* Sub-lessons */}
            {lesson.subLessons && lesson.subLessons.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sub-topics Covered:</h3>
                  <ul className="space-y-2">
                    {lesson.subLessons.map((subLesson, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span className="text-gray-700">{subLesson.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            )}

            {/* Content Metadata & Sources */}
            {lesson.metadata && (
              <ContentMetadata metadata={lesson.metadata} />
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {previousLesson ? (
            <Link
              href={`/roadmap/${previousLesson.moduleId}/${previousLesson.lessonId}`}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Previous</div>
                <div className="font-medium text-gray-900 truncate max-w-[200px]">
                  {previousLesson.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={`/roadmap/${nextLesson.moduleId}/${nextLesson.lessonId}`}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-blue-200">Next</div>
                <div className="font-medium truncate max-w-[200px]">
                  {nextLesson.title}
                </div>
              </div>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
} 