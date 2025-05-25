export interface Lesson {
  id: string;
  title: string;
  description?: string; // Optional: for a brief overview
  // contentPath?: string; // Optional: path to markdown file or component for lesson content
  // resources?: string[]; // Optional: links to external resources
  // videoUrl?: string; // Optional: link to a video lesson
  // interactiveExerciseId?: string; // Optional: for coding exercises or quizzes
  subLessons?: Lesson[]; // For nested structures
}

export interface Module {
  id: string;
  title: string;
  description?: string; // Optional: for a brief overview of the module
  lessons: Lesson[];
}

export type RoadmapData = Module[]; 