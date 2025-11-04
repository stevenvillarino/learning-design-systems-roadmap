import { ContentMetadata, Lesson, Module } from '@/types/roadmap';

export interface ContentFreshnessCheck {
  isUpToDate: boolean;
  needsReview: boolean;
  daysUntilReview: number;
  daysSinceUpdate: number;
  statusBadge: 'current' | 'review-soon' | 'needs-review' | 'outdated' | 'draft';
  statusMessage: string;
}

/**
 * Checks if content is up to date based on metadata
 */
export function checkContentFreshness(
  metadata?: ContentMetadata
): ContentFreshnessCheck {
  if (!metadata) {
    return {
      isUpToDate: false,
      needsReview: true,
      daysUntilReview: 0,
      daysSinceUpdate: 999,
      statusBadge: 'needs-review',
      statusMessage: 'No metadata available - content source unknown',
    };
  }

  const now = new Date();
  const lastUpdated = new Date(metadata.lastUpdated);
  const lastReviewed = new Date(metadata.lastReviewedDate);
  const nextReview = metadata.nextReviewDate
    ? new Date(metadata.nextReviewDate)
    : null;

  const daysSinceUpdate = Math.floor(
    (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysSinceReview = Math.floor(
    (now.getTime() - lastReviewed.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysUntilReview = nextReview
    ? Math.floor((nextReview.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  // Status-based checks
  if (metadata.status === 'draft') {
    return {
      isUpToDate: false,
      needsReview: true,
      daysUntilReview: 0,
      daysSinceUpdate,
      statusBadge: 'draft',
      statusMessage: 'Draft - Content not yet finalized',
    };
  }

  if (metadata.status === 'outdated') {
    return {
      isUpToDate: false,
      needsReview: true,
      daysUntilReview: 0,
      daysSinceUpdate,
      statusBadge: 'outdated',
      statusMessage: `Outdated - Last updated ${daysSinceUpdate} days ago`,
    };
  }

  // Check if review is needed or upcoming
  if (daysUntilReview <= 0 || metadata.status === 'needs-review') {
    return {
      isUpToDate: false,
      needsReview: true,
      daysUntilReview,
      daysSinceUpdate,
      statusBadge: 'needs-review',
      statusMessage: daysUntilReview < 0
        ? `Review overdue by ${Math.abs(daysUntilReview)} days`
        : 'Flagged for review',
    };
  }

  // Check if review is coming soon (within 30 days)
  if (daysUntilReview <= 30) {
    return {
      isUpToDate: true,
      needsReview: false,
      daysUntilReview,
      daysSinceUpdate,
      statusBadge: 'review-soon',
      statusMessage: `Review scheduled in ${daysUntilReview} days`,
    };
  }

  // Content is current
  return {
    isUpToDate: true,
    needsReview: false,
    daysUntilReview,
    daysSinceUpdate,
    statusBadge: 'current',
    statusMessage: `Current - Last reviewed ${daysSinceReview} days ago`,
  };
}

/**
 * Gets badge color for content status
 */
export function getStatusBadgeColor(
  status: ContentFreshnessCheck['statusBadge']
): string {
  const colors = {
    current: 'bg-green-100 text-green-800 border-green-200',
    'review-soon': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'needs-review': 'bg-orange-100 text-orange-800 border-orange-200',
    outdated: 'bg-red-100 text-red-800 border-red-200',
    draft: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[status];
}

/**
 * Validates if content has proper source attribution
 */
export function hasProperAttribution(metadata?: ContentMetadata): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (!metadata) {
    issues.push('No metadata provided');
    return { isValid: false, issues };
  }

  if (!metadata.sources || metadata.sources.length === 0) {
    issues.push('No sources cited');
  }

  if (!metadata.curator) {
    issues.push('No curator assigned');
  }

  if (!metadata.lastUpdated) {
    issues.push('No update date');
  }

  if (!metadata.lastReviewedDate) {
    issues.push('No review date');
  }

  metadata.sources?.forEach((source, index) => {
    if (!source.title || !source.url) {
      issues.push(`Source ${index + 1} missing title or URL`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Gets all lessons that need review
 */
export function getLessonsNeedingReview(modules: Module[]): {
  lesson: Lesson;
  moduleId: string;
  freshness: ContentFreshnessCheck;
}[] {
  const lessonsNeedingReview: {
    lesson: Lesson;
    moduleId: string;
    freshness: ContentFreshnessCheck;
  }[] = [];

  modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      const freshness = checkContentFreshness(lesson.metadata);
      if (freshness.needsReview) {
        lessonsNeedingReview.push({
          lesson,
          moduleId: module.id,
          freshness,
        });
      }
    });
  });

  return lessonsNeedingReview;
}

/**
 * Generates a content health report
 */
export function generateContentHealthReport(modules: Module[]): {
  totalLessons: number;
  current: number;
  reviewSoon: number;
  needsReview: number;
  outdated: number;
  draft: number;
  withoutMetadata: number;
  attributionIssues: number;
  healthScore: number; // 0-100
} {
  let totalLessons = 0;
  const statusCounts = {
    current: 0,
    'review-soon': 0,
    'needs-review': 0,
    outdated: 0,
    draft: 0,
    withoutMetadata: 0,
    attributionIssues: 0,
  };

  modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      totalLessons++;

      if (!lesson.metadata) {
        statusCounts.withoutMetadata++;
        return;
      }

      const freshness = checkContentFreshness(lesson.metadata);
      statusCounts[freshness.statusBadge]++;

      const attribution = hasProperAttribution(lesson.metadata);
      if (!attribution.isValid) {
        statusCounts.attributionIssues++;
      }
    });
  });

  // Calculate health score (0-100)
  // Weight: current=100, review-soon=80, needs-review=40, outdated=0, draft=20
  const healthScore =
    totalLessons > 0
      ? Math.round(
          ((statusCounts.current * 100 +
            statusCounts['review-soon'] * 80 +
            statusCounts['needs-review'] * 40 +
            statusCounts.draft * 20) /
            totalLessons)
        )
      : 0;

  return {
    totalLessons,
    current: statusCounts.current,
    reviewSoon: statusCounts['review-soon'],
    needsReview: statusCounts['needs-review'],
    outdated: statusCounts.outdated,
    draft: statusCounts.draft,
    withoutMetadata: statusCounts.withoutMetadata,
    attributionIssues: statusCounts.attributionIssues,
    healthScore,
  };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get relative time description
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const days = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}
