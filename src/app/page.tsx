'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, BookOpenIcon, CheckCircleIcon, UsersIcon } from 'lucide-react';
import { designSystemRoadmap } from '@/data/roadmapData';
import { useProgress } from '@/hooks/useProgress';

export default function Home() {
  const { isNodeCompleted } = useProgress();

  const getTotalProgress = () => {
    const totalLessons = designSystemRoadmap.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = designSystemRoadmap.reduce((acc, module) => 
      acc + module.lessons.filter(lesson => isNodeCompleted(lesson.id)).length, 0);
    return { total: totalLessons, completed: completedLessons };
  };

  const { total, completed } = getTotalProgress();
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Master{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Design Systems
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            A comprehensive learning roadmap to build, maintain, and scale design systems. 
            Track your progress and level up your design system skills.
          </p>
          
          {/* Progress Card */}
          {completed > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">Your Progress</span>
                <span className="text-sm font-semibold text-gray-900">{completed}/{total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">{progressPercentage}% Complete</div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {completed > 0 ? 'Continue Learning' : 'Start Learning'}
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <a
              href="#overview"
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <BookOpenIcon className="w-5 h-5" />
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div id="overview" className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Learn Design Systems?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Design systems are the backbone of scalable, consistent user experiences. 
              Master the skills to create maintainable design languages that grow with your product.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Consistency</h3>
              <p className="text-gray-600">
                Create unified experiences across all touchpoints with reusable components and clear guidelines.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600">
                Bridge the gap between design and development with shared language and tools.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRightIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scalability</h3>
              <p className="text-gray-600">
                Build once, use everywhere. Scale your design efficiently across teams and products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Preview */}
      <div className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-lg text-gray-600">
              Follow our structured path from basics to advanced implementation
            </p>
          </div>

          <div className="space-y-4">
            {designSystemRoadmap.slice(0, 3).map((module, index) => {
              const moduleProgress = module.lessons.filter(lesson => isNodeCompleted(lesson.id)).length;
              const moduleTotal = module.lessons.length;
              const modulePercentage = moduleTotal > 0 ? Math.round((moduleProgress / moduleTotal) * 100) : 0;
              
              return (
                <div key={module.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{moduleProgress}/{moduleTotal}</div>
                      <div className="text-xs text-gray-500">{modulePercentage}% complete</div>
                    </div>
                  </div>
                  {moduleProgress > 0 && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${modulePercentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View Complete Roadmap
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
