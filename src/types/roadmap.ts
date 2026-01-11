export interface Lesson {
  id: string;
  title: string;
  description?: string; // Optional: for a brief overview
  content?: string; // Main educational content for the lesson
  targetAudience?: ('designer' | 'developer' | 'manager')[]; // Who this lesson is for. If undefined, it's for everyone.
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