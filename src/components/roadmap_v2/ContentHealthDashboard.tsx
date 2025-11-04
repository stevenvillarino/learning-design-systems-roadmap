import React, { useMemo } from 'react';
import { Module } from '@/types/roadmap';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  FileTextIcon,
  TrendingUpIcon
} from 'lucide-react';
import {
  generateContentHealthReport,
  getLessonsNeedingReview
} from '@/utils/contentValidation';

interface ContentHealthDashboardProps {
  modules: Module[];
  className?: string;
}

export const ContentHealthDashboard: React.FC<ContentHealthDashboardProps> = ({
  modules,
  className
}) => {
  const healthReport = useMemo(
    () => generateContentHealthReport(modules),
    [modules]
  );

  const lessonsNeedingReview = useMemo(
    () => getLessonsNeedingReview(modules),
    [modules]
  );

  const getHealthScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthScoreBg = (score: number): string => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    if (score >= 40) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className={className}>
      {/* Health Score Overview */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Content Health</h2>
          <div className="flex items-center gap-2">
            <TrendingUpIcon className={getHealthScoreColor(healthReport.healthScore)} />
            <span
              className={`text-3xl font-bold ${getHealthScoreColor(healthReport.healthScore)}`}
            >
              {healthReport.healthScore}
            </span>
            <span className="text-gray-500 text-sm">/100</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<CheckCircleIcon className="w-5 h-5 text-green-600" />}
            label="Current"
            value={healthReport.current}
            total={healthReport.totalLessons}
            color="green"
          />
          <StatCard
            icon={<ClockIcon className="w-5 h-5 text-yellow-600" />}
            label="Review Soon"
            value={healthReport.reviewSoon}
            total={healthReport.totalLessons}
            color="yellow"
          />
          <StatCard
            icon={<AlertCircleIcon className="w-5 h-5 text-orange-600" />}
            label="Needs Review"
            value={healthReport.needsReview}
            total={healthReport.totalLessons}
            color="orange"
          />
          <StatCard
            icon={<AlertCircleIcon className="w-5 h-5 text-red-600" />}
            label="Outdated"
            value={healthReport.outdated}
            total={healthReport.totalLessons}
            color="red"
          />
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileTextIcon className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Total Lessons</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {healthReport.totalLessons}
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircleIcon className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Draft Content</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {healthReport.draft}
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircleIcon className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Attribution Issues
            </h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {healthReport.attributionIssues}
          </p>
        </div>
      </div>

      {/* Lessons Needing Review */}
      {lessonsNeedingReview.length > 0 && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircleIcon className="w-5 h-5 text-orange-600" />
            Lessons Requiring Attention ({lessonsNeedingReview.length})
          </h3>

          <div className="space-y-2">
            {lessonsNeedingReview.slice(0, 10).map(({ lesson, moduleId, freshness }) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-md"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    Module: {moduleId} • {freshness.statusMessage}
                  </p>
                </div>
                <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded capitalize">
                  {freshness.statusBadge.replace('-', ' ')}
                </span>
              </div>
            ))}

            {lessonsNeedingReview.length > 10 && (
              <p className="text-sm text-gray-500 text-center pt-2">
                ... and {lessonsNeedingReview.length - 10} more
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  total: number;
  color: 'green' | 'yellow' | 'orange' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, total, color }) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    orange: 'bg-orange-50 border-orange-200',
    red: 'bg-red-50 border-red-200',
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-xs font-semibold text-gray-700">{label}</h3>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <span className="text-sm text-gray-600">({percentage}%)</span>
      </div>
    </div>
  );
};
