'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, AlertCircleIcon } from 'lucide-react';
import { ContentHealthDashboard } from '@/components/roadmap_v2/ContentHealthDashboard';
import { designSystemRoadmap } from '@/data/roadmapData';

export default function ContentHealthPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <AlertCircleIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Content Health Dashboard</h1>
              </div>
              <p className="text-gray-600">
                Monitor content freshness, sources, and quality across all lessons
              </p>
            </div>

            <Link
              href="/roadmap"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Roadmap
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            About This Dashboard
          </h3>
          <p className="text-sm text-blue-800">
            This dashboard helps content curators track the health and freshness of all learning content.
            Use it to identify lessons that need updating, verify source attribution, and maintain
            content quality standards.
          </p>
        </div>

        <ContentHealthDashboard modules={designSystemRoadmap} />

        {/* Additional Information */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Content Status Definitions</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-20 h-8 bg-green-100 border border-green-200 rounded flex items-center justify-center">
                <span className="text-xs font-medium text-green-800">Current</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Current</p>
                <p className="text-sm text-gray-600">
                  Content is up-to-date, properly sourced, and reviewed recently. No action needed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-20 h-8 bg-yellow-100 border border-yellow-200 rounded flex items-center justify-center">
                <span className="text-xs font-medium text-yellow-800">Review Soon</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Review Soon</p>
                <p className="text-sm text-gray-600">
                  Review date is approaching (within 30 days). Plan to verify content accuracy soon.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-20 h-8 bg-orange-100 border border-orange-200 rounded flex items-center justify-center">
                <span className="text-xs font-medium text-orange-800">Needs Review</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Needs Review</p>
                <p className="text-sm text-gray-600">
                  Review date has passed or content flagged for update. Action required.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-20 h-8 bg-red-100 border border-red-200 rounded flex items-center justify-center">
                <span className="text-xs font-medium text-red-800">Outdated</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Outdated</p>
                <p className="text-sm text-gray-600">
                  Content marked as outdated and needs significant updates. High priority.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-20 h-8 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-medium text-gray-800">Draft</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Draft</p>
                <p className="text-sm text-gray-600">
                  Content is in draft status and not yet finalized for publication.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Update Frequency Guide */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Update Frequencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Quarterly (Every 3 months)</p>
              <p className="text-sm text-gray-600">
                Tool-specific lessons, framework tutorials, rapidly evolving topics
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Bi-annual (Every 6 months)</p>
              <p className="text-sm text-gray-600">
                Best practices, design patterns, methodology content
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">Annual (Yearly)</p>
              <p className="text-sm text-gray-600">
                Fundamental concepts, terminology, historical content
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">As-needed</p>
              <p className="text-sm text-gray-600">
                Timeless principles, case studies, foundational theory
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
