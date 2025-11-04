import React from 'react';
import { ContentMetadata as ContentMetadataType, ContentSource } from '@/types/roadmap';
import {
  BookOpenIcon,
  ExternalLinkIcon,
  CalendarIcon,
  UserIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  FileTextIcon,
  VideoIcon,
  GraduationCapIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  checkContentFreshness,
  getStatusBadgeColor,
  formatDate,
  getRelativeTime
} from '@/utils/contentValidation';

interface ContentMetadataProps {
  metadata: ContentMetadataType;
  className?: string;
}

const getSourceIcon = (type: ContentSource['type']) => {
  switch (type) {
    case 'documentation':
      return <FileTextIcon className="w-4 h-4" />;
    case 'article':
      return <FileTextIcon className="w-4 h-4" />;
    case 'video':
      return <VideoIcon className="w-4 h-4" />;
    case 'book':
      return <BookOpenIcon className="w-4 h-4" />;
    case 'conference-talk':
      return <VideoIcon className="w-4 h-4" />;
    case 'research':
      return <GraduationCapIcon className="w-4 h-4" />;
    case 'industry-report':
      return <FileTextIcon className="w-4 h-4" />;
    default:
      return <FileTextIcon className="w-4 h-4" />;
  }
};

export const ContentMetadata: React.FC<ContentMetadataProps> = ({
  metadata,
  className
}) => {
  const freshness = checkContentFreshness(metadata);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Content Status */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          {freshness.isUpToDate ? (
            <CheckCircleIcon className="w-4 h-4 text-green-600" />
          ) : (
            <AlertCircleIcon className="w-4 h-4 text-orange-600" />
          )}
          Content Status
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border",
                getStatusBadgeColor(freshness.statusBadge)
              )}
            >
              <span className="capitalize">
                {freshness.statusBadge.replace('-', ' ')}
              </span>
            </span>
          </div>

          {metadata.version && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Version:</span>
              <span className="text-sm font-medium text-gray-900">
                {metadata.version}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Updated:</span>
            <span className="text-sm text-gray-900">
              {formatDate(metadata.lastUpdated)}
              <span className="text-xs text-gray-500 ml-1">
                ({getRelativeTime(metadata.lastUpdated)})
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Reviewed:</span>
            <span className="text-sm text-gray-900">
              {formatDate(metadata.lastReviewedDate)}
              <span className="text-xs text-gray-500 ml-1">
                ({getRelativeTime(metadata.lastReviewedDate)})
              </span>
            </span>
          </div>

          {metadata.nextReviewDate && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Next Review:</span>
              <span className="text-sm text-gray-900">
                {formatDate(metadata.nextReviewDate)}
              </span>
            </div>
          )}

          {metadata.curator && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <UserIcon className="w-3 h-3" />
                Curator:
              </span>
              <span className="text-sm font-medium text-gray-900">
                {metadata.curator}
              </span>
            </div>
          )}

          {metadata.updateFrequency && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" />
                Update Frequency:
              </span>
              <span className="text-sm text-gray-900 capitalize">
                {metadata.updateFrequency}
              </span>
            </div>
          )}
        </div>

        {!freshness.isUpToDate && (
          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
            <p className="text-xs text-orange-800">
              <AlertCircleIcon className="w-3 h-3 inline mr-1" />
              {freshness.statusMessage}
            </p>
          </div>
        )}
      </div>

      {/* Sources */}
      {metadata.sources && metadata.sources.length > 0 && (
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpenIcon className="w-4 h-4" />
            Content Sources ({metadata.sources.length})
          </h3>

          <div className="space-y-3">
            {metadata.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50/30 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
                    {getSourceIcon(source.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {source.title}
                      </h4>
                      <ExternalLinkIcon className="w-3 h-3 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                    </div>

                    <div className="mt-1 space-y-1">
                      <div className="flex flex-wrap gap-2 items-center text-xs text-gray-500">
                        <span className="capitalize bg-gray-100 px-2 py-0.5 rounded">
                          {source.type.replace('-', ' ')}
                        </span>

                        {source.author && (
                          <span className="flex items-center gap-1">
                            <UserIcon className="w-3 h-3" />
                            {source.author}
                          </span>
                        )}

                        {source.organization && (
                          <span>• {source.organization}</span>
                        )}

                        {source.publishedDate && (
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {formatDate(source.publishedDate)}
                          </span>
                        )}
                      </div>

                      {source.accessedDate && (
                        <p className="text-xs text-gray-400">
                          Accessed: {formatDate(source.accessedDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
