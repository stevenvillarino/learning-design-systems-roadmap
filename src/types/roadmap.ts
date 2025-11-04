// Content source reference
export interface ContentSource {
  title: string;
  url: string;
  type: 'documentation' | 'article' | 'video' | 'book' | 'conference-talk' | 'research' | 'industry-report';
  author?: string;
  organization?: string;
  publishedDate?: string;
  accessedDate?: string;
}

// Content metadata for tracking freshness and provenance
export interface ContentMetadata {
  lastUpdated: string; // ISO date string
  lastReviewedDate: string; // When content was last verified as current
  version?: string; // Content version (e.g., "2.0", "2024.1")
  curator?: string; // Who maintains this content
  status: 'current' | 'needs-review' | 'outdated' | 'draft';
  sources: ContentSource[]; // Primary sources for this content
  updateFrequency?: 'quarterly' | 'bi-annual' | 'annual' | 'as-needed';
  nextReviewDate?: string; // When this should be reviewed next
}

// Resource link with context
export interface Resource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'tool' | 'example' | 'documentation' | 'interactive';
  description?: string;
  duration?: string; // For videos or courses
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;

  // Content and resources
  contentPath?: string; // Path to markdown file or component for lesson content
  resources?: Resource[]; // Curated learning resources
  videoUrl?: string; // Primary video lesson
  interactiveExerciseId?: string; // For coding exercises or quizzes

  // Content provenance and freshness
  metadata?: ContentMetadata;

  // Nested structure
  subLessons?: Lesson[];

  // Additional learning info
  estimatedTime?: number; // Minutes to complete
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[]; // IDs of required lessons
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];

  // Module-level metadata
  metadata?: ContentMetadata;
  estimatedTime?: number; // Total minutes for module
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export type RoadmapData = Module[]; 