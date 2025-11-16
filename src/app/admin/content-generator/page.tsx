'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon,
  LoaderIcon,
  FileTextIcon,
  ExternalLinkIcon,
} from 'lucide-react';
import { designSystemRoadmap } from '@/data/roadmapData';

interface GenerationJob {
  lessonId: string;
  lessonTitle: string;
  status: 'pending' | 'generating' | 'success' | 'error';
  markdown?: string;
  sources?: any[];
  error?: string;
}

export default function ContentGeneratorPage() {
  const [jobs, setJobs] = useState<GenerationJob[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Get lessons without content
  const lessonsWithoutContent = designSystemRoadmap.flatMap((module) =>
    module.lessons
      .filter((lesson) => !lesson.contentPath)
      .map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description || '',
        moduleId: module.id,
        moduleName: module.title,
      }))
  );

  const handleGenerateLesson = async (lessonId: string, lessonTitle: string) => {
    setJobs((prev) => [
      ...prev,
      { lessonId, lessonTitle, status: 'generating' },
    ]);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      });

      const data = await response.json();

      if (response.ok) {
        setJobs((prev) =>
          prev.map((job) =>
            job.lessonId === lessonId
              ? {
                  ...job,
                  status: 'success',
                  markdown: data.markdown,
                  sources: data.sources,
                }
              : job
          )
        );
      } else {
        setJobs((prev) =>
          prev.map((job) =>
            job.lessonId === lessonId
              ? { ...job, status: 'error', error: data.error }
              : job
          )
        );
      }
    } catch (error) {
      setJobs((prev) =>
        prev.map((job) =>
          job.lessonId === lessonId
            ? { ...job, status: 'error', error: 'Network error' }
            : job
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBatchGenerate = async (limit: number) => {
    const lessonsToGenerate = lessonsWithoutContent.slice(0, limit);

    for (const lesson of lessonsToGenerate) {
      await handleGenerateLesson(lesson.id, lesson.title);
      // Wait 2 seconds between generations to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  AI Content Generator
                </h1>
              </div>
              <p className="text-gray-600">
                Automatically generate lesson content using Exa + Firecrawl + Claude
              </p>
            </div>

            <Link
              href="/admin/content-health"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-purple-900 mb-1">
            How It Works
          </h3>
          <ol className="text-sm text-purple-800 space-y-1 ml-4 list-decimal">
            <li>Exa finds authoritative sources on the topic</li>
            <li>Firecrawl extracts clean markdown from those sources</li>
            <li>Claude synthesizes them into a comprehensive lesson</li>
            <li>Content is saved with proper source attribution</li>
          </ol>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <FileTextIcon className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">
                Lessons Without Content
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {lessonsWithoutContent.length}
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-600">
                Generated This Session
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {jobs.filter((j) => j.status === 'success').length}
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <XCircleIcon className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-gray-600">Failed</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {jobs.filter((j) => j.status === 'error').length}
            </p>
          </div>
        </div>

        {/* Batch Actions */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Batch Generation</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleBatchGenerate(5)}
              disabled={isGenerating || lessonsWithoutContent.length === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate Next 5 Lessons
            </button>
            <button
              onClick={() => handleBatchGenerate(10)}
              disabled={isGenerating || lessonsWithoutContent.length === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate Next 10 Lessons
            </button>
            <button
              onClick={() => handleBatchGenerate(lessonsWithoutContent.length)}
              disabled={isGenerating || lessonsWithoutContent.length === 0}
              className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Generate All Remaining ({lessonsWithoutContent.length})
            </button>
          </div>
          {isGenerating && (
            <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
              <LoaderIcon className="w-4 h-4 animate-spin" />
              Generating content... This may take a few minutes per lesson.
            </p>
          )}
        </div>

        {/* Lessons Without Content */}
        {lessonsWithoutContent.length > 0 && (
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Lessons Without Content ({lessonsWithoutContent.length})
            </h3>
            <div className="space-y-2">
              {lessonsWithoutContent.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{lesson.title}</p>
                    <p className="text-sm text-gray-600">
                      {lesson.moduleName} • {lesson.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleGenerateLesson(lesson.id, lesson.title)}
                    disabled={isGenerating}
                    className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                  >
                    Generate
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generation Jobs */}
        {jobs.length > 0 && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Generation History
            </h3>
            <div className="space-y-3">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">
                          {job.lessonTitle}
                        </h4>
                        {job.status === 'generating' && (
                          <LoaderIcon className="w-4 h-4 animate-spin text-purple-600" />
                        )}
                        {job.status === 'success' && (
                          <CheckCircleIcon className="w-4 h-4 text-green-600" />
                        )}
                        {job.status === 'error' && (
                          <XCircleIcon className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{job.lessonId}</p>
                    </div>
                  </div>

                  {job.status === 'success' && job.sources && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        Sources Used:
                      </p>
                      <div className="space-y-1">
                        {job.sources.map((source, i) => (
                          <a
                            key={i}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <ExternalLinkIcon className="w-3 h-3" />
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.status === 'error' && job.error && (
                    <p className="text-sm text-red-600 mt-2">{job.error}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
